"""Load the foundation's SDF export into component records.

Field schema (see CLAUDE.md). The MOL block (V2000) is authoritative; the
``STRUCTUREAGGREGATION`` ChemDraw base64 is preserved verbatim into ``raw_cdx``
and **never parsed**.

Why a text-level parser instead of ``Chem.SDMolSupplier``: the documented export
stores each component's structure inside a *data field*
(``VW_MIXTURE_STRUCTURE.STRUCTURE (n)``), and a V2000 molblock contains blank
lines. The strict SDF rule "a field value ends at the first blank line" would
truncate those embedded molblocks, so RDKit's supplier cannot read this layout.
This parser instead ends a field value at the next ``> <`` tag (or ``$$$$``),
which reads both flat single-line fields and embedded multi-line molblocks.

A record may describe a multi-component mixture two ways, both handled:

* **Embedded** — one or more ``VW_MIXTURE_STRUCTURE.STRUCTURE`` fields, each a
  component molblock, with per-component ``MIXTURES.*`` fields in the same order.
* **Flat** — no structure fields; the record's own connection table is the
  single component, using the parent ``VW_MIXTURE_REGNUMBER.*`` fields.

Per project rule, a ``None`` from RDKit is never swallowed: parse failures are
counted and reported.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from rdkit import Chem

# Tag base names (any trailing " (n)" / "_n" / " n" index suffix is stripped
# before matching, so repeated or suffixed component tags group together).
_STRUCTURE_TAG = "VW_MIXTURE_STRUCTURE.STRUCTURE"
_REGID_TAGS = ["VW_MIXTURE_REGNUMBER.REGID", "MIXTURES.REGID", "REGID"]
_MIXTUREID_TAGS = ["VW_MIXTURE_REGNUMBER.MIXTUREID", "MIXTUREID"]
_COMPONENT_FORMULA_TAGS = ["MIXTURES.Mol Formula"]
_COMPONENT_WEIGHT_TAGS = ["MIXTURES.Mol Wt"]
_PARENT_FORMULA_TAGS = ["VW_MIXTURE_REGNUMBER.Mol Formula", "Mol Formula"]
_PARENT_WEIGHT_TAGS = ["VW_MIXTURE_REGNUMBER.Mol Wt", "Mol Wt"]
_RAW_CDX_TAG = "MIXTURES.STRUCTUREAGGREGATION"

_INDEX_SUFFIX = re.compile(r"[\s_]*\(?\d+\)?\s*$")


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


@dataclass
class _RawRecord:
    ctab: str  # leading connection table (through 'M  END')
    fields: list[tuple[str, str]]  # ordered (tag, value), duplicates kept


def _base_tag(tag: str) -> str:
    return _INDEX_SUFFIX.sub("", tag).strip()


def _record_from_lines(lines: list[str]) -> _RawRecord | None:
    if not any(line.strip() for line in lines):
        return None
    # Connection table: everything up to and including the first 'M  END'.
    ctab_lines: list[str] = []
    i = -1
    for i, line in enumerate(lines):
        ctab_lines.append(line)
        if line.strip() == "M  END":
            break
    ctab = "\n".join(ctab_lines)

    # Data fields: '> <TAG>' then value lines until the next '> <' tag or EOF.
    fields: list[tuple[str, str]] = []
    j = i + 1
    while j < len(lines):
        m = re.match(r">\s*<([^>]+)>", lines[j])
        if not m:
            j += 1
            continue
        tag = m.group(1).strip()
        value_lines: list[str] = []
        j += 1
        while j < len(lines) and not re.match(r">\s*<[^>]+>", lines[j]):
            value_lines.append(lines[j])
            j += 1
        # rstrip only: an embedded V2000 molblock's first line is a blank
        # molecule-name line that must be preserved, or the counts line shifts.
        value = "\n".join(value_lines).rstrip("\n")
        fields.append((tag, value if "\n" in value else value.strip()))
    return _RawRecord(ctab=ctab, fields=fields)


def parse_records(text: str) -> list[_RawRecord]:
    """Split SDF text into records by the ``$$$$`` delimiter line.

    Line-based (not ``split('$$$$')``) so the delimiter's newline never shifts
    the molblock header, and so embedded multi-line field values survive intact.
    """
    records: list[_RawRecord] = []
    current: list[str] = []
    for line in text.splitlines():
        if line.strip() == "$$$$":
            rec = _record_from_lines(current)
            if rec is not None:
                records.append(rec)
            current = []
        else:
            current.append(line)
    rec = _record_from_lines(current)
    if rec is not None:
        records.append(rec)
    return records


def _first(fields: list[tuple[str, str]], names: list[str]) -> str | None:
    bases = {n for n in names}
    for tag, value in fields:
        if _base_tag(tag) in bases and value != "":
            return value
    return None


def _all(fields: list[tuple[str, str]], name: str) -> list[str]:
    return [v for tag, v in fields if _base_tag(tag) == name]


def _to_float(value: str | None) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except ValueError:
        return None


def _components_from_record(rec: _RawRecord) -> list[ComponentRecord]:
    regid = _first(rec.fields, _REGID_TAGS) or "<unknown>"
    mixture_id = _first(rec.fields, _MIXTUREID_TAGS) or regid

    structures = _all(rec.fields, _STRUCTURE_TAG)
    comp_formulas = [
        v for name in _COMPONENT_FORMULA_TAGS for v in _all(rec.fields, name)
    ]
    comp_weights = [
        v for name in _COMPONENT_WEIGHT_TAGS for v in _all(rec.fields, name)
    ]
    raw_cdxs = _all(rec.fields, _RAW_CDX_TAG)
    parent_formula = _first(rec.fields, _PARENT_FORMULA_TAGS)
    parent_weight = _to_float(_first(rec.fields, _PARENT_WEIGHT_TAGS))

    def pick(seq: list, i: int, default=None):
        return seq[i] if i < len(seq) else default

    if structures:
        # Embedded layout: one component per STRUCTURE field.
        out = []
        for idx, molblock in enumerate(structures):
            out.append(
                ComponentRecord(
                    regid=regid,
                    mixture_id=mixture_id,
                    comp_index=idx + 1,
                    molblock=molblock,
                    sdf_formula=pick(comp_formulas, idx, parent_formula),
                    sdf_weight=_to_float(pick(comp_weights, idx))
                    if idx < len(comp_weights)
                    else parent_weight,
                    raw_cdx=pick(raw_cdxs, idx),
                )
            )
        return out

    # Flat layout: the record's own CTAB is the single component.
    return [
        ComponentRecord(
            regid=regid,
            mixture_id=mixture_id,
            comp_index=1,
            molblock=rec.ctab,
            sdf_formula=pick(comp_formulas, 0, parent_formula),
            sdf_weight=_to_float(pick(comp_weights, 0)) if comp_weights else parent_weight,
            raw_cdx=pick(raw_cdxs, 0),
        )
    ]


def load_sdf(path: str) -> LoadResult:
    """Parse an SDF file into component records (text-level, multi-component)."""
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        text = fh.read()

    result = LoadResult()
    for rec in parse_records(text):
        result.n_records += 1
        components = _components_from_record(rec)
        for comp in components:
            # Validate the CTAB parses; count failures, keep the record for the
            # parity report (which will flag it as unparsable) rather than drop.
            if Chem.MolFromMolBlock(comp.molblock) is None:
                result.n_parse_failures += 1
                result.parse_failure_regids.append(comp.regid)
            result.components.append(comp)
    return result


def to_smiles(record: ComponentRecord) -> str | None:
    """Canonical SMILES for a component, or ``None`` if the CTAB won't parse."""
    mol = Chem.MolFromMolBlock(record.molblock)
    return Chem.MolToSmiles(mol) if mol is not None else None
