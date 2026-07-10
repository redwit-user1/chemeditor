"""Tests for app.chem.stoich — pure stoichiometry (no RDKit).

Contract: docs/SPEC.md §3.2. Validated case: the foundation's real synthesis
note (pyrocatechol + acetic anhydride -> guaiacol acetate analogue), which
must reproduce to the printed digit.

Direction insight (see module docstring of app/chem/stoich.py): the printed
note only reproduces exactly if acetic anhydride is eq-DRIVEN (eq=1.000 in,
mass/vol derived). Feeding its printed mass 0.464 g back in as the input
yields eq 1.001 — not a bug, a rounding echo of the note's own display.
"""

import pytest

from app.chem.stoich import StoichRow, compute_stoichiometry, round_display


def _validated_rows():
    return [
        StoichRow(
            role="reactant",
            name="pyrocatechol",
            formula="C6H6O2",
            fw=110.112,
            is_limiting=True,
            given="mass",
            mass_g=0.5,
        ),
        StoichRow(
            role="reactant",
            name="acetic anhydride",
            formula="C4H6O3",
            fw=102.089,
            given="eq",
            eq=1.000,
            density=1.082,
        ),
        StoichRow(
            role="product",
            name="product",
            formula="C8H8O3",
            fw=152.149,
            actual_mass_g=0.2558,
        ),
        StoichRow(
            role="solvent",
            name="Acetonitrile",
            given="volume",
            volume_ml=5.0,
        ),
    ]


class TestValidatedSynthesisNote:
    """Mandatory case from SPEC §3.2 — must hit every printed digit."""

    @pytest.fixture()
    def result(self):
        return compute_stoichiometry(_validated_rows(), temperature_c=80)

    def test_limiting_pyrocatechol(self, result):
        row = result.rows[0]
        assert row.is_limiting
        assert round_display(row.mmol, 2) == 4.54
        assert round_display(row.eq, 3) == 1.000
        assert row.mass_g == 0.5

    def test_acetic_anhydride_eq_driven(self, result):
        row = result.rows[1]
        assert round_display(row.mmol, 2) == 4.54
        assert round_display(row.eq, 3) == 1.000
        assert round_display(row.mass_g, 3) == 0.464
        assert round_display(row.volume_ml, 3) == 0.428

    def test_product(self, result):
        row = result.rows[2]
        assert round_display(row.theo_mol_mmol, 2) == 4.54
        assert round_display(row.theo_mass_g, 3) == 0.691
        # 0.2558 / 152.149 * 1000 = 1.68124... -> 1.681 at 3dp
        assert round_display(row.actual_mol_mmol, 3) == 1.681
        assert round_display(row.yield_pct, 1) == 37.0

    def test_reaction_level(self, result):
        assert round_display(result.reaction["molarity"], 3) == 0.908
        assert result.reaction["temperature_c"] == 80

    def test_no_rounding_inside_computation(self, result):
        # Raw values must be full precision, not display-rounded.
        assert result.rows[0].mmol == pytest.approx(0.5 / 110.112 * 1000)
        assert result.rows[0].mmol != 4.54


class TestDirectionInsight:
    """Mass-driving the anhydride with the note's printed 0.464 g gives
    eq 1.001, not 1.000 — the note's mass is itself a rounded output."""

    def test_mass_driven_anhydride_echo(self):
        rows = _validated_rows()
        rows[1] = StoichRow(
            role="reactant",
            name="acetic anhydride",
            formula="C4H6O3",
            fw=102.089,
            given="mass",
            mass_g=0.464,
            density=1.082,
        )
        result = compute_stoichiometry(rows, temperature_c=80)
        assert round_display(result.rows[1].eq, 3) == 1.001


class TestMassDrivenReagent:
    def test_eq_derived_from_mass(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),  # 10 mmol
            StoichRow(role="reactant", name="excess", fw=50.0,
                      given="mass", mass_g=1.0),  # 20 mmol
        ]
        result = compute_stoichiometry(rows)
        assert result.rows[0].mmol == pytest.approx(10.0)
        assert result.rows[0].eq == pytest.approx(1.0)
        assert result.rows[1].mmol == pytest.approx(20.0)
        assert result.rows[1].eq == pytest.approx(2.0)

    def test_volume_from_density(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0,
                      density=0.8),
        ]
        result = compute_stoichiometry(rows)
        assert result.rows[0].volume_ml == pytest.approx(1.0 / 0.8)


class TestSolutionDrivenRow:
    def test_volume_times_molarity(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),  # 10 mmol
            StoichRow(role="reactant", name="soln", fw=40.0,
                      given="volume", volume_ml=2.0, molarity=1.5),
        ]
        result = compute_stoichiometry(rows)
        row = result.rows[1]
        assert row.mmol == pytest.approx(3.0)  # 2 ml * 1.5 M
        assert row.eq == pytest.approx(0.3)
        assert row.mass_g == pytest.approx(3.0 * 40.0 / 1000)  # solute mass

    def test_neat_liquid_volume_with_density(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="volume", volume_ml=2.0,
                      density=0.5),  # 1 g -> 10 mmol
        ]
        result = compute_stoichiometry(rows)
        assert result.rows[0].mass_g == pytest.approx(1.0)
        assert result.rows[0].mmol == pytest.approx(10.0)


