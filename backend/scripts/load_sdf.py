"""Load SDF files into a persistent PortableFPBackend index (SQLite).

Usage:  python -m scripts.load_sdf <sdf_dir_or_file> [db_path]

The resulting SQLite file is the same schema that ports to Oracle SE. Parse
failures are reported, never silently dropped.
"""

from __future__ import annotations

import glob
import os
import sqlite3
import sys

from app.sdf.loader import load_sdf, to_smiles
from app.search.backend import Component
from app.search.portable_fp import PortableFPBackend


def _find_sdfs(path: str) -> list[str]:
    if os.path.isfile(path):
        return [path]
    if os.path.isdir(path):
        return sorted(
            glob.glob(os.path.join(path, "*.sdf"))
            + glob.glob(os.path.join(path, "*.sd"))
        )
    return []


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        raise SystemExit(1)
    target = sys.argv[1]
    db_path = sys.argv[2] if len(sys.argv) > 2 else "chemsearch.sqlite3"

    sdfs = _find_sdfs(target)
    if not sdfs:
        print(f"No .sdf files found under {target!r}")
        raise SystemExit(1)

    conn = sqlite3.connect(db_path)
    backend = PortableFPBackend(conn)

    n_components = 0
    n_smiles_fail = 0
    n_parse_fail = 0
    for sdf in sdfs:
        loaded = load_sdf(sdf)
        n_parse_fail += loaded.n_parse_failures
        for rec in loaded.components:
            smiles = to_smiles(rec)
            if smiles is None:
                n_smiles_fail += 1
                continue
            backend.add_component(
                Component(
                    regid=rec.regid,
                    mixture_id=rec.mixture_id,
                    comp_index=rec.comp_index,
                    smiles=smiles,
                    mol_formula=rec.sdf_formula or "",
                    mol_weight=rec.sdf_weight or 0.0,
                )
            )
            n_components += 1

    backend.build()
    conn.close()
    print(
        f"Loaded {n_components} components into {db_path} "
        f"(record parse failures: {n_parse_fail}, CTAB->SMILES failures: "
        f"{n_smiles_fail})"
    )


if __name__ == "__main__":
    main()
