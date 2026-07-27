"""Tests for the LIMS reagent-usage stoichiometry (app/chem/stoich_usage.py).

Written before the implementation, per CLAUDE.md ("TDD. 화학 계산 로직은 특히.").

This module is a *different contract* from ``chem/stoich.py``:

``chem/stoich.py``      synthesis-note table. Strict: raises on any contract
                        violation, requires ``fw`` and exactly one explicit
                        limiting row. All-or-nothing.
``chem/stoich_usage.py`` LIMS reagent-usage table. Tolerant: a row that cannot
                        be converted comes back with ``ok=False`` and a stated
                        reason, and the rest of the table still computes — the
                        Goono UI must never render a blank or a bare zero.
"""

from __future__ import annotations

import pytest

from app.chem.stoich_usage import (
    UsageEntry,
    compute_usage_stoichiometry,
    normalize_unit,
)


def _row(result, key):
    """Fetch one output row by its correlation key."""
    matches = [r for r in result.rows if r.key == key]
    assert matches, f"no row with key {key!r} in {[r.key for r in result.rows]}"
    return matches[0]


# --------------------------------------------------------------------------
# unit normalization / conversion
# --------------------------------------------------------------------------

class TestUnitNormalization:
    @pytest.mark.parametrize(
        "raw,canonical",
        [
            ("g", "g"), ("G", "g"), (" g ", "g"), ("gram", "g"), ("GRAM", "g"),
            ("mg", "mg"), ("MG", "mg"), ("milligram", "mg"),
            ("kg", "kg"), ("KG", "kg"), ("kilogram", "kg"),
            ("mol", "mol"), ("MOL", "mol"), ("mole", "mol"),
            ("mmol", "mmol"), ("MMOL", "mmol"), ("millimole", "mmol"),
            ("ml", "mL"), ("mL", "mL"), ("ML", "mL"), ("milliliter", "mL"),
            ("l", "L"), ("L", "L"), ("liter", "L"), ("litre", "L"),
        ],
    )
    def test_known_units_normalize(self, raw, canonical):
        assert normalize_unit(raw) == canonical

    @pytest.mark.parametrize("raw", ["", None, "ea", "drops", "봉", "x"])
    def test_unknown_units_return_none(self, raw):
        assert normalize_unit(raw) is None


class TestMassConversion:
    """Mass units convert without needing density."""

    @pytest.mark.parametrize(
        "amount,unit,expected_g",
        [
            (1.0, "g", 1.0),
            (2500.0, "mg", 2.5),
            (0.25, "kg", 250.0),
        ],
    )
    def test_mass_to_grams(self, amount, unit, expected_g):
        e = UsageEntry(key="a", name="X", mol_wt=100.0, amount=amount, unit=unit)
        result = compute_usage_stoichiometry([e])
        row = _row(result, "a")
        assert row.ok
        assert row.mass_g == pytest.approx(expected_g)
        # 100 g/mol -> mmol = mass_g * 10
        assert row.mmol == pytest.approx(expected_g * 10.0)

    def test_mole_units_do_not_need_mol_wt_for_mmol(self):
        """mol/mmol are already amount-of-substance: mmol needs no MW."""
        e = UsageEntry(key="a", name="X", amount=5.0, unit="mmol")
        result = compute_usage_stoichiometry([e])
        row = _row(result, "a")
        assert row.ok
        assert row.mmol == pytest.approx(5.0)
        # ...but mass cannot be derived without MW, and that is stated, not zeroed.
        assert row.mass_g is None

    def test_mol_converts_to_mmol(self):
        e = UsageEntry(key="a", name="X", mol_wt=50.0, amount=0.25, unit="mol")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok
        assert row.mmol == pytest.approx(250.0)
        assert row.mass_g == pytest.approx(12.5)


