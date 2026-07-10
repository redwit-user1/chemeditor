"""Parity validation: RDKit vs. the foundation's stored SDF values.

Non-negotiable rule (CLAUDE.md): compare every record. MolWt tolerance ±0.01;
MolFormula must match exactly. Mismatches are *findings*, not failures to hide —
each is recorded with a best-effort reason (salt/counter-ion, tautomer, valence,
missing value) for ``reports/parity.md``.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

from .loader import ComponentRecord

WEIGHT_TOLERANCE = 0.01


@dataclass(frozen=True)
class Mismatch:
    regid: str
    comp_index: int
    kind: str  # 'formula' | 'weight' | 'unparsable' | 'missing'
    sdf_value: str
    rdkit_value: str
    reason: str


@dataclass
class ParityResult:
    n_checked: int = 0
    n_formula_ok: int = 0
    n_weight_ok: int = 0
    n_unparsable: int = 0
    mismatches: list[Mismatch] = field(default_factory=list)

    @property
    def n_full_ok(self) -> int:
        return self.n_checked - self.n_unparsable - len(
            {(m.regid, m.comp_index) for m in self.mismatches}
        )


def _reason_for_formula(smiles: str) -> str:
    if "." in smiles:
        return "multi-fragment (salt / counter-ion handling)"
    return "formula divergence (tautomer, charge, or stored-value error)"


def check_parity(records: list[ComponentRecord]) -> ParityResult:
    result = ParityResult()
    for rec in records:
        result.n_checked += 1
        mol = Chem.MolFromMolBlock(rec.molblock)
        if mol is None:
            result.n_unparsable += 1
            result.mismatches.append(
                Mismatch(
                    rec.regid,
                    rec.comp_index,
                    "unparsable",
                    "-",
                    "None",
                    "RDKit could not sanitize the CTAB",
                )
            )
            continue

        smiles = Chem.MolToSmiles(mol)
        calc_formula = rdMolDescriptors.CalcMolFormula(mol)
        calc_weight = round(Descriptors.MolWt(mol), 4)

        # Formula (exact).
        if rec.sdf_formula is None:
            result.mismatches.append(
                Mismatch(rec.regid, rec.comp_index, "missing", "-", calc_formula,
                         "SDF has no Mol Formula field")
            )
        elif calc_formula == rec.sdf_formula:
            result.n_formula_ok += 1
        else:
            result.mismatches.append(
                Mismatch(rec.regid, rec.comp_index, "formula", rec.sdf_formula,
                         calc_formula, _reason_for_formula(smiles))
            )

        # Weight (±0.01).
        if rec.sdf_weight is None:
            result.mismatches.append(
                Mismatch(rec.regid, rec.comp_index, "missing", "-",
                         f"{calc_weight}", "SDF has no Mol Wt field")
            )
        elif abs(calc_weight - rec.sdf_weight) <= WEIGHT_TOLERANCE:
            result.n_weight_ok += 1
        else:
            delta = abs(calc_weight - rec.sdf_weight)
            result.mismatches.append(
                Mismatch(rec.regid, rec.comp_index, "weight",
                         f"{rec.sdf_weight}", f"{calc_weight}",
                         f"Δ={delta:.4f} > {WEIGHT_TOLERANCE} "
                         f"({_reason_for_formula(smiles)})")
            )
    return result
