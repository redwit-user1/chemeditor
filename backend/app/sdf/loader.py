"""Load the foundation's SDF export into component records.

Field schema (see CLAUDE.md). The MOL block (V2000) is authoritative; the
``STRUCTUREAGGREGATION`` ChemDraw base64 is preserved verbatim into ``raw_cdx``
and **never parsed**.

Interpretation note (must be confirmed against the real export): each SDF record
carries one component connection table plus its metadata as properties. A
multi-component mixture is represented as consecutive records that share a
MIXTUREID, with a per-record component index. This is the RDKit-native reading
and avoids embedding blank-line-bearing molblocks inside data fields. If the
real export instead stores component structures inside
``VW_MIXTURE_STRUCTURE.STRUCTURE (n)`` fields, only the field resolution here
needs to change — the downstream contract (a list of ComponentRecord) stays.

Per project rule, a ``None`` from RDKit is never swallowed: parse failures are
counted and reported, not skipped silently.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from rdkit import Chem

# Tag name candidates, in priority order, for each logical field.
_REGID_TAGS = [
    "VW_MIXTURE_REGNUMBER.REGID",
    "MIXTURES.REGID",
    "REGID",
]
_MIXTUREID_TAGS = [
    "VW_MIXTURE_REGNUMBER.MIXTUREID",
    "MIXTUREID",
]
_FORMULA_TAGS = [
    "MIXTURES.Mol Formula",
    "VW_MIXTURE_REGNUMBER.Mol Formula",
    "Mol Formula",
]
_WEIGHT_TAGS = [
    "MIXTURES.Mol Wt",
    "VW_MIXTURE_REGNUMBER.Mol Wt",
    "Mol Wt",
]
_COMPONENT_TAGS = ["MIXTURES.COMPONENT", "COMPONENT", "COMP_INDEX"]
_RAW_CDX_TAGS = ["MIXTURES.STRUCTUREAGGREGATION", "STRUCTUREAGGREGATION"]


@dataclass(frozen=True)
class ComponentRecord:
    regid: str
    mixture_id: str
    comp_index: int
    molblock: str
    sdf_formula: str | None
    sdf_weight: float | None
    raw_cdx: str | None  # preserved, never parsed


@dataclass
class LoadResult:
    components: list[ComponentRecord] = field(default_factory=list)
    n_records: int = 0
    n_parse_failures: int = 0
    parse_failure_regids: list[str] = field(default_factory=list)

    @property
    def n_components(self) -> int:
        return len(self.components)


def _first_prop(props: dict, tags: list[str]) -> str | None:
    for tag in tags:
        if tag in props and props[tag] not in (None, ""):
            return str(props[tag])
    return None


def _to_float(value: str | None) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except ValueError:
        return None


def load_sdf(path: str) -> LoadResult:
    """Parse an SDF file into component records.

    RDKit returns ``None`` for records it cannot sanitize; those are counted in
    ``n_parse_failures`` (with their REGID when recoverable) rather than dropped.
    """
    result = LoadResult()
    supplier = Chem.SDMolSupplier(path, sanitize=True, removeHs=False)

    for index, mol in enumerate(supplier):
        result.n_records += 1
        if mol is None:
            # We still want the REGID for the report if the raw record exposes
            # it, but a failed sanitize gives us no props — record positionally.
            result.n_parse_failures += 1
            result.parse_failure_regids.append(f"<record #{index + 1}>")
            continue

        props = mol.GetPropsAsDict(includePrivate=False, includeComputed=False)
        regid = _first_prop(props, _REGID_TAGS) or f"<record #{index + 1}>"
        mixture_id = _first_prop(props, _MIXTUREID_TAGS) or regid
        comp_raw = _first_prop(props, _COMPONENT_TAGS)
        try:
            comp_index = int(float(comp_raw)) if comp_raw is not None else 1
        except ValueError:
            comp_index = 1

        # Strip data props from the molblock we keep (keeps it a clean CTAB).
        molblock = Chem.MolToMolBlock(mol)

        result.components.append(
            ComponentRecord(
                regid=regid,
                mixture_id=mixture_id,
                comp_index=comp_index,
                molblock=molblock,
                sdf_formula=_first_prop(props, _FORMULA_TAGS),
                sdf_weight=_to_float(_first_prop(props, _WEIGHT_TAGS)),
                raw_cdx=_first_prop(props, _RAW_CDX_TAGS),
            )
        )
    return result


def to_smiles(record: ComponentRecord) -> str | None:
    """Canonical SMILES for a component, or ``None`` if the CTAB won't parse."""
    mol = Chem.MolFromMolBlock(record.molblock)
    return Chem.MolToSmiles(mol) if mol is not None else None
