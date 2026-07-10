"""Reaction parsing tests for the stoichiometry feature."""

from app.chem.reaction import parse_reaction


def test_esterification_reaction_smiles():
    result = parse_reaction("CC(=O)O.OCC>>CC(=O)OCC.O")
    assert result.ok
    assert [s.mol_formula for s in result.reactants] == ["C2H4O2", "C2H6O"]
    assert [s.mol_formula for s in result.products] == ["C4H8O2", "H2O"]
    acetic = result.reactants[0]
    assert abs(acetic.mol_weight - 60.05) < 0.01


def test_single_reactant_product():
    result = parse_reaction("c1ccccc1Br>>c1ccccc1O")
    assert result.ok
    assert len(result.reactants) == 1
    assert len(result.products) == 1
    assert result.products[0].mol_formula == "C6H6O"


def test_empty_input():
    result = parse_reaction("   ")
    assert result.ok is False
    assert result.error


def test_garbage_input_is_graceful():
    result = parse_reaction("not a reaction")
    assert result.ok is False
    assert result.error is not None


def test_weights_are_rdkit_values():
    # Reactant MW must match the standalone property engine.
    result = parse_reaction("CC(=O)Oc1ccccc1C(=O)O>>Oc1ccccc1C(=O)O.CC(=O)O")
    assert result.ok
    aspirin = result.reactants[0]
    assert aspirin.mol_formula == "C9H8O4"
    assert abs(aspirin.mol_weight - 180.16) < 0.01
