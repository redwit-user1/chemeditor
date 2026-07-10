"""Molecular property calculation — the core of the PoC.

> 구조식을 붙여넣는 즉시, 하단에서 분자식·분자량이 자동 계산된다.

Everything here is RDKit. No ChemDraw SDK, no Indigo. These are the exact
values shown in the property panel and compared against the foundation's SDF
fields during parity validation.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass

from rdkit.Chem import Descriptors, rdMolDescriptors

from .parsing import ParseResult, parse_structure


@dataclass(frozen=True)
class Properties:
    """The property set surfaced in the UI panel and used for parity checks."""

    mol_formula: str
    mol_weight: float
    exact_mol_weight: float
    num_heavy_atoms: int
    num_rings: int
    num_h_donors: int
    num_h_acceptors: int
    tpsa: float
    logp: float

    def as_dict(self) -> dict:
        return asdict(self)


def compute_properties(mol) -> Properties:
    """Compute the property panel values for a sanitized RDKit mol.

    ``mol_weight`` uses average atomic masses (matches ChemDraw / SDF "Mol Wt");
    ``exact_mol_weight`` uses monoisotopic masses.
    """
    return Properties(
        mol_formula=rdMolDescriptors.CalcMolFormula(mol),
        mol_weight=round(Descriptors.MolWt(mol), 4),
        exact_mol_weight=round(Descriptors.ExactMolWt(mol), 4),
        num_heavy_atoms=mol.GetNumHeavyAtoms(),
        num_rings=rdMolDescriptors.CalcNumRings(mol),
        num_h_donors=rdMolDescriptors.CalcNumHBD(mol),
        num_h_acceptors=rdMolDescriptors.CalcNumHBA(mol),
        tpsa=round(rdMolDescriptors.CalcTPSA(mol), 4),
        logp=round(Descriptors.MolLogP(mol), 4),
    )


@dataclass(frozen=True)
class PropertyResult:
    """Full outcome: either computed properties or a parse error."""

    ok: bool
    input_format: str
    properties: "Properties | None" = None
    error: "str | None" = None


def properties_from_text(text: str) -> PropertyResult:
    """Parse a text structure and compute its properties in one step.

    This is what the ``/api/properties`` endpoint calls. Parse failures are
    returned explicitly — never swallowed.
    """
    parsed: ParseResult = parse_structure(text)
    if not parsed.ok:
        return PropertyResult(
            ok=False, input_format=parsed.input_format, error=parsed.error
        )
    props = compute_properties(parsed.mol)
    return PropertyResult(
        ok=True, input_format=parsed.input_format, properties=props
    )