class TestVolumeConversion:
    def test_volume_with_density(self):
        # 10 mL * 0.789 g/mL = 7.89 g; / 46.07 g/mol * 1000 = 171.26 mmol
        e = UsageEntry(
            key="a", name="EtOH", mol_wt=46.07,
            amount=10.0, unit="mL", density=0.789,
        )
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok
        assert row.mass_g == pytest.approx(7.89)
        assert row.mmol == pytest.approx(7.89 / 46.07 * 1000)
        assert row.volume_ml == pytest.approx(10.0)

    def test_litre_with_density(self):
        e = UsageEntry(
            key="a", name="EtOH", mol_wt=46.07,
            amount=0.5, unit="L", density=0.789,
        )
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok
        assert row.volume_ml == pytest.approx(500.0)
        assert row.mass_g == pytest.approx(394.5)

    def test_volume_without_density_is_unconvertible_with_reason(self):
        """The rule: state the reason, never guess a density and never zero."""
        e = UsageEntry(key="a", name="DMF", mol_wt=73.09, amount=10.0, unit="mL")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "missing_density"
        assert row.mass_g is None
        assert row.mmol is None
        assert row.reason and "density" in row.reason.lower()
        # the volume itself is still known and must be shown
        assert row.volume_ml == pytest.approx(10.0)


class TestUnconvertibleReasons:
    def test_missing_mol_wt(self):
        e = UsageEntry(key="a", name="Unknown", amount=1.0, unit="g")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "missing_mol_wt"
        assert row.mmol is None
        assert row.mass_g == pytest.approx(1.0)  # mass is still known

    def test_unknown_unit(self):
        e = UsageEntry(key="a", name="X", mol_wt=100.0, amount=3.0, unit="ea")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "unknown_unit"
        assert row.reason and "ea" in row.reason

    @pytest.mark.parametrize("amount", [None, 0.0, -1.0])
    def test_missing_or_nonpositive_amount(self, amount):
        e = UsageEntry(key="a", name="X", mol_wt=100.0, amount=amount, unit="g")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "invalid_amount"

    def test_nonpositive_mol_wt_is_rejected(self):
        e = UsageEntry(key="a", name="X", mol_wt=0.0, amount=1.0, unit="g")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "missing_mol_wt"

    def test_every_unconvertible_row_states_a_reason(self):
        """No row may come back not-ok with an empty reason."""
        entries = [
            UsageEntry(key="a", name="A", amount=1.0, unit="g"),
            UsageEntry(key="b", name="B", mol_wt=100.0, amount=1.0, unit="mL"),
            UsageEntry(key="c", name="C", mol_wt=100.0, amount=1.0, unit="ea"),
            UsageEntry(key="d", name="D", mol_wt=100.0, unit="g"),
            UsageEntry(key="e", name="E", mol_wt=100.0, amount=1.0,
                       unit="g", smiles="not-a-molecule"),
        ]
        result = compute_usage_stoichiometry(entries)
        for row in result.rows:
            if not row.ok:
                assert row.reason_code, f"{row.key} has no reason_code"
                assert row.reason, f"{row.key} has no reason text"


# --------------------------------------------------------------------------
# MW derivation from SMILES (RDKit)
# --------------------------------------------------------------------------

