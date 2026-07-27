"""Stoichiometry for the LIMS reagent-usage flow (Goono ELN).

Why this is not :mod:`app.chem.stoich`
--------------------------------------
:mod:`app.chem.stoich` computes the *synthesis-note* table (SPEC §3.2). It is
deliberately strict: every row declares which quantity is ``given``, ``fw`` is
mandatory, exactly one row must be flagged limiting, and any contract
violation raises — the note table is authored by a chemist who is expected to
supply a complete row.

This module serves a different caller. Goono's LIMS records what was actually
taken out of stock: ``DELTA_AMOUNT`` + ``UNIT_CCD`` from ``PL_LIMS_STOCK_TXN``,
joined to ``PL_LIMS_REAGENT.MOL_WT``. That data is *incomplete by nature* — a
solvent has no molecular weight on file, a liquid reagent is recorded in mL
with no density, a newly registered reagent has a null ``MOL_WT``. The table
still has to render.

So the contract here is **tolerant and per-row**: a row that cannot be
converted comes back with ``ok=False`` and a stated ``reason``, and every other
row still computes. Nothing raises. The Goono UI renders the reason in the
cell — the project rule is that an uncomputable number is shown as a reason,
never as a blank and never as a zero (a zero would read as "we used none of
it", which is a different and false claim).

Arithmetic
----------
::

    mass_g     = amount * unit_factor                (mass units)
    mass_g     = volume_ml * density                 (volume units, density req.)
    effective  = mass_g * purity
    mmol       = effective / mol_wt * 1000
    mmol       = amount * 1000                       (unit 'mol')
    equiv      = mmol / limiting_mmol
    theo_mmol  = limiting_mmol * (product_coeff / limiting_coeff)
    theo_mass  = theo_mmol * product_mol_wt / 1000
    yield_pct  = product_mmol / theo_mmol * 100

All of it runs in :class:`~decimal.Decimal`. Floats arrive at the boundary and
leave at the boundary; nothing in between is rounded. Round at the
presentation layer with :func:`~app.chem.stoich.round_display`.

Per CLAUDE.md, an RDKit ``None`` is never swallowed: a SMILES that fails to
parse produces ``reason_code='smiles_parse_failed'`` carrying RDKit's own
reason, is logged, and is counted in :attr:`UsageResult.n_rdkit_failures`.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from decimal import Decimal, InvalidOperation
from typing import Callable, Optional

__all__ = [
    "UsageEntry",
    "UsageRowResult",
    "UsageResult",
    "compute_usage_stoichiometry",
    "normalize_unit",
    "UNIT_ALIASES",
    "REASON_CODES",
]

logger = logging.getLogger(__name__)

# Canonical unit -> alias set. Goono maps its own UNIT_CCD codes onto these
# canonical names before calling; the alias table is generous so that a raw
# code or an English word both land correctly.
UNIT_ALIASES: dict[str, tuple[str, ...]] = {
    "g": ("g", "gram", "grams", "gm"),
    "mg": ("mg", "milligram", "milligrams"),
    "kg": ("kg", "kilogram", "kilograms"),
    "mol": ("mol", "mole", "moles"),
    "mmol": ("mmol", "millimole", "millimoles"),
    "mL": ("ml", "milliliter", "millilitre", "milliliters", "millilitres", "cc"),
    "L": ("l", "liter", "litre", "liters", "litres"),
}

_UNIT_LOOKUP: dict[str, str] = {
    alias: canonical
    for canonical, aliases in UNIT_ALIASES.items()
    for alias in aliases
}

# Mass units, expressed in grams.
_MASS_FACTOR_G: dict[str, Decimal] = {
    "g": Decimal("1"),
    "mg": Decimal("0.001"),
    "kg": Decimal("1000"),
}

# Amount-of-substance units, expressed in mmol.
_MOLE_FACTOR_MMOL: dict[str, Decimal] = {
    "mol": Decimal("1000"),
    "mmol": Decimal("1"),
}

# Volume units, expressed in mL.
_VOLUME_FACTOR_ML: dict[str, Decimal] = {
    "mL": Decimal("1"),
    "L": Decimal("1000"),
}

# The complete set of reasons a row can be un-convertible. Goono maps these
# codes to Korean cell text; the English ``reason`` is the fallback.
REASON_CODES = (
    "invalid_amount",
    "unknown_unit",
    "missing_mol_wt",
    "missing_density",
    "smiles_parse_failed",
    "invalid_purity",
    "no_limiting",
)

_LIMITING_ROLES = ("reactant", "limiting")
_ALL_ROLES = ("reactant", "limiting", "reagent", "solvent", "product")

_THOUSAND = Decimal("1000")
_HUNDRED = Decimal("100")


@dataclass(frozen=True)
class UsageEntry:
    """One reagent-usage line as recorded by LIMS.

    ``key`` is an opaque correlation id (Goono passes the stock-transaction
    id) echoed back on the matching output row so the caller can join without
    relying on ordering.

    ``amount`` + ``unit`` is what was taken from stock. ``equiv`` is only used
    when ``amount`` is absent, in which case the row is derived from the
    limiting reagent instead of measured.
    """

    key: str = ""
    name: str = ""
    role: str = "reactant"
    mol_wt: Optional[float] = None
    smiles: str = ""
    amount: Optional[float] = None
    unit: str = ""
    density: Optional[float] = None      # g/mL
    purity: Optional[float] = None       # fraction (0,1] or percent (1,100]
    equiv: Optional[float] = None
    coeff: float = 1.0                   # stoichiometric coefficient


@dataclass
class UsageRowResult:
    """One computed row. Full precision — round at the presentation layer.

    ``ok`` is False exactly when ``mmol`` could not be established, and then
    ``reason_code``/``reason`` always explain why. Partial values that *are*
    known (a volume with no density, a mass with no MW) are still populated,
    because the UI should show what it has.
    """

    key: str = ""
    name: str = ""
    role: str = "reactant"
    ok: bool = False
    reason_code: Optional[str] = None
    reason: Optional[str] = None
    is_limiting: bool = False
    mol_wt: Optional[float] = None
    mol_wt_source: str = ""              # 'given' | 'smiles' | ''
    unit: str = ""                       # canonical unit, '' if unrecognized
    amount: Optional[float] = None
    mass_g: Optional[float] = None       # as recorded, before purity
    effective_mass_g: Optional[float] = None   # purity-corrected
    volume_ml: Optional[float] = None
    density: Optional[float] = None
    purity: Optional[float] = None       # normalized to a fraction
    coeff: float = 1.0
    mmol: Optional[float] = None
    equiv: Optional[float] = None
    # product-only
    theoretical_mmol: Optional[float] = None
    theoretical_mass_g: Optional[float] = None
    yield_pct: Optional[float] = None


@dataclass
class UsageResult:
    """The computed table plus its reaction-level conclusions."""

    rows: list[UsageRowResult] = field(default_factory=list)
    limiting_key: Optional[str] = None
    limiting_name: Optional[str] = None
    limiting_mmol: Optional[float] = None
    product_key: Optional[str] = None
    theoretical_mmol: Optional[float] = None
    theoretical_mass_g: Optional[float] = None
    yield_pct: Optional[float] = None
    warnings: list[str] = field(default_factory=list)
    n_rdkit_failures: int = 0


def normalize_unit(unit: Optional[str]) -> Optional[str]:
    """Map a raw unit string to its canonical form, or ``None`` if unknown.

    Case- and whitespace-insensitive. Returning ``None`` rather than guessing
    is deliberate: an unrecognized unit must surface as a stated reason.
    """
    if not unit:
        return None
    return _UNIT_LOOKUP.get(str(unit).strip().lower())


def _to_decimal(value: Optional[float]) -> Optional[Decimal]:
    """Convert a boundary float to Decimal via ``repr`` (no binary noise)."""
    if value is None:
        return None
    try:
        return Decimal(repr(float(value)))
    except (InvalidOperation, ValueError, TypeError):
        return None


def _to_float(value: Optional[Decimal]) -> Optional[float]:
    return None if value is None else float(value)


def _mol_wt_from_smiles(smiles: str) -> tuple[Optional[float], Optional[str]]:
    """Average molecular weight for a SMILES, or ``(None, reason)``.

    RDKit is imported lazily so that the arithmetic in this module stays
    importable (and unit-testable) without a chemistry toolkit present.
    """
    from .parsing import parse_structure
    from .properties import compute_properties

    parsed = parse_structure(smiles)
    if not parsed.ok:
        return None, parsed.error or "RDKit could not parse the structure"
    try:
        return compute_properties(parsed.mol).mol_weight, None
    except Exception as exc:                       # pragma: no cover - defensive
        return None, f"RDKit failed to compute a molecular weight: {exc}"


def _normalize_purity(raw: Optional[float]) -> tuple[Optional[Decimal], bool]:
    """Normalize purity to a fraction. Returns ``(fraction, is_valid)``.

    Accepts a fraction in ``(0, 1]`` or a percentage in ``(1, 100]``; the two
    ranges do not overlap, so 0.95 and 95 both mean 95 %. Anything else is
    invalid — including 0, which would silently annihilate the row.
    """
    if raw is None:
        return Decimal("1"), True
    value = _to_decimal(raw)
    if value is None or value <= 0 or value > _HUNDRED:
        return None, False
    if value > 1:
        value = value / _HUNDRED
    return value, True


def _fail(row: UsageRowResult, code: str, reason: str) -> UsageRowResult:
    """Mark a row un-convertible, keeping whatever partial values it has."""
    row.ok = False
    row.reason_code = code
    row.reason = reason
    row.mmol = None
    row.equiv = None
    return row


def _resolve_mol_wt(
    entry: UsageEntry,
    row: UsageRowResult,
    resolver: Callable[[str], tuple[Optional[float], Optional[str]]],
) -> tuple[Optional[Decimal], Optional[str], Optional[str]]:
    """Establish the row's molecular weight.

    An explicit ``mol_wt`` wins; otherwise SMILES is handed to RDKit. Returns
    ``(mol_wt, reason_code, reason)`` — a non-None reason_code means the MW is
    unavailable and the caller must fail the row with it.
    """
    explicit = _to_decimal(entry.mol_wt)
    if explicit is not None and explicit > 0:
        row.mol_wt = float(explicit)
        row.mol_wt_source = "given"
        return explicit, None, None

    if entry.smiles and entry.smiles.strip():
        derived, error = resolver(entry.smiles)
        if derived is None:
            logger.warning(
                "stoich_usage: RDKit returned None for row %r (smiles=%r): %s",
                entry.key or entry.name, entry.smiles, error,
            )
            return None, "smiles_parse_failed", (
                f"SMILES could not be parsed by RDKit: {error}"
            )
        row.mol_wt = derived
        row.mol_wt_source = "smiles"
        return _to_decimal(derived), None, None

    return None, "missing_mol_wt", (
        "no molecular weight on file and no structure to derive one from"
    )


def _measure_row(
    entry: UsageEntry,
    row: UsageRowResult,
    resolver: Callable[[str], tuple[Optional[float], Optional[str]]],
) -> tuple[UsageRowResult, Optional[Decimal], int]:
    """Convert one measured row to mmol.

    Returns ``(row, mmol_or_None, rdkit_failure_count)``. Never raises: every
    failure path goes through :func:`_fail` with a stated reason.
    """
    rdkit_failures = 0

    unit = normalize_unit(entry.unit)
    row.unit = unit or ""

    purity, purity_ok = _normalize_purity(entry.purity)
    if not purity_ok:
        return _fail(
            row, "invalid_purity",
            f"purity {entry.purity!r} is not a fraction in (0,1] "
            "or a percentage in (1,100]",
        ), None, rdkit_failures
    row.purity = _to_float(purity)

    amount = _to_decimal(entry.amount)
    if amount is None or amount <= 0:
        return _fail(
            row, "invalid_amount",
            f"amount {entry.amount!r} is missing or not positive",
        ), None, rdkit_failures

    if unit is None:
        return _fail(
            row, "unknown_unit",
            f"unit {entry.unit!r} is not a recognized mass, mole or volume unit",
        ), None, rdkit_failures

    density = _to_decimal(entry.density)
    if density is not None and density > 0:
        row.density = float(density)
    else:
        density = None

    # --- volume: mL/L need a density to reach a mass -----------------------
    if unit in _VOLUME_FACTOR_ML:
        volume_ml = amount * _VOLUME_FACTOR_ML[unit]
        row.volume_ml = float(volume_ml)
        if density is None:
            return _fail(
                row, "missing_density",
                f"{entry.unit} is a volume; converting it to a mass requires a "
                "density, which is not on file for this reagent",
            ), None, rdkit_failures
        mass_g = volume_ml * density
        row.mass_g = float(mass_g)

    # --- mass --------------------------------------------------------------
    elif unit in _MASS_FACTOR_G:
        mass_g = amount * _MASS_FACTOR_G[unit]
        row.mass_g = float(mass_g)
        if density is not None:
            row.volume_ml = float(mass_g / density)

    # --- amount of substance: mmol needs no molecular weight ----------------
    else:
        mmol = amount * _MOLE_FACTOR_MMOL[unit] * purity
        mol_wt, code, reason = _resolve_mol_wt(entry, row, resolver)
        if code == "smiles_parse_failed":
            rdkit_failures += 1
        if mol_wt is not None:
            mass = mmol / _THOUSAND * mol_wt
            row.effective_mass_g = float(mass)
            row.mass_g = float(mass / purity)
            if density is not None:
                row.volume_ml = float(row.mass_g / density)
        row.ok = True
        row.mmol = float(mmol)
        return row, mmol, rdkit_failures

    # mass established (from mass units or volume x density) -> need MW
    mol_wt, code, reason = _resolve_mol_wt(entry, row, resolver)
    if code is not None:
        if code == "smiles_parse_failed":
            rdkit_failures += 1
        return _fail(row, code, reason or code), None, rdkit_failures

    effective = mass_g * purity
    row.effective_mass_g = float(effective)
    mmol = effective / mol_wt * _THOUSAND
    row.ok = True
    row.mmol = float(mmol)
    return row, mmol, rdkit_failures


def compute_usage_stoichiometry(
    entries: list[UsageEntry],
    mol_wt_resolver: Optional[
        Callable[[str], tuple[Optional[float], Optional[str]]]
    ] = None,
) -> UsageResult:
    """Compute the reagent-usage stoichiometry table.

    Never raises. Rows that cannot be converted are returned with ``ok=False``
    and a stated reason; every other row still computes.

    The limiting reagent is the convertible reactant with the smallest
    ``mmol / coeff`` ratio. Rows explicitly given ``role='limiting'`` override
    that search; if several are so marked the smallest ratio among them wins
    and a warning is recorded. Solvents, auxiliary reagents and products are
    never eligible.

    ``mol_wt_resolver`` is injectable for testing; it defaults to RDKit.
    """
    resolver = mol_wt_resolver or _mol_wt_from_smiles
    result = UsageResult()

    if not entries:
        return result

    # ---- pass 1: measured rows -------------------------------------------
    measured: dict[int, Decimal] = {}     # index -> mmol
    deferred: list[int] = []              # equiv-driven rows, resolved in pass 3

    for idx, entry in enumerate(entries):
        role = (entry.role or "reactant").strip().lower()
        if role not in _ALL_ROLES:
            result.warnings.append(
                f"row '{entry.key or entry.name}': unknown role {entry.role!r}, "
                "treated as 'reagent'"
            )
            role = "reagent"

        row = UsageRowResult(
            key=entry.key, name=entry.name, role=role,
            amount=entry.amount, coeff=entry.coeff or 1.0,
        )
        result.rows.append(row)

        # equiv-driven: no amount recorded, derive from the limiting reagent
        if entry.amount is None and entry.equiv is not None:
            deferred.append(idx)
            continue

        row, mmol, n_fail = _measure_row(entry, row, resolver)
        result.n_rdkit_failures += n_fail
        if mmol is not None:
            measured[idx] = mmol

    # ---- pass 2: limiting reagent ----------------------------------------
    def _ratio(idx: int) -> Decimal:
        coeff = _to_decimal(entries[idx].coeff) or Decimal("1")
        if coeff <= 0:
            coeff = Decimal("1")
        return measured[idx] / coeff

    explicit = [
        i for i in measured
        if (entries[i].role or "").strip().lower() == "limiting"
    ]
    if len(explicit) > 1:
        result.warnings.append(
            f"{len(explicit)} rows are explicitly marked limiting "
            f"({', '.join(entries[i].key or entries[i].name for i in explicit)}); "
            "using the one with the smallest mmol/coeff ratio"
        )

    candidates = explicit or [
        i for i in measured
        if (entries[i].role or "reactant").strip().lower() in _LIMITING_ROLES
    ]

    limiting_mmol: Optional[Decimal] = None
    if candidates:
        best = min(candidates, key=_ratio)
        limiting_mmol = measured[best]
        result.rows[best].is_limiting = True
        result.limiting_key = entries[best].key
        result.limiting_name = entries[best].name
        result.limiting_mmol = float(limiting_mmol)
        limiting_coeff = _to_decimal(entries[best].coeff) or Decimal("1")
        if limiting_coeff <= 0:
            limiting_coeff = Decimal("1")
    else:
        limiting_coeff = Decimal("1")
        result.warnings.append(
            "no convertible reactant found, so no limiting reagent could be "
            "determined; equivalents and yield are unavailable"
        )

    # ---- pass 3: equiv-driven rows ---------------------------------------
    for idx in deferred:
        entry = entries[idx]
        row = result.rows[idx]
        if limiting_mmol is None:
            _fail(
                row, "no_limiting",
                "this row is defined by equivalents, but no limiting reagent "
                "could be determined",
            )
            continue
        equiv = _to_decimal(entry.equiv)
        if equiv is None or equiv <= 0:
            _fail(
                row, "invalid_amount",
                f"equivalents {entry.equiv!r} is not positive",
            )
            continue
        mmol = limiting_mmol * equiv
        row.ok = True
        row.mmol = float(mmol)
        measured[idx] = mmol

        mol_wt, code, reason = _resolve_mol_wt(entry, row, resolver)
        if code == "smiles_parse_failed":
            result.n_rdkit_failures += 1
        if mol_wt is not None:
            purity, purity_ok = _normalize_purity(entry.purity)
            if purity_ok:
                row.purity = _to_float(purity)
                effective = mmol / _THOUSAND * mol_wt
                row.effective_mass_g = float(effective)
                row.mass_g = float(effective / purity)
                density = _to_decimal(entry.density)
                if density is not None and density > 0:
                    row.density = float(density)
                    row.volume_ml = float(row.mass_g / density)

    # ---- pass 4: equivalents ---------------------------------------------
    if limiting_mmol is not None and limiting_mmol > 0:
        for idx, mmol in measured.items():
            result.rows[idx].equiv = float(mmol / limiting_mmol)

    # ---- pass 5: theoretical yield ---------------------------------------
    products = [
        i for i, e in enumerate(entries)
        if (e.role or "").strip().lower() == "product"
    ]
    if products and limiting_mmol is not None:
        pidx = products[0]
        if len(products) > 1:
            result.warnings.append(
                f"{len(products)} product rows found; yield is reported for the "
                f"first ('{entries[pidx].key or entries[pidx].name}')"
            )
        prow = result.rows[pidx]
        pcoeff = _to_decimal(entries[pidx].coeff) or Decimal("1")
        if pcoeff <= 0:
            pcoeff = Decimal("1")

        # The theoretical mass depends only on the product's molecular weight,
        # not on whether an actual yield was weighed. A product row with no
        # recorded amount fails as 'invalid_amount' before its MW is resolved,
        # so resolve it here — otherwise recording no yield would also hide the
        # target mass, which is the number the chemist most wants to see.
        if prow.mol_wt is None and prow.reason_code != "smiles_parse_failed":
            _, code, _reason = _resolve_mol_wt(entries[pidx], prow, resolver)
            if code == "smiles_parse_failed":
                result.n_rdkit_failures += 1

        theo_mmol = limiting_mmol * (pcoeff / limiting_coeff)
        result.product_key = entries[pidx].key
        result.theoretical_mmol = float(theo_mmol)
        prow.theoretical_mmol = float(theo_mmol)

        pmol_wt = _to_decimal(prow.mol_wt)
        if pmol_wt is not None and pmol_wt > 0:
            theo_mass = theo_mmol / _THOUSAND * pmol_wt
            result.theoretical_mass_g = float(theo_mass)
            prow.theoretical_mass_g = float(theo_mass)

        actual = measured.get(pidx)
        if actual is not None and theo_mmol > 0:
            yield_pct = actual / theo_mmol * _HUNDRED
            result.yield_pct = float(yield_pct)
            prow.yield_pct = float(yield_pct)

    return result
