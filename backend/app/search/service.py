"""Search index wiring for the API.

Builds a ``PortableFPBackend`` index at application startup. Source order:

1. ``CHEM_INDEX_SDF`` env var → that SDF file / directory,
2. otherwise the bundled fixture, so the demo always has something to search.

The portable backend is the default (it is the one that ships). Set
``CHEM_BACKEND=pg`` with ``PG_DSN`` to use the cartridge baseline instead.
"""

from __future__ import annotations

import glob
import os

from ..sdf.loader import load_sdf, to_smiles
from .backend import ChemSearchBackend, Component
from .portable_fp import PortableFPBackend

_FIXTURE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "tests",
    "fixtures",
    "sample_foundation.sdf",
)


def _sdf_paths(target: str) -> list[str]:
    if os.path.isfile(target):
        return [target]
    if os.path.isdir(target):
        return sorted(
            glob.glob(os.path.join(target, "*.sdf"))
            + glob.glob(os.path.join(target, "*.sd"))
        )
    return []


def _components_from_sdf(paths: list[str]) -> list[Component]:
    components: list[Component] = []
    for path in paths:
        loaded = load_sdf(path)
        for rec in loaded.components:
            smiles = to_smiles(rec)
            if smiles is None:
                continue
            components.append(
                Component(
                    regid=rec.regid,
                    mixture_id=rec.mixture_id,
                    comp_index=rec.comp_index,
                    smiles=smiles,
                    mol_formula=rec.sdf_formula or "",
                    mol_weight=rec.sdf_weight or 0.0,
                )
            )
    return components


def _make_backend() -> ChemSearchBackend:
    """Select the backend via ``CHEM_SEARCH_BACKEND`` (SPEC §5).

    Default ``portable_fp`` — the Oracle-portable path is what ships and what
    the feasibility numbers are measured on. ``pg_cartridge`` requires PG_DSN.
    """
    choice = os.environ.get("CHEM_SEARCH_BACKEND", "portable_fp")
    if choice == "pg_cartridge":
        dsn = os.environ.get("PG_DSN")
        if not dsn:
            raise RuntimeError("CHEM_SEARCH_BACKEND=pg_cartridge requires PG_DSN")
        from .pg_cartridge import PgCartridgeBackend

        return PgCartridgeBackend(dsn)
    if choice != "portable_fp":
        raise RuntimeError(f"unknown CHEM_SEARCH_BACKEND: {choice!r}")
    return PortableFPBackend()


def build_index() -> tuple[ChemSearchBackend, int, str, dict[str, list[Component]]]:
    """Return ``(backend, n_indexed, source_label, components_by_regid)``.

    The component store backs ``GET /compounds/{reg_id}`` and SDF export.
    """
    target = os.environ.get("CHEM_INDEX_SDF", "")
    paths = _sdf_paths(target) if target else []
    source = target
    if not paths:
        paths = _sdf_paths(_FIXTURE)
        source = "bundled fixture"

    components = _components_from_sdf(paths)
    backend = _make_backend()
    store: dict[str, list[Component]] = {}
    for comp in components:
        backend.add_component(comp)
        store.setdefault(comp.regid, []).append(comp)
    backend.build()
    return backend, len(components), source, store
