"""Reaction parsing for the stoichiometry table.

Parses an MDL Rxnfile or a reaction SMILES into reactant / product species, each
with RDKit-computed formula and molecular weight. The stoichiometry arithmetic
(equivalents, mmol, mass, limiting reagent, theoretical yield) is done in the
UI from these weights — this module only supplies the trustworthy per-species
numbers.
"""

from __future__ import annotations

from dataclasses import dataclass

from rdkit import Chem
from rdkit.Chem import Descriptors, rdChemReactions, rdMolDescriptors


@dataclass(frozen=True)
class Species:
    role: str  # 'reactant' | 'product'
    smiles: str
    mol_formula: str
    mol_weight: float


@dataclass(frozen=True)
class ReactionResult:
    ok: bool
    reactants: list[Species]
    products: list[Species]
    error: str | None = None


def _species(mol, role: str) -> Species | None:
    try:
        m = Chem.Mol(mol)
        Chem.SanitizeMol(m)
    except Exception:
        return None
    return Species(
        role=role,
        smiles=Chem.MolToSmiles(m),
        mol_formula=rdMolDescriptors.CalcMolFormula(m),
        mol_weight=round(Descriptors.MolWt(m), 4),
    )


def _looks_like_rxnblock(text: str) -> bool:
    return "$RXN" in text or "M  END" in text


def parse_reaction(text: str) -> ReactionResult:
    """Parse an Rxnfile or reaction SMILES into species with weights."""
    if not text or text.strip() == "":
        return ReactionResult(False, [], [], "empty input")

    try:
        if _looks_like_rxnblock(text):
            rxn = rdChemReactions.ReactionFromRxnBlock(text)
        else:
            rxn = rdChemReactions.ReactionFromSmarts(text.strip(), useSmiles=True)
    except Exception as exc:
        return ReactionResult(False, [], [], f"could not parse reaction: {exc}")

    if rxn is None:
        return ReactionResult(False, [], [], "RDKit returned no reaction")

    reactants = [s for m in rxn.GetReactants() if (s := _species(m, "reactant"))]
    products = [s for m in rxn.GetProducts() if (s := _species(m, "product"))]

    if not reactants and not products:
        return ReactionResult(False, [], [], "no parseable species in reaction")

    return ReactionResult(True, reactants, products)
