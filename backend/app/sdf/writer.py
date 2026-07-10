"""Export ``ComponentRecord`` lists back to the foundation SDF schema.

This is the inverse of :mod:`app.sdf.loader`. The contract is round-trip
fidelity: ``load_sdf`` → ``write_sdf`` → ``load_sdf`` must lose nothing —
same ``(regid, comp_index)`` set, same ``sdf_formula`` / ``sdf_weight`` per
component, ``raw_cdx`` preserved byte-identical, and every molblock still
parsing to the same canonical SMILES.

Layout choices (driven entirely by what the reader can re-read):

* Components are grouped by ``(regid, mixture_id)``; each group becomes one
  SDF record, delimited by a ``$$$$`` line.
* The record's leading connection table is component 1's molblock verbatim
  (the reader treats the leading CTAB as canonical for flat records).
* **Single-component** groups use the *flat* layout: the leading CTAB is the
  component and there is no embedded ``VW_MIXTURE_STRUCTURE.STRUCTURE`` field.
* **Multi-component** groups additionally emit, per component *n*, an embedded
  ``VW_MIXTURE_STRUCTURE.STRUCTURE (n)`` field carrying the component molblock
  verbatim (leading blank name line preserved).
* ``MIXTURES.Mol Formula (n)`` / ``MIXTURES.Mol Wt (n)`` are emitted per
  component. For multi-component groups they are always emitted (even empty)
  so the reader's *positional* pairing of component fields stays aligned.
* ``MIXTURES.STRUCTUREAGGREGATION (n)`` is emitted **only** when ``raw_cdx``
  is not ``None`` — the base64 payload is passed through verbatim and never
  decoded or parsed.

Field values are written so the reader re-reads them exactly: a value ends at
the next ``> <`` tag, so molblocks (which contain internal blank lines but no
tag lines) survive intact, including their leading blank molecule-name line.
"""

from __future__ import annotations

from collections import OrderedDict

from .loader import ComponentRecord

_DELIMITER = "$$$$"

_REGID_TAG = "VW_MIXTURE_REGNUMBER.REGID"
_MIXTUREID_TAG = "VW_MIXTURE_REGNUMBER.MIXTUREID"
_PARENT_FORMULA_TAG = "VW_MIXTURE_REGNUMBER.Mol Formula"
_PARENT_WEIGHT_TAG = "VW_MIXTURE_REGNUMBER.Mol Wt"
_COMPONENT_FORMULA_TAG = "MIXTURES.Mol Formula"
_COMPONENT_WEIGHT_TAG = "MIXTURES.Mol Wt"
_STRUCTURE_TAG = "VW_MIXTURE_STRUCTURE.STRUCTURE"
_RAW_CDX_TAG = "MIXTURES.STRUCTUREAGGREGATION"


def _fmt_weight(value: float | None) -> str:
    """Render a weight so ``float(...)`` reads back the identical value."""
    if value is None:
        return ""
    return repr(value)


def _emit_field(lines: list[str], tag: str, value: str) -> None:
    """Append a ``> <tag>`` block whose value the reader will re-read verbatim.

    The value is split on newlines so a multi-line molblock (with its leading
    blank name line) is written line-for-line. A trailing blank line separates
    this field from the next tag; the reader skips it while scanning for the
    next ``> <`` tag and ``rstrip``s it off the value.
    """
    lines.append(f"> <{tag}>")
    lines.extend(value.split("\n"))
    lines.append("")


def _emit_record(
    lines: list[str],
    regid: str,
    mixture_id: str,
    comps: list[ComponentRecord],
    parent_formula: str | None,
    parent_weight: float | None,
) -> None:
    comps = sorted(comps, key=lambda c: c.comp_index)
    multi = len(comps) > 1

    # Leading CTAB = component 1's molblock, verbatim (leading blank name line
    # preserved by split/join).
    lines.extend(comps[0].molblock.split("\n"))
    lines.append("")

    _emit_field(lines, _REGID_TAG, regid)
    _emit_field(lines, _MIXTUREID_TAG, mixture_id)
    if parent_formula is not None:
        _emit_field(lines, _PARENT_FORMULA_TAG, parent_formula)
    if parent_weight is not None:
        _emit_field(lines, _PARENT_WEIGHT_TAG, _fmt_weight(parent_weight))

    for n, comp in enumerate(comps, start=1):
        suffix = f" ({n})" if multi else ""
        # For multi-component groups always emit formula/weight (even empty) so
        # the reader's positional pairing across components does not shift.
        if multi or comp.sdf_formula is not None:
            _emit_field(
                lines, f"{_COMPONENT_FORMULA_TAG}{suffix}", comp.sdf_formula or ""
            )
        if multi or comp.sdf_weight is not None:
            _emit_field(
                lines, f"{_COMPONENT_WEIGHT_TAG}{suffix}", _fmt_weight(comp.sdf_weight)
            )
        if multi:
            _emit_field(lines, f"{_STRUCTURE_TAG}{suffix}", comp.molblock)
        if comp.raw_cdx is not None:
            _emit_field(lines, f"{_RAW_CDX_TAG}{suffix}", comp.raw_cdx)


def write_sdf(
    components: list[ComponentRecord],
    parent_formula: dict[str, str] | None = None,
    parent_weight: dict[str, float] | None = None,
) -> str:
    """Serialize component records to foundation-schema SDF text.

    ``parent_formula`` / ``parent_weight`` are optional maps keyed by ``regid``
    supplying the parent ``VW_MIXTURE_REGNUMBER.*`` values for a record. They
    are metadata only; round-trip fidelity does not depend on them.
    """
    if not components:
        return ""

    parent_formula = parent_formula or {}
    parent_weight = parent_weight or {}

    groups: "OrderedDict[tuple[str, str], list[ComponentRecord]]" = OrderedDict()
    for comp in components:
        groups.setdefault((comp.regid, comp.mixture_id), []).append(comp)

    out: list[str] = []
    for (regid, mixture_id), comps in groups.items():
        lines: list[str] = []
        _emit_record(
            lines,
            regid,
            mixture_id,
            comps,
            parent_formula.get(regid),
            parent_weight.get(regid),
        )
        out.append("\n".join(lines))

    # Each record is followed by a delimiter line; trailing text after the last
    # delimiter is empty and the reader discards it.
    return "".join(f"{rec}\n{_DELIMITER}\n" for rec in out)


def write_sdf_file(
    path: str,
    components: list[ComponentRecord],
    parent_formula: dict[str, str] | None = None,
    parent_weight: dict[str, float] | None = None,
) -> None:
    """Write :func:`write_sdf` output to ``path`` (UTF-8)."""
    text = write_sdf(components, parent_formula, parent_weight)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
