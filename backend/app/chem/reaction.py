"""Reaction parsing for the stoichiometry table.

Parses an MDL Rxnfile or a reaction SMILES into reactant / agent / product
species, each with RDKit-computed formula and molecular weight. The
stoichiometry arithmetic (equivalents, mmol, mass, limiting reagent,
theoretical yield) is done in the UI from these weights — this module only
supplies the trustworthy per-species numbers.

Agents are the species drawn *above the arrow*: coupling reagents (HATU), bases
(TEA), catalysts, solvents. They are neither consumed as reactants nor formed as
products, but a synthesis note is wrong without them.

Format matters here, and not symmetrically. Reaction SMILES carries agents in
its middle field (`reactants>agents>products`). An MDL Rxnfile does not have an
agent block at all — in either V2000 or V3000 — so agents drawn on the canvas
are gone the moment the structure is serialised to that format, before this
module ever sees the text. We therefore report which format we parsed, and say
plainly when the format itself cannot carry agents rather than returning an
empty list that reads like "the chemist drew none".
"""

from __future__ import annotations

from dataclasses import dataclass, field

from rdkit import Chem
from rdkit.Chem import Descriptors, rdChemReactions, rdMolDescriptors


@dataclass(frozen=True)
class Species:
    role: str  # 'reactant' | 'agent' | 'product'
    smiles: str
    mol_formula: str
    mol_weight: float


@dataclass(frozen=True)
class ReactionResult:
    ok: bool
    reactants: list[Species]
    products: list[Species]
    agents: list[Species] = field(default_factory=list)
    input_format: str | None = None  # 'smiles' | 'rxnblock'
    error: str | None = None

    @property
    def agents_unsupported_in_format(self) -> bool:
        """True when the input format has no place to put agents.

        Distinguishes "no agents were drawn" from "agents cannot survive this
        format" — the caller needs that difference to explain an empty list.
        """
        return self.input_format == "rxnblock"


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
        return ReactionResult(False, [], [], error="empty input")

    fmt = "rxnblock" if _looks_like_rxnblock(text) else "smiles"
    try:
        if fmt == "rxnblock":
            rxn = rdChemReactions.ReactionFromRxnBlock(text)
        else:
            rxn = rdChemReactions.ReactionFromSmarts(text.strip(), useSmiles=True)
    except Exception as exc:
        return ReactionResult(
            False, [], [], input_format=fmt,
            error=f"could not parse reaction: {exc}",
        )

    if rxn is None:
        return ReactionResult(
            False, [], [], input_format=fmt, error="RDKit returned no reaction"
        )

    reactants = [s for m in rxn.GetReactants() if (s := _species(m, "reactant"))]
    products = [s for m in rxn.GetProducts() if (s := _species(m, "product"))]
    agents = [s for m in rxn.GetAgents() if (s := _species(m, "agent"))]

    if not reactants and not products:
        return ReactionResult(
            False, [], [], input_format=fmt,
            error="no parseable species in reaction",
        )

    return ReactionResult(
        True, reactants, products, agents=agents, input_format=fmt
    )
