"""Portable fingerprint backend — the implementation that ports to Oracle SE.

Storage and screening use only standard SQL and integer/BLOB columns.
Explicitly avoided: ``bit_count``, ``ARRAY``, the ``@>`` containment operator,
the ``%`` similarity operator — anything Postgres-specific. What remains
(``SELECT``/``WHERE``/``JOIN``/``IN``/``BETWEEN``, standard aggregates, and the
bitwise ``&`` operator) exists in Oracle SE, so the same schema and queries move
across unchanged. Bitwise ``&`` maps to Oracle ``BITAND(a, b)``; on SQLite and
Postgres it is the ``&`` operator.

Two-phase search everywhere:

1. **SQL screening** narrows millions of rows to a small candidate set using
   per-word bitwise-AND conditions (substructure) or a popcount range
   (similarity).
2. **App-layer RDKit** does the exact match on the survivors.

--------------------------------------------------------------------------------
DEVIATION FROM SPEC §4.3 (intentional — the SPEC has a chemistry bug)
--------------------------------------------------------------------------------
SPEC §4.3 says to decompose the *Morgan* fingerprint into word columns for
substructure screening. That is wrong: Morgan/ECFP does **not** have the
substructure-containment property. If Q is a substructure of T, the bits of Q's
Morgan FP are NOT guaranteed to be a subset of T's (Morgan hashes circular
environments of a fixed radius; a fragment's environments differ from the same
atoms embedded in a larger molecule). Screening on Morgan therefore produces
false negatives, and the §4.4 "screening recall = 100%" gate collapses.

Corrected design (what this file implements):

* SUBSTRUCTURE screening uses ``Chem.PatternFingerprint(mol, fpSize=2048)``,
  which is *designed* for substructure screening and for which containment
  provably holds. It is decomposed into 32 signed 64-bit word columns
  (``pat_00``..``pat_31``); a candidate must satisfy, for every non-zero query
  word ``i``, ``(pat_i & :qi) = :qi``.
* MORGAN fingerprint is kept strictly for SIMILARITY (Tanimoto), with the
  popcount range prune ``[t*|A|, |A|/t]``.

Signed 64-bit note: SQLite (and Oracle NUMBER/INTEGER) store signed integers.
Each pattern word is produced by ``int.from_bytes(..., 'big', signed=True)`` so
words with the high bit set become negative. Two's-complement bitwise AND still
computes containment correctly — verified by a dedicated unit test.

The default connection is in-memory SQLite (used by the PoC and the test suite);
pass any DB-API connection to target Postgres or, in production, Oracle.
"""

from __future__ import annotations

import sqlite3
import threading

from rdkit import Chem

from ..chem.fingerprint import (
    PATTERN_WORD_COUNT,
    bits_to_bytes,
    bytes_to_bits,
    morgan_bits,
    pattern_words,
    tanimoto,
)
from .backend import ChemSearchBackend, Component, Hit, rollup_by_regid

# Oracle caps IN-lists at 1000 entries; chunk any IN-list below that.
_IN_CHUNK = 900

# Column names for the 32 pattern-fingerprint words.
_PAT_COLS = [f"pat_{i:02d}" for i in range(PATTERN_WORD_COUNT)]


