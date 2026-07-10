"""Pure stoichiometry calculations for reaction tables (SPEC §3.2).

This module is deliberately RDKit-free: every function here is pure
arithmetic over floats, fully unit-testable without a chemistry toolkit.

Contract (SPEC §3.2)::

    mmol      = mass_g / FW * 1000
    eq        = mmol / limiting_mmol
    volume_ml = mass_g / density        (density given)
    mmol      = volume_ml * molarity    (solution given)
    theo_mol  = limiting_mmol * (product_coeff / limiting_coeff)
    theo_mass = theo_mol * product_FW / 1000
    yield_pct = actual_mol / theo_mol * 100
    reaction_molarity = limiting_mmol / total_solvent_volume_ml

Direction insight
-----------------
Every row has a DIRECTION: exactly one quantity is the *input* (``given`` is
one of ``'mass'``, ``'eq'``, ``'volume'``) and everything else is *derived*.
The validated synthesis-note case only reproduces to the printed digit if
acetic anhydride is eq-DRIVEN:

    eq = 1.000 (input)
    mmol = limiting_mmol * eq          = 4.5408
    mass = 4.5408 * 102.089 / 1000     = 0.46356  -> printed 0.464
    vol  = 0.46356 / 1.082             = 0.42845  -> printed 0.428

If you instead treat the printed mass 0.464 g as the input, eq computes to
1.001 (4.54505 / 4.54083 = 1.00093). That is NOT a bug: the note's mass is
itself a display-rounded output, and feeding a rounded output back in as an
input echoes the rounding into eq. Preserve each row's direction and never
round-trip through displayed values.

No rounding happens inside :func:`compute_stoichiometry`; use
:func:`round_display` at the presentation layer only.

``purity`` is carried through untouched — the SPEC formulas do not apply it.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from decimal import ROUND_HALF_UP, Decimal
from typing import Optional

__all__ = ["StoichRow", "StoichRowResult", "StoichResult",
           "compute_stoichiometry", "round_display"]

_GIVEN_CHOICES = ("mass", "eq", "volume")


@dataclass
class StoichRow:
    """One input row of the reaction table.

    ``given`` names the row's driving quantity ('mass' | 'eq' | 'volume');
    the corresponding field must be set and all other quantities are derived.
    Product rows ignore ``given`` — they are driven by the limiting reactant
    (theoretical) and optionally ``actual_mass_g`` (actual).
    Solvent rows only need ``volume_ml``.
    """

    role: str                                # 'reactant' | 'product' | 'solvent'
    name: str
    formula: str = ""
    fw: Optional[float] = None               # g/mol
    is_limiting: bool = False
    given: Optional[str] = None              # 'mass' | 'eq' | 'volume'
    mass_g: Optional[float] = None
    eq: Optional[float] = None
    volume_ml: Optional[float] = None
    density: Optional[float] = None          # g/ml
    molarity: Optional[float] = None         # mol/l (solution rows)
    coeff: float = 1.0                       # stoichiometric coefficient
    actual_mass_g: Optional[float] = None    # products only
    purity: Optional[float] = None


@dataclass
class StoichRowResult:
    """One computed output row. All values full precision (no rounding)."""

    role: str
    name: str
    formula: str = ""
    fw: Optional[float] = None
    is_limiting: bool = False
    coeff: float = 1.0
    mmol: Optional[float] = None
    eq: Optional[float] = None
    mass_g: Optional[float] = None
    volume_ml: Optional[float] = None
    density: Optional[float] = None
    molarity: Optional[float] = None
    # product-only
    theo_mol_mmol: Optional[float] = None
    theo_mass_g: Optional[float] = None
    actual_mass_g: Optional[float] = None
    actual_mol_mmol: Optional[float] = None
    yield_pct: Optional[float] = None
    purity: Optional[float] = None


@dataclass
class StoichResult:
    """Computed table: per-row results plus reaction-level values."""

    rows: list[StoichRowResult] = field(default_factory=list)
    reaction: dict = field(default_factory=dict)  # {'molarity', 'temperature_c'}


def round_display(value: Optional[float], ndigits: int) -> Optional[float]:
    """Round for DISPLAY only, half away from zero (0.4635 -> 0.464 at 3dp).

    Never call this inside a computation chain — rounding intermediates is
    exactly the mistake documented in the module docstring. ``None`` passes
    through unchanged.
    """
    if value is None:
        return None
    quantum = Decimal(1).scaleb(-ndigits)
    return float(Decimal(repr(value)).quantize(quantum, rounding=ROUND_HALF_UP))


def _require_fw(row: StoichRow) -> float:
    if row.fw is None or row.fw <= 0:
        raise ValueError(
            f"row '{row.name}': fw must be a positive number, got {row.fw!r}"
        )
    return row.fw


def _row_mmol_from_given(row: StoichRow) -> float:
    """mmol for a self-contained (mass- or volume-driven) reactant row."""
    fw = _require_fw(row)
    if row.given == "mass":
        if row.mass_g is None:
            raise ValueError(f"row '{row.name}': given='mass' but mass_g is None")
        return row.mass_g / fw * 1000.0
    if row.given == "volume":
        if row.volume_ml is None:
            raise ValueError(
                f"row '{row.name}': given='volume' but volume_ml is None"
            )
        if row.molarity is not None:
            return row.volume_ml * row.molarity          # solution
        if row.density is not None:
            return (row.volume_ml * row.density) / fw * 1000.0  # neat liquid
        raise ValueError(
            f"row '{row.name}': given='volume' needs density or molarity"
        )
    raise ValueError(
        f"row '{row.name}': unknown given {row.given!r}; "
        f"expected one of {_GIVEN_CHOICES}"
    )


def _compute_reactant(row: StoichRow, limiting_mmol: float) -> StoichRowResult:
    fw = _require_fw(row)
    if row.given == "eq":
        if row.eq is None:
            raise ValueError(f"row '{row.name}': given='eq' but eq is None")
        eq = row.eq
        mmol = limiting_mmol * eq
        mass_g = mmol * fw / 1000.0
    else:
        mmol = _row_mmol_from_given(row)  # validates given / raises
        eq = mmol / limiting_mmol
        mass_g = row.mass_g if row.given == "mass" else mmol * fw / 1000.0

    if row.given == "volume":
        volume_ml = row.volume_ml
    elif row.density is not None:
        volume_ml = mass_g / row.density
    else:
        volume_ml = None

    return StoichRowResult(
        role=row.role, name=row.name, formula=row.formula, fw=fw,
        is_limiting=row.is_limiting, coeff=row.coeff,
        mmol=mmol, eq=eq, mass_g=mass_g, volume_ml=volume_ml,
        density=row.density, molarity=row.molarity, purity=row.purity,
    )


def _compute_product(
    row: StoichRow, limiting_mmol: float, limiting_coeff: float
) -> StoichRowResult:
    fw = _require_fw(row)
    theo_mol = limiting_mmol * (row.coeff / limiting_coeff)   # mmol
    theo_mass = theo_mol * fw / 1000.0                        # g

    actual_mol = None
    yield_pct = None
    if row.actual_mass_g is not None:
        actual_mol = row.actual_mass_g / fw * 1000.0          # mmol
        yield_pct = actual_mol / theo_mol * 100.0

    return StoichRowResult(
        role=row.role, name=row.name, formula=row.formula, fw=fw,
        is_limiting=False, coeff=row.coeff,
        mmol=theo_mol, eq=theo_mol / limiting_mmol,
        mass_g=theo_mass, volume_ml=None,
        theo_mol_mmol=theo_mol, theo_mass_g=theo_mass,
        actual_mass_g=row.actual_mass_g, actual_mol_mmol=actual_mol,
        yield_pct=yield_pct, purity=row.purity,
    )


def _compute_solvent(row: StoichRow) -> StoichRowResult:
    if row.volume_ml is None or row.volume_ml <= 0:
        raise ValueError(
            f"row '{row.name}': solvent requires a positive volume_ml"
        )
    return StoichRowResult(
        role=row.role, name=row.name, formula=row.formula, fw=row.fw,
        is_limiting=False, coeff=row.coeff,
        volume_ml=row.volume_ml, density=row.density, purity=row.purity,
    )


def compute_stoichiometry(
    rows: list[StoichRow], temperature_c: Optional[float] = None
) -> StoichResult:
    """Compute the full reaction table from input rows.

    Requires exactly one reactant with ``is_limiting=True``, and that row
    must be self-contained (mass- or volume-driven — an eq-driven limiting
    row is circular). Raises ``ValueError`` on any contract violation.
    Output values are full precision; round with :func:`round_display`.
    """
    limiting_rows = [r for r in rows if r.is_limiting]
    if len(limiting_rows) != 1:
        raise ValueError(
            f"exactly one limiting reactant required, found {len(limiting_rows)}"
        )
    limiting = limiting_rows[0]
    if limiting.role != "reactant":
        raise ValueError(
            f"limiting row '{limiting.name}' must be a reactant, "
            f"got role={limiting.role!r}"
        )
    if limiting.given == "eq":
        raise ValueError(
            f"limiting row '{limiting.name}' cannot be eq-driven "
            "(eq is defined relative to the limiting reactant)"
        )

    limiting_mmol = _row_mmol_from_given(limiting)
    if limiting_mmol <= 0:
        raise ValueError(
            f"limiting row '{limiting.name}' must have positive mmol, "
            f"got {limiting_mmol}"
        )
    limiting_coeff = limiting.coeff if limiting.coeff else 1.0

    out_rows: list[StoichRowResult] = []
    total_solvent_ml = 0.0
    for row in rows:
        if row.role == "reactant":
            out_rows.append(_compute_reactant(row, limiting_mmol))
        elif row.role == "product":
            out_rows.append(_compute_product(row, limiting_mmol, limiting_coeff))
        elif row.role == "solvent":
            solvent = _compute_solvent(row)
            total_solvent_ml += solvent.volume_ml
            out_rows.append(solvent)
        else:
            raise ValueError(f"row '{row.name}': unknown role {row.role!r}")

    molarity = limiting_mmol / total_solvent_ml if total_solvent_ml > 0 else None
    return StoichResult(
        rows=out_rows,
        reaction={"molarity": molarity, "temperature_c": temperature_c},
    )
