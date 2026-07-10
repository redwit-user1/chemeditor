"""Portable fingerprint backend — the implementation that ports to Oracle SE.

Storage and screening use only standard SQL and a BLOB column. Explicitly
avoided: ``bit_count``, ``ARRAY``, the ``@>`` containment operator, the ``%``
similarity operator — anything Postgres-specific. What remains (``IN``,
``GROUP BY … HAVING COUNT``, ``BETWEEN``, ``=``, BLOB) exists in Oracle SE, so
the same schema and queries move across unchanged.

Two-phase search everywhere:

1. **SQL screening** narrows millions of rows to a small candidate set using an
   inverted bit index (substructure) or a popcount range (similarity).
2. **App-layer RDKit** does the exact match on the survivors.

The default connection is in-memory SQLite (used by the PoC and the test suite);
pass any DB-API connection to target Postgres or, in production, Oracle.
"""

from __future__ import annotations

import sqlite3
import threading

from rdkit import Chem

from ..chem.fingerprint import (
    bits_to_bytes,
    bytes_to_bits,
    morgan_bits,
    pattern_bits,
    tanimoto,
)
from .backend import ChemSearchBackend, Component, Hit, rollup_by_regid

# Oracle caps IN-lists at 1000 entries; chunk screening below that everywhere.
_IN_CHUNK = 900


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
        self._pending_bits: list[tuple[int, list[int]]] = []
        self._next_id = 0

    # ---- indexing ----

    def add_component(self, component: Component) -> None:
        mol = Chem.MolFromSmiles(component.smiles)
        if mol is None:
            return  # loader counts parse failures; search skips them
        cid = self._next_id
        self._next_id += 1
        canonical = Chem.MolToSmiles(mol)
        mbits = morgan_bits(mol)
        self._pending.append(
            (
                cid,
                component.regid,
                component.mixture_id,
                component.comp_index,
                canonical,
                component.mol_formula,
                component.mol_weight,
                bits_to_bytes(mbits),
                len(mbits),
            )
        )
        self._pending_bits.append((cid, pattern_bits(mol)))

    def build(self) -> None:
        cur = self._conn.cursor()
        cur.executescript(
            """
            DROP TABLE IF EXISTS component;
            DROP TABLE IF EXISTS pattern_bit;
            CREATE TABLE component (
                id INTEGER PRIMARY KEY,
                regid TEXT NOT NULL,
                mixture_id TEXT,
                comp_index INTEGER,
                canonical_smiles TEXT,
                mol_formula TEXT,
                mol_weight REAL,
                morgan_blob BLOB,
                morgan_popcount INTEGER
            );
            CREATE TABLE pattern_bit (
                component_id INTEGER NOT NULL,
                bit_index INTEGER NOT NULL
            );
            """
        )
        cur.executemany(
            "INSERT INTO component VALUES (?,?,?,?,?,?,?,?,?)", self._pending
        )
        rows = [
            (cid, bit) for cid, bits in self._pending_bits for bit in bits
        ]
        cur.executemany(
            "INSERT INTO pattern_bit (component_id, bit_index) VALUES (?,?)", rows
        )
        cur.executescript(
            """
            CREATE INDEX ix_component_smiles ON component(canonical_smiles);
            CREATE INDEX ix_component_popcount ON component(morgan_popcount);
            CREATE INDEX ix_pattern_bit ON pattern_bit(bit_index);
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
            return []
        qbits = pattern_bits(qmol)

        with self._lock:
            # Phase 1 — SQL screening: candidates whose pattern bits ⊇ query bits.
            candidate_ids = self._screen_superset(qbits)
            rows = self._fetch_components(candidate_ids)

        # Phase 2 — exact substructure match in RDKit on the survivors.
        hits: list[Hit] = []
        for row in rows:
            cid, regid, mixture_id, comp_index, smiles, formula, weight, _, _ = row
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

    # ---- helpers ----

    def _screen_superset(self, qbits: list[int]) -> list[int]:
        """IDs of components whose pattern bits are a superset of ``qbits``."""
        if not qbits:
            # No discriminating bits → every component is a candidate.
            cur = self._conn.cursor()
            cur.execute("SELECT id FROM component")
            return [r[0] for r in cur.fetchall()]

        # Count, per component, how many query bits it carries; a full match
        # means it carries all of them. Chunk the IN-list for Oracle's 1000 cap.
        counts: dict[int, int] = {}
        cur = self._conn.cursor()
        for start in range(0, len(qbits), _IN_CHUNK):
            chunk = qbits[start : start + _IN_CHUNK]
            placeholders = ",".join("?" for _ in chunk)
            cur.execute(
                f"SELECT component_id, COUNT(*) FROM pattern_bit "
                f"WHERE bit_index IN ({placeholders}) GROUP BY component_id",
                chunk,
            )
            for cid, n in cur.fetchall():
                counts[cid] = counts.get(cid, 0) + n
        need = len(qbits)
        return [cid for cid, n in counts.items() if n == need]

    def _fetch_components(self, ids: list[int]):
        if not ids:
            return []
        rows = []
        cur = self._conn.cursor()
        for start in range(0, len(ids), _IN_CHUNK):
            chunk = ids[start : start + _IN_CHUNK]
            placeholders = ",".join("?" for _ in chunk)
            cur.execute(
                f"SELECT id, regid, mixture_id, comp_index, canonical_smiles, "
                f"mol_formula, mol_weight, morgan_blob, morgan_popcount "
                f"FROM component WHERE id IN ({placeholders})",
                chunk,
            )
            rows.extend(cur.fetchall())
        return rows


def _row_hit(row) -> Hit:
    regid, mixture_id, comp_index, formula, weight = row
    return Hit(regid, mixture_id, formula, weight, comp_index, None)
