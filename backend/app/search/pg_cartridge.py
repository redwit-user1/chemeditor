"""PostgreSQL + RDKit cartridge backend — the development/benchmark baseline.

This is the fast, native path the PoC develops against. It is *not* the path
that ships: production is Oracle SE, which has no cartridge (that is what
``PortableFPBackend`` is for). Its role is to be the performance reference and,
in the equivalence suite, a second independent implementation that must agree
with the brute-force reference.

Requires the ``rdkit`` extension and ``psycopg`` (imported lazily so the rest of
the app runs without them). It is exercised only when a ``PG_DSN`` is supplied.
"""

from __future__ import annotations

from rdkit import Chem

from .backend import ChemSearchBackend, Component, Hit, rollup_by_regid


class PgCartridgeBackend(ChemSearchBackend):
    name = "pg_cartridge"

    def __init__(self, dsn: str, schema: str = "chemsearch") -> None:
        import psycopg  # lazy: only needed for this backend

        self._psycopg = psycopg
        self._conn = psycopg.connect(dsn, autocommit=True)
        self._schema = schema
        self._pending: list[tuple] = []

    def add_component(self, component: Component) -> None:
        mol = Chem.MolFromSmiles(component.smiles)
        if mol is None:
            return
        canonical = Chem.MolToSmiles(mol)
        self._pending.append(
            (
                component.regid,
                component.mixture_id,
                component.comp_index,
                canonical,
                component.mol_formula,
                component.mol_weight,
            )
        )

    def build(self) -> None:
        cur = self._conn.cursor()
        cur.execute("CREATE EXTENSION IF NOT EXISTS rdkit")
        cur.execute(f"DROP TABLE IF EXISTS {self._schema}_component")
        # `mol` and `bfp` are cartridge column types; the GiST indexes are what
        # make @> (substructure) and % (similarity) fast.
        cur.execute(
            f"""
            CREATE TABLE {self._schema}_component (
                id SERIAL PRIMARY KEY,
                regid TEXT NOT NULL,
                mixture_id TEXT,
                comp_index INTEGER,
                canonical_smiles TEXT,
                mol_formula TEXT,
                mol_weight DOUBLE PRECISION,
                m mol,
                mfp bfp
            )
            """
        )
        cur.executemany(
            f"""
            INSERT INTO {self._schema}_component
                (regid, mixture_id, comp_index, canonical_smiles,
                 mol_formula, mol_weight, m, mfp)
            VALUES (%s, %s, %s, %s, %s, %s, mol_from_smiles(%s::cstring),
                    morganbv_fp(mol_from_smiles(%s::cstring)))
            """,
            [(r[0], r[1], r[2], r[3], r[4], r[5], r[3], r[3]) for r in self._pending],
        )
        cur.execute(
            f"CREATE INDEX ix_{self._schema}_m ON {self._schema}_component "
            f"USING gist(m)"
        )
        cur.execute(
            f"CREATE INDEX ix_{self._schema}_mfp ON {self._schema}_component "
            f"USING gist(mfp)"
        )
        cur.execute(
            f"CREATE INDEX ix_{self._schema}_smiles ON {self._schema}_component "
            f"(canonical_smiles)"
        )

    def exact_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        canonical = Chem.MolToSmiles(qmol)
        cur = self._conn.cursor()
        cur.execute(
            f"SELECT regid, mixture_id, comp_index, mol_formula, mol_weight "
            f"FROM {self._schema}_component WHERE canonical_smiles = %s",
            (canonical,),
        )
        return rollup_by_regid([_row_hit(r) for r in cur.fetchall()])

    def substructure_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        cur = self._conn.cursor()
        # m @> query : the stored molecule contains the query substructure.
        cur.execute(
            f"SELECT regid, mixture_id, comp_index, mol_formula, mol_weight "
            f"FROM {self._schema}_component "
            f"WHERE m @> mol_from_smiles(%s::cstring)",
            (query_smiles,),
        )
        return rollup_by_regid([_row_hit(r) for r in cur.fetchall()])

    def similarity_search(self, query_smiles: str, threshold: float) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        cur = self._conn.cursor()
        cur.execute("SET rdkit.tanimoto_threshold = %s", (threshold,))
        cur.execute(
            f"""
            SELECT regid, mixture_id, comp_index, mol_formula, mol_weight,
                   tanimoto_sml(mfp, morganbv_fp(mol_from_smiles(%s::cstring))) AS s
            FROM {self._schema}_component
            WHERE mfp % morganbv_fp(mol_from_smiles(%s::cstring))
            """,
            (query_smiles, query_smiles),
        )
        hits = [
            Hit(r[0], r[1], r[3], r[4], r[2], float(r[5]))
            for r in cur.fetchall()
        ]
        return rollup_by_regid(hits)


def _row_hit(row) -> Hit:
    regid, mixture_id, comp_index, formula, weight = row
    return Hit(regid, mixture_id, formula, weight, comp_index, None)
