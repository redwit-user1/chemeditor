"""Property calculation tests — the load-bearing chemistry of the PoC.

Reference values are RDKit's own, cross-checked against known literature
molecular weights to within the project's ±0.01 tolerance.
"""

import math

import pytest

from app.chem.parsing import parse_structure
from app.chem.properties import compute_properties, properties_from_text

# (name, smiles, formula, mol_weight) — mol_weight from public references.
KNOWN = [
    ("benzene", "c1ccccc1", "C6H6", 78.11),
    ("water", "O", "H2O", 18.02),
    ("ethanol", "CCO", "C2H6O", 46.07),
    ("aspirin", "CC(=O)Oc1ccccc1C(=O)O", "C9H8O4", 180.16),
    ("caffeine", "Cn1cnc2c1c(=O)n(C)c(=O)n2C", "C8H10N4O2", 194.19),
    ("glucose", "OCC1OC(O)C(O)C(O)C1O", "C6H12O6", 180.16),
]


@pytest.mark.parametrize("name,smiles,formula,mw", KNOWN, ids=[k[0] for k in KNOWN])
def test_formula_and_weight(name, smiles, formula, mw):
    result = properties_from_text(smiles)
    assert result.ok, f"{name}: {result.error}"
    assert result.properties.mol_formula == formula
    # ±0.01 is the foundation's parity tolerance.
    assert math.isclose(result.properties.mol_weight, mw, abs_tol=0.01), (
        f"{name}: got {result.properties.mol_weight}, expected {mw}"
    )


def test_exact_mass_differs_from_average():
    # Monoisotopic mass must be distinct from the average MolWt.
    result = properties_from_text("c1ccccc1")
    assert result.ok
    assert result.properties.exact_mol_weight == pytest.approx(78.0470, abs=0.001)
    assert result.properties.mol_weight != result.properties.exact_mol_weight


def test_molblock_input_is_detected():
    # A V2000 molfile (ethanol) must parse as 'mol', not SMILES.
    molblock = """
  Mrv

  3  2  0  0  0  0            999 V2000
    0.0000    0.0000    0.0000 C   0  0
    1.0000    0.0000    0.0000 C   0  0
    2.0000    0.0000    0.0000 O   0  0
  1  2  1  0
  2  3  1  0
M  END
"""
    result = properties_from_text(molblock)
    assert result.ok, result.error
    assert result.input_format == "mol"
    assert result.properties.mol_formula == "C2H6O"


def test_parse_failure_is_not_swallowed():
    # Garbage SMILES → explicit error, never a silent None or a fake result.
    result = properties_from_text("this is not a molecule!!!")
    assert result.ok is False
    assert result.properties is None
    assert result.error is not None and result.error != ""


def test_empty_input_reports_empty():
    result = properties_from_text("   ")
    assert result.ok is False
    assert result.input_format == "empty"


def test_salt_has_multiple_fragments():
    # Sodium acetate — parity report cares about salt handling.
    parsed = parse_structure("CC(=O)[O-].[Na+]")
    assert parsed.ok
    props = compute_properties(parsed.mol)
    assert props.mol_formula == "C2H3NaO2"