class TestLimitingToggle:
    def test_swapping_limiting_changes_all_eq(self):
        def make(limiting_idx):
            return [
                StoichRow(role="reactant", name="A", fw=100.0,
                          is_limiting=(limiting_idx == 0),
                          given="mass", mass_g=1.0),  # 10 mmol
                StoichRow(role="reactant", name="B", fw=100.0,
                          is_limiting=(limiting_idx == 1),
                          given="mass", mass_g=2.0),  # 20 mmol
                StoichRow(role="product", name="P", fw=150.0),
            ]

        res_a = compute_stoichiometry(make(0))
        assert res_a.rows[0].eq == pytest.approx(1.0)
        assert res_a.rows[1].eq == pytest.approx(2.0)
        assert res_a.rows[2].theo_mol_mmol == pytest.approx(10.0)

        res_b = compute_stoichiometry(make(1))
        assert res_b.rows[0].eq == pytest.approx(0.5)
        assert res_b.rows[1].eq == pytest.approx(1.0)
        assert res_b.rows[2].theo_mol_mmol == pytest.approx(20.0)


class TestProductCoeff:
    def test_coeff_2_doubles_theo(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),  # 10 mmol
            StoichRow(role="product", name="P", fw=150.0, coeff=2.0),
        ]
        result = compute_stoichiometry(rows)
        prod = result.rows[1]
        assert prod.theo_mol_mmol == pytest.approx(20.0)
        assert prod.theo_mass_g == pytest.approx(20.0 * 150.0 / 1000)

    def test_limiting_coeff_halves_theo(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0,
                      coeff=2.0),  # 10 mmol, coeff 2
            StoichRow(role="product", name="P", fw=150.0),
        ]
        result = compute_stoichiometry(rows)
        assert result.rows[1].theo_mol_mmol == pytest.approx(5.0)


class TestErrors:
    def test_no_limiting(self):
        rows = [
            StoichRow(role="reactant", name="A", fw=100.0,
                      given="mass", mass_g=1.0),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)

    def test_two_limiting(self):
        rows = [
            StoichRow(role="reactant", name="A", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),
            StoichRow(role="reactant", name="B", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)

    def test_fw_zero_or_negative(self):
        for bad_fw in (0.0, -110.112):
            rows = [
                StoichRow(role="reactant", name="A", fw=bad_fw,
                          is_limiting=True, given="mass", mass_g=1.0),
            ]
            with pytest.raises(ValueError):
                compute_stoichiometry(rows)

    def test_unknown_given(self):
        rows = [
            StoichRow(role="reactant", name="A", fw=100.0,
                      is_limiting=True, given="moles", mass_g=1.0),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)

    def test_volume_row_missing_density_and_molarity(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),
            StoichRow(role="reactant", name="B", fw=100.0,
                      given="volume", volume_ml=1.0),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)

    def test_limiting_row_cannot_be_eq_driven(self):
        rows = [
            StoichRow(role="reactant", name="A", fw=100.0,
                      is_limiting=True, given="eq", eq=1.0),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)

    def test_limiting_must_be_reactant(self):
        rows = [
            StoichRow(role="reactant", name="A", fw=100.0,
                      given="mass", mass_g=1.0),
            StoichRow(role="product", name="P", fw=150.0, is_limiting=True),
        ]
        with pytest.raises(ValueError):
            compute_stoichiometry(rows)


class TestSolventAndReactionLevel:
    def test_multiple_solvents_sum(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),  # 10 mmol
            StoichRow(role="solvent", name="MeCN", volume_ml=3.0),
            StoichRow(role="solvent", name="H2O", volume_ml=2.0),
        ]
        result = compute_stoichiometry(rows)
        assert result.reaction["molarity"] == pytest.approx(2.0)  # 10 / 5

    def test_no_solvent_molarity_none(self):
        rows = [
            StoichRow(role="reactant", name="lim", fw=100.0,
                      is_limiting=True, given="mass", mass_g=1.0),
        ]
        result = compute_stoichiometry(rows)
        assert result.reaction["molarity"] is None
        assert result.reaction["temperature_c"] is None


class TestRoundDisplay:
    def test_half_up(self):
        assert round_display(0.4635, 3) == 0.464  # ties away from zero
        assert round_display(2.5, 0) == 3.0
        assert round_display(-2.5, 0) == -3.0

    def test_none_passthrough(self):
        assert round_display(None, 3) is None

    def test_validated_digits(self):
        assert round_display(0.5 / 110.112 * 1000, 2) == 4.54
        assert round_display(0.2558 / 152.149 * 1000, 3) == 1.681
