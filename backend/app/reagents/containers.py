"""Container-level reagent inventory (SPEC §2.2).

The Reagent master (``inventory.py``) answers "what substance is this"; a
Container answers "which physical bottle, where, how much is left" — the unit
the foundation's stockroom actually manages (barcode, location, supplier,
lot). The InventoryDialog result grid shows containers, not substances.

Demo data is deterministic and synthetic, shaped after the foundation's
Inventory Enterprise screenshots (container IDs like ``C33000884``, locations
like ``Stock Room 3 7F N`` / owner names). In production this table is fed by
the stockroom DB / MIS interface (PRD M4-10, Phase 2).
"""

from __future__ import annotations

from dataclasses import dataclass

from .inventory import REAGENTS, Reagent, search_by_substructure, search_by_text


@dataclass(frozen=True)
class Container:
    internal_id: int
    container_id: str  # barcode
    reagent: Reagent
    location: str
    amount: float
    unit: str
    supplier: str
    catalog_no: str
    cost: float | None
    lot_no: str
    owner: str


_LOCATIONS = [
    "Stock Room 3 7F N",
    "Stock Room 3 7F S",
    "MedChem Lab 501 Fridge A",
    "MedChem Lab 501 Shelf 2",
    "Analysis Lab 302 Cabinet 1",
    "KIM JINA",
]

_SUPPLIERS = [
    ("Aldrich", 45.0),
    ("TCI", 38.0),
    ("ChemScene", 52.0),
    ("BLDpharm", 61.0),
    ("Angene", 29.0),
]


def _build_containers() -> list[Container]:
    """Deterministic synthetic stock: 1–2 containers per master reagent."""
    out: list[Container] = []
    internal = 400
    for i, reagent in enumerate(REAGENTS):
        n_containers = 2 if i % 3 == 0 else 1
        for j in range(n_containers):
            internal += 1
            supplier, base_cost = _SUPPLIERS[(i + j) % len(_SUPPLIERS)]
            is_liquid = reagent.mol_weight < 150  # crude but deterministic
            out.append(
                Container(
                    internal_id=internal,
                    container_id=f"C{33000800 + internal}",
                    reagent=reagent,
                    location=_LOCATIONS[(i + j) % len(_LOCATIONS)],
                    amount=[500.0, 100.0, 25.0][(i + j) % 3],
                    unit="ml" if is_liquid else "g",
                    supplier=supplier,
                    catalog_no=f"{supplier[:2].upper()}-{1000 + i * 7 + j}",
                    cost=round(base_cost + (i % 5) * 12.5, 2),
                    lot_no=f"LOT{2400 + i}{chr(65 + j)}",
                    owner="KIM JINA" if (i + j) % 4 == 0 else "MedChem Team",
                )
            )
    return out


CONTAINERS: list[Container] = _build_containers()


def search_containers(
    name: str = "", cas: str = "", location: str = "", limit: int = 50
) -> list[Container]:
    """Filter containers by (any of) substance name, CAS, location substring."""
    n, c, loc = name.strip().lower(), cas.strip().lower(), location.strip().lower()
    if not (n or c or loc):
        return []
    hits = [
        ct
        for ct in CONTAINERS
        if (not n or n in ct.reagent.name.lower())
        and (not c or c in ct.reagent.cas.lower())
        and (not loc or loc in ct.location.lower())
    ]
    return hits[:limit]


def search_containers_by_structure(
    query_smiles: str, mode: str = "substructure", limit: int = 50
) -> list[Container]:
    """Structure search over the master, expanded to that reagent's containers."""
    if mode == "exact":
        matches = {
            r.cas for r in REAGENTS if _canonical(query_smiles) == r.smiles
        }
    else:
        matches = {r.cas for r in search_by_substructure(query_smiles, limit=999)}
    return [ct for ct in CONTAINERS if ct.reagent.cas in matches][:limit]


def _canonical(smiles: str) -> str | None:
    from rdkit import Chem

    mol = Chem.MolFromSmiles(smiles)
    return Chem.MolToSmiles(mol) if mol is not None else None


# Re-export text search at container granularity for the simple tab.
__all__ = [
    "Container",
    "CONTAINERS",
    "search_containers",
    "search_containers_by_structure",
    "search_by_text",
]