class TestMolWtFromSmiles:
    def test_mol_wt_derived_from_smiles(self):
        # benzoic acid, C7H6O2 = 122.12
        e = UsageEntry(
            key="a", name="benzoic acid", smiles="OC(=O)c1ccccc1",
            amount=1.2212, unit="g",
        )
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok
        assert row.mol_wt == pytest.approx(122.12, abs=0.01)
        assert row.mol_wt_source == "smiles"
        assert row.mmol == pytest.approx(10.0, abs=0.01)

    def test_explicit_mol_wt_wins_over_smiles(self):
        e = UsageEntry(
            key="a", name="X", mol_wt=200.0, smiles="OC(=O)c1ccccc1",
            amount=1.0, unit="g",
        )
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.mol_wt == pytest.approx(200.0)
        assert row.mol_wt_source == "given"

    def test_rdkit_parse_failure_is_reported_not_swallowed(self):
        """CLAUDE.md: an RDKit ``None`` is never silently swallowed."""
        e = UsageEntry(
            key="a", name="junk", smiles="this-is-not-smiles",
            amount=1.0, unit="g",
        )
        result = compute_usage_stoichiometry([e])
        row = _row(result, "a")
        assert row.ok is False
        assert row.reason_code == "smiles_parse_failed"
        assert row.reason  # carries the RDKit reason
        assert row.mmol is None
        assert row.mol_wt is None

    def test_rdkit_parse_failures_are_counted(self):
        entries = [
            UsageEntry(key="a", smiles="bad~one", amount=1.0, unit="g"),
            UsageEntry(key="b", smiles="C(C", amount=1.0, unit="g"),
            UsageEntry(key="c", smiles="CCO", amount=1.0, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.n_rdkit_failures == 2

    def test_bad_valence_smiles_is_a_parse_failure(self):
        e = UsageEntry(key="a", smiles="C(C)(C)(C)(C)C", amount=1.0, unit="g")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "smiles_parse_failed"


# --------------------------------------------------------------------------
# limiting reagent selection
# --------------------------------------------------------------------------

class TestLimitingReagentSelection:
    def test_auto_picks_smallest_mmol(self):
        entries = [
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0, unit="g"),   # 10 mmol
            UsageEntry(key="b", name="B", mol_wt=100.0, amount=0.5, unit="g"),   # 5 mmol
            UsageEntry(key="c", name="C", mol_wt=100.0, amount=2.0, unit="g"),   # 20 mmol
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "b"
        assert result.limiting_mmol == pytest.approx(5.0)
        assert _row(result, "b").is_limiting is True
        assert _row(result, "a").is_limiting is False

    def test_auto_uses_mmol_over_coefficient(self):
        """2 equivalents consumed per turnover -> ratio is mmol/coeff."""
        entries = [
            # 10 mmol but coeff 2 -> ratio 5
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0,
                       unit="g", coeff=2.0),
            # 6 mmol, coeff 1 -> ratio 6
            UsageEntry(key="b", name="B", mol_wt=100.0, amount=0.6, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "a"

    def test_explicit_limiting_role_is_honored_over_auto(self):
        entries = [
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0,
                       unit="g", role="limiting"),           # 10 mmol
            UsageEntry(key="b", name="B", mol_wt=100.0, amount=0.5, unit="g"),  # 5 mmol
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "a"          # not "b", despite being larger
        assert result.limiting_mmol == pytest.approx(10.0)
        assert _row(result, "b").equiv == pytest.approx(0.5)

    def test_reagent_and_solvent_roles_never_become_limiting(self):
        entries = [
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0, unit="g"),
            # far fewer mmol, but it is an auxiliary reagent, not a reactant
            UsageEntry(key="b", name="cat", mol_wt=100.0, amount=0.01,
                       unit="g", role="reagent"),
            UsageEntry(key="c", name="THF", mol_wt=72.11, amount=0.001,
                       unit="g", role="solvent"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "a"

    def test_products_never_become_limiting(self):
        entries = [
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="p", name="P", mol_wt=100.0, amount=0.1,
                       unit="g", role="product"),
        ]
        assert compute_usage_stoichiometry(entries).limiting_key == "a"

    def test_unconvertible_rows_are_skipped_for_limiting(self):
        entries = [
            # would be smallest, but has no usable MW
            UsageEntry(key="bad", name="?", amount=0.001, unit="g"),
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "a"

    def test_no_convertible_reactant_yields_no_limiting(self):
        entries = [UsageEntry(key="a", name="?", amount=1.0, unit="g")]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key is None
        assert result.limiting_mmol is None
        assert _row(result, "a").equiv is None
        assert result.warnings

    def test_multiple_explicit_limiting_warns_and_picks_smallest_ratio(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g", role="limiting"),
            UsageEntry(key="b", mol_wt=100.0, amount=0.5, unit="g", role="limiting"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.limiting_key == "b"
        assert any("limiting" in w.lower() for w in result.warnings)

    def test_limiting_row_has_equiv_exactly_one(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="b", mol_wt=100.0, amount=3.0, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert _row(result, "a").equiv == pytest.approx(1.0)
        assert _row(result, "b").equiv == pytest.approx(3.0)


# --------------------------------------------------------------------------
# purity
# --------------------------------------------------------------------------

class TestPurity:
    def test_purity_as_fraction_scales_mmol(self):
        e = UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g", purity=0.95)
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.mass_g == pytest.approx(1.0)           # as weighed
        assert row.effective_mass_g == pytest.approx(0.95)
        assert row.mmol == pytest.approx(9.5)

    def test_purity_as_percent_is_accepted(self):
        e = UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g", purity=95.0)
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.mmol == pytest.approx(9.5)

    def test_purity_absent_means_100_percent(self):
        e = UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.mmol == pytest.approx(10.0)
        assert row.effective_mass_g == pytest.approx(1.0)

    def test_invalid_purity_is_reported(self):
        e = UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g", purity=0.0)
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.ok is False
        assert row.reason_code == "invalid_purity"


# --------------------------------------------------------------------------
# equivalents-driven rows
# --------------------------------------------------------------------------

class TestEquivDrivenRows:
    def test_equiv_without_amount_is_derived_from_limiting(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),   # 10 mmol
            UsageEntry(key="b", mol_wt=50.0, equiv=2.0),               # -> 20 mmol
        ]
        result = compute_usage_stoichiometry(entries)
        row = _row(result, "b")
        assert row.ok
        assert row.mmol == pytest.approx(20.0)
        assert row.mass_g == pytest.approx(1.0)
        assert row.equiv == pytest.approx(2.0)

    def test_equiv_driven_row_cannot_be_limiting(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="b", mol_wt=100.0, equiv=0.1),
        ]
        assert compute_usage_stoichiometry(entries).limiting_key == "a"

    def test_amount_wins_over_equiv_when_both_given(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="b", mol_wt=100.0, amount=3.0, unit="g", equiv=99.0),
        ]
        row = _row(compute_usage_stoichiometry(entries), "b")
        assert row.mmol == pytest.approx(30.0)
        assert row.equiv == pytest.approx(3.0)   # measured, not the 99 hint


# --------------------------------------------------------------------------
# yield
# --------------------------------------------------------------------------

class TestYield:
    def test_theoretical_and_yield(self):
        entries = [
            UsageEntry(key="a", name="A", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="b", name="B", mol_wt=100.0, amount=5.0, unit="g"),
            UsageEntry(key="p", name="P", mol_wt=150.0, amount=1.2,
                       unit="g", role="product"),
        ]
        result = compute_usage_stoichiometry(entries)
        # limiting = a, 10 mmol -> theoretical 10 mmol of P = 1.5 g
        assert result.theoretical_mmol == pytest.approx(10.0)
        assert result.theoretical_mass_g == pytest.approx(1.5)
        # actual 1.2 g / 150 * 1000 = 8 mmol -> 80 %
        assert result.yield_pct == pytest.approx(80.0)
        assert result.product_key == "p"

    def test_yield_respects_product_coefficient(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),   # 10 mmol
            UsageEntry(key="p", mol_wt=50.0, amount=1.0, unit="g",
                       role="product", coeff=2.0),                     # 2 P per A
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.theoretical_mmol == pytest.approx(20.0)
        assert result.theoretical_mass_g == pytest.approx(1.0)
        assert result.yield_pct == pytest.approx(100.0)

    def test_theoretical_without_actual_amount(self):
        """A product with no recorded amount still gets a theoretical value."""
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="p", mol_wt=150.0, role="product"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.theoretical_mmol == pytest.approx(10.0)
        assert result.theoretical_mass_g == pytest.approx(1.5)
        assert result.yield_pct is None

    def test_no_product_means_no_yield(self):
        entries = [UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g")]
        result = compute_usage_stoichiometry(entries)
        assert result.yield_pct is None
        assert result.theoretical_mmol is None
        assert result.product_key is None

    def test_product_without_mol_wt_gives_no_theoretical_mass(self):
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="p", role="product", amount=1.0, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.theoretical_mmol == pytest.approx(10.0)
        assert result.theoretical_mass_g is None
        assert result.yield_pct is None
        assert _row(result, "p").ok is False

    def test_yield_over_100_is_reported_not_clamped(self):
        """An over-100 % yield is a real signal (wet product) — never clamp it."""
        entries = [
            UsageEntry(key="a", mol_wt=100.0, amount=1.0, unit="g"),
            UsageEntry(key="p", mol_wt=100.0, amount=1.1, unit="g", role="product"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert result.yield_pct == pytest.approx(110.0)


# --------------------------------------------------------------------------
# precision
# --------------------------------------------------------------------------

class TestPrecision:
    def test_no_intermediate_rounding(self):
        """1/3 g of a 3 g/mol species must not be rounded on the way through."""
        entries = [
            UsageEntry(key="a", mol_wt=3.0, amount=1.0, unit="g"),
            UsageEntry(key="b", mol_wt=3.0, amount=1.0 / 3.0, unit="g"),
        ]
        result = compute_usage_stoichiometry(entries)
        assert _row(result, "a").equiv == pytest.approx(3.0, rel=1e-12)

    def test_mg_scale_does_not_lose_precision(self):
        e = UsageEntry(key="a", mol_wt=440.587, amount=12.345, unit="mg")
        row = _row(compute_usage_stoichiometry([e]), "a")
        assert row.mass_g == pytest.approx(0.012345, rel=1e-12)
        assert row.mmol == pytest.approx(0.012345 / 440.587 * 1000, rel=1e-9)


# --------------------------------------------------------------------------
# realistic case
# --------------------------------------------------------------------------

class TestAmideCoupling:
    """Benzoic acid + benzylamine, EDC/HOBt/DIPEA in DCM — a real bench recipe."""

    def _entries(self):
        return [
            UsageEntry(key="acid", name="benzoic acid",
                       smiles="OC(=O)c1ccccc1", amount=610.6, unit="mg"),
            UsageEntry(key="amine", name="benzylamine",
                       smiles="NCc1ccccc1", amount=590.0, unit="mg"),
            UsageEntry(key="edc", name="EDC-HCl", mol_wt=191.70,
                       amount=1.150, unit="g", role="reagent"),
            UsageEntry(key="hobt", name="HOBt", mol_wt=135.12,
                       amount=675.0, unit="mg", role="reagent"),
            UsageEntry(key="dipea", name="DIPEA", mol_wt=129.24,
                       amount=1.74, unit="mL", density=0.742, role="reagent"),
            UsageEntry(key="dcm", name="DCM", amount=25.0,
                       unit="mL", role="solvent"),
            UsageEntry(key="prod", name="N-benzylbenzamide",
                       smiles="O=C(NCc1ccccc1)c1ccccc1",
                       amount=887.0, unit="mg", role="product"),
        ]

    def test_limiting_is_benzoic_acid(self):
        result = compute_usage_stoichiometry(self._entries())
        # acid 610.6 mg / 122.12 = 5.000 mmol; amine 590 / 107.15 = 5.506 mmol
        assert result.limiting_key == "acid"
        assert result.limiting_mmol == pytest.approx(5.0, abs=0.01)

    def test_equivalents_are_sensible(self):
        result = compute_usage_stoichiometry(self._entries())
        assert _row(result, "acid").equiv == pytest.approx(1.0)
        assert _row(result, "amine").equiv == pytest.approx(1.10, abs=0.01)
        assert _row(result, "edc").equiv == pytest.approx(1.20, abs=0.01)
        assert _row(result, "hobt").equiv == pytest.approx(1.00, abs=0.01)
        assert _row(result, "dipea").equiv == pytest.approx(2.0, abs=0.05)

    def test_solvent_without_mol_wt_is_unconvertible_but_keeps_volume(self):
        result = compute_usage_stoichiometry(self._entries())
        dcm = _row(result, "dcm")
        assert dcm.ok is False
        assert dcm.reason_code == "missing_density"
        assert dcm.volume_ml == pytest.approx(25.0)
        assert dcm.reason

    def test_yield(self):
        result = compute_usage_stoichiometry(self._entries())
        # theoretical 5.0 mmol x 211.26 = 1.0563 g; actual 887 mg -> ~84 %
        assert result.theoretical_mmol == pytest.approx(5.0, abs=0.01)
        assert result.theoretical_mass_g == pytest.approx(1.056, abs=0.005)
        assert result.yield_pct == pytest.approx(83.97, abs=0.5)

    def test_solvent_failure_does_not_break_the_rest_of_the_table(self):
        """The whole point of the tolerant contract."""
        result = compute_usage_stoichiometry(self._entries())
        ok_keys = {r.key for r in result.rows if r.ok}
        assert ok_keys == {"acid", "amine", "edc", "hobt", "dipea", "prod"}
        assert result.limiting_key == "acid"
        assert result.yield_pct is not None

    def test_row_order_is_preserved(self):
        entries = self._entries()
        result = compute_usage_stoichiometry(entries)
        assert [r.key for r in result.rows] == [e.key for e in entries]


class TestEmptyInput:
    def test_empty_entry_list(self):
        result = compute_usage_stoichiometry([])
        assert result.rows == []
        assert result.limiting_key is None
        assert result.yield_pct is None
