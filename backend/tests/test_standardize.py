"""Standardization pipeline tests — SPEC §3.3.

Salt stripping / uncharging change MW, so these standardized forms are for
search indexing only; parity tests elsewhere use pre-standardization values.
"""

import pytest

from rdkit import Chem

from app.chem.standardize import StandardizeError, standardize, standardize_smiles

SODIUM_ACETATE = "CC(=O)[O-].[Na+]"
ACETATE_ANION = "CC(=O)[O-]"
ACETIC_ACID = "CC(=O)O"

# 2-hydroxypyridine and 2-pyridone — the classic tautomer pair.
HYDROXYPYRIDINE = "Oc1ccccn1"
PYRIDONE = "O=c1cccc[nH]1"


def canonical(smiles: str) -> str:
    return Chem.MolToSmiles(Chem.MolFromSmiles(smiles))


# --- fragment parent (salt stripping) ----------------------------------------


def test_sodium_acetate_fragment_parent_gives_neutral_acetic_acid():
    out = standardize_smiles(SODIUM_ACETATE, fragment_parent=True)
    assert out == canonical(ACETIC_ACID)


def test_sodium_acetate_without_fragment_parent_keeps_both_fragments():
    out = standardize_smiles(SODIUM_ACETATE, fragment_parent=False)
    mol = Chem.MolFromSmiles(out)
    assert mol is not None
    assert len(Chem.GetMolFrags(mol)) == 2


def test_standardize_mol_api_fragment_parent():
    mol = Chem.MolFromSmiles(SODIUM_ACETATE)
    out = standardize(mol, fragment_parent=True)
    assert Chem.MolToSmiles(out) == canonical(ACETIC_ACID)


# --- uncharge -----------------------------------------------------------------


def test_uncharge_neutralizes_acetate_anion():
    out = standardize_smiles(ACETATE_ANION)  # uncharge=True is the default
    assert out == canonical(ACETIC_ACID)


def test_uncharge_can_be_disabled():
    out = standardize_smiles(ACETATE_ANION, uncharge=False)
    mol = Chem.MolFromSmiles(out)
    assert sum(a.GetFormalCharge() for a in mol.GetAtoms()) == -1


# --- tautomer canonicalization -------------------------------------------------


def test_tautomer_pair_maps_to_same_canonical_smiles():
    a = standardize_smiles(HYDROXYPYRIDINE, tautomer=True)
    b = standardize_smiles(PYRIDONE, tautomer=True)
    assert a == b


def test_without_tautomer_flag_pair_stays_distinct():
    # Guard: the flag must actually gate the (slow) tautomer step.
    a = standardize_smiles(HYDROXYPYRIDINE, tautomer=False)
    b = standardize_smiles(PYRIDONE, tautomer=False)
    assert a != b


# --- standardize does not mutate its input ------------------------------------


def test_input_mol_is_not_mutated():
    mol = Chem.MolFromSmiles(SODIUM_ACETATE)
    before = Chem.MolToSmiles(mol)
    standardize(mol, fragment_parent=True)
    assert Chem.MolToSmiles(mol) == before


# --- failures ------------------------------------------------------------------


def test_parse_failure_raises_standardize_error():
    with pytest.raises(StandardizeError) as excinfo:
        standardize_smiles("this is not a molecule!!!")
    assert str(excinfo.value)


def test_empty_input_raises_standardize_error():
    with pytest.raises(StandardizeError):
        standardize_smiles("   ")


def test_none_mol_raises_standardize_error():
    with pytest.raises(StandardizeError):
        standardize(None)
