"""Format conversion tests — MOL ↔ SMILES ↔ InChI ↔ InChIKey.

Reference values are RDKit's own canonical forms plus the standard InChIKey
for benzene, which is fixed by the InChI algorithm and safe to hard-code.
"""

import pytest

from rdkit import Chem

from app.chem.convert import (
    ConvertError,
    convert,
    to_inchi,
    to_inchikey,
    to_molblock,
    to_smiles,
)

BENZENE_SMILES = "c1ccccc1"
BENZENE_INCHI = "InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H"
BENZENE_INCHIKEY = "UHOVQNZJYSORNB-UHFFFAOYSA-N"
ASPIRIN_SMILES = "CC(=O)Oc1ccccc1C(=O)O"


def canonical(smiles: str) -> str:
    return Chem.MolToSmiles(Chem.MolFromSmiles(smiles))


# --- benzene round-trips: mol ↔ smiles ↔ inchi ------------------------------


def test_benzene_smiles_to_mol_and_back():
    molblock = convert(BENZENE_SMILES, from_="smiles", to="mol")
    assert "M  END" in molblock
    back = convert(molblock, from_="mol", to="smiles")
    assert back == canonical(BENZENE_SMILES)


def test_benzene_smiles_to_inchi_and_back():
    inchi = convert(BENZENE_SMILES, from_="smiles", to="inchi")
    assert inchi == BENZENE_INCHI
    back = convert(inchi, from_="inchi", to="smiles")
    assert back == canonical(BENZENE_SMILES)


def test_benzene_mol_to_inchi_and_back_to_mol():
    molblock = convert(BENZENE_SMILES, from_="smiles", to="mol")
    inchi = convert(molblock, from_="mol", to="inchi")
    assert inchi == BENZENE_INCHI
    mol_again = convert(inchi, from_="inchi", to="mol")
    # Same molecule after the full loop: compare canonical SMILES.
    assert convert(mol_again, from_="mol", to="smiles") == canonical(BENZENE_SMILES)


def test_benzene_inchikey():
    assert convert(BENZENE_SMILES, from_="smiles", to="inchikey") == BENZENE_INCHIKEY


# --- aspirin: smiles → inchi → smiles preserves the canonical form ----------


def test_aspirin_inchi_round_trip_preserves_canonical_smiles():
    inchi = convert(ASPIRIN_SMILES, from_="smiles", to="inchi")
    back = convert(inchi, from_="inchi", to="smiles")
    assert back == canonical(ASPIRIN_SMILES)


# --- mol → mol round-trip preserves atom count -------------------------------


def test_mol_to_mol_round_trip_preserves_atom_count():
    molblock = convert(ASPIRIN_SMILES, from_="smiles", to="mol")
    round_tripped = convert(molblock, from_="mol", to="mol")
    orig = Chem.MolFromMolBlock(molblock)
    again = Chem.MolFromMolBlock(round_tripped)
    assert orig is not None and again is not None
    assert again.GetNumAtoms() == orig.GetNumAtoms()


# --- named helpers ------------------------------------------------------------


def test_named_helpers_agree_with_convert():
    molblock = convert(BENZENE_SMILES, from_="smiles", to="mol")
    mol = Chem.MolFromMolBlock(molblock)
    assert to_smiles(mol) == canonical(BENZENE_SMILES)
    assert to_inchi(mol) == BENZENE_INCHI
    assert to_inchikey(mol) == BENZENE_INCHIKEY
    assert "M  END" in to_molblock(mol)


# --- failures raise ConvertError, never a silent None ------------------------


@pytest.mark.parametrize("from_", ["mol", "smiles", "inchi"])
def test_garbage_input_raises_convert_error(from_):
    with pytest.raises(ConvertError) as excinfo:
        convert("this is not a molecule!!!", from_=from_, to="smiles")
    # The error must carry a reason, not be a bare marker.
    assert str(excinfo.value)


def test_unknown_from_format_raises():
    with pytest.raises(ConvertError):
        convert(BENZENE_SMILES, from_="cdx", to="smiles")  # type: ignore[arg-type]


def test_unknown_to_format_raises():
    with pytest.raises(ConvertError):
        convert(BENZENE_SMILES, from_="smiles", to="cdx")  # type: ignore[arg-type]


def test_empty_input_raises():
    with pytest.raises(ConvertError):
        convert("   ", from_="smiles", to="inchi")