class PortableFPBackend(ChemSearchBackend):
    name = "portable_fp"

    def __init__(self, connection: sqlite3.Connection | None = None) -> None:
        # check_same_thread=False: the API builds the index on one thread and
        # serves queries on worker threads. A lock serializes access since a
        # single SQLite connection is not safe for concurrent use.
        self._conn = connection or sqlite3.connect(
            ":memory:", check_same_thread=False
        )
        self._lock = threading.Lock()
        self._pending: list[tuple] = []
        self._next_id = 0
        # App-layer cache of parsed mols, keyed by component id. Built once at
        # index time so the substructure precise phase never re-parses SMILES.
        # Portable: the SQL layer still stores only text/int/BLOB; this is an
        # in-process accelerator (memory cost ~ one RDKit mol per component).
        self._mols: dict[int, Chem.Mol] = {}
        # Diagnostic: number of screening candidates from the most recent
        # substructure query (before the precise RDKit phase). Used by the
        # benchmark to report screening precision.
        self.last_candidate_count: int = 0

    # ---- indexing ----

    def add_component(self, component: Component) -> None:
        mol = Chem.MolFromSmiles(component.smiles)
        if mol is None:
            return  # loader counts parse failures; search skips them
        cid = self._next_id
        self._next_id += 1
        self._mols[cid] = mol
        canonical = Chem.MolToSmiles(mol)
        mbits = morgan_bits(mol)
        words = pattern_words(mol)
        self._pending.append(
            (
                cid,
                component.regid,
                component.mixture_id,
                component.comp_index,
                canonical,
                component.mol_formula,
                component.mol_weight,
                mol.GetNumHeavyAtoms(),
                *words,
                bits_to_bytes(mbits),
                len(mbits),
            )
        )

    def build(self) -> None:
        pat_defs = ",\n                ".join(f"{c} INTEGER" for c in _PAT_COLS)
        cur = self._conn.cursor()
        cur.executescript(
            f"""
            DROP TABLE IF EXISTS component;
            CREATE TABLE component (
                id INTEGER PRIMARY KEY,
                regid TEXT NOT NULL,
                mixture_id TEXT,
                comp_index INTEGER,
                canonical_smiles TEXT,
                mol_formula TEXT,
                mol_weight REAL,
                heavy_atom_count INTEGER,
                {pat_defs},
                morgan_blob BLOB,
                morgan_popcount INTEGER
            );
            """
        )
        # 8 fixed leading cols + 32 pattern words + morgan_blob + morgan_popcount.
        n_cols = 8 + PATTERN_WORD_COUNT + 2
        placeholders = ",".join("?" for _ in range(n_cols))
        cur.executemany(
            f"INSERT INTO component VALUES ({placeholders})", self._pending
        )
        cur.executescript(
            """
            CREATE INDEX ix_component_smiles ON component(canonical_smiles);
            CREATE INDEX ix_component_popcount ON component(morgan_popcount);
            CREATE INDEX ix_component_heavy ON component(heavy_atom_count);
            """
        )
        self._conn.commit()

    # ---- search ----

    def exact_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        canonical = Chem.MolToSmiles(qmol)
        with self._lock:
            cur = self._conn.cursor()
            cur.execute(
                "SELECT regid, mixture_id, comp_index, mol_formula, mol_weight "
                "FROM component WHERE canonical_smiles = ?",
                (canonical,),
            )
            rows = cur.fetchall()
        return rollup_by_regid([_row_hit(r) for r in rows])

    def substructure_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            self.last_candidate_count = 0
            return []
        qwords = pattern_words(qmol)
        qheavy = qmol.GetNumHeavyAtoms()

        with self._lock:
            # Phase 1 — SQL screening. A candidate must contain every atom of
            # the query (heavy_atom_count >= qheavy) AND, for each non-zero
            # query word, carry all of that word's bits: (pat_i & :qi) = :qi.
            # Zero query words add no constraint, so they are omitted → fewer
            # AND-conditions. Bitwise & is Oracle BITAND / Postgres & / SQLite &.
            conds = ["heavy_atom_count >= ?"]
            params: list = [qheavy]
            for i, word in enumerate(qwords):
                if word != 0:
                    conds.append(f"({_PAT_COLS[i]} & ?) = ?")
                    params.extend((word, word))
            sql = (
                "SELECT id, regid, mixture_id, comp_index, canonical_smiles, "
                "mol_formula, mol_weight FROM component WHERE "
                + " AND ".join(conds)
            )
            cur = self._conn.cursor()
            cur.execute(sql, params)
            rows = cur.fetchall()

        self.last_candidate_count = len(rows)

        # Phase 2 — exact substructure match in RDKit on the survivors, using
        # the cached parsed mols (no SMILES re-parse).
        hits: list[Hit] = []
        for cid, regid, mixture_id, comp_index, smiles, formula, weight in rows:
            mol = self._mols.get(cid)
            if mol is None:  # cache miss (e.g. external connection) → parse
                mol = Chem.MolFromSmiles(smiles)
            if mol is not None and mol.HasSubstructMatch(qmol):
                hits.append(
                    Hit(regid, mixture_id, formula, weight, comp_index, None)
                )
        return rollup_by_regid(hits)

    def similarity_search(self, query_smiles: str, threshold: float) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        qbits = set(morgan_bits(qmol))
        qp = len(qbits)
        if qp == 0 or threshold <= 0:
            lo, hi = 0, 1 << 30
        else:
            # Tanimoto bound: a match's popcount must lie in [t*qp, qp/t].
            lo = int(threshold * qp)
            hi = int(qp / threshold) + 1

        with self._lock:
            cur = self._conn.cursor()
            cur.execute(
                "SELECT regid, mixture_id, comp_index, mol_formula, mol_weight, "
                "morgan_blob FROM component WHERE morgan_popcount BETWEEN ? AND ?",
                (lo, hi),
            )
            rows = cur.fetchall()
        hits: list[Hit] = []
        for regid, mixture_id, comp_index, formula, weight, blob in rows:
            score = tanimoto(qbits, set(bytes_to_bits(blob)))
            if score >= threshold:
                hits.append(
                    Hit(regid, mixture_id, formula, weight, comp_index, score)
                )
        return rollup_by_regid(hits)


def _row_hit(row) -> Hit:
    regid, mixture_id, comp_index, formula, weight = row
    return Hit(regid, mixture_id, formula, weight, comp_index, None)
