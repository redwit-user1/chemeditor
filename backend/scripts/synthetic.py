"""Deterministic synthetic compound library.

The foundation's real SDF (~5,342 components) is confidential and absent from
this repo. To produce *real* benchmark numbers at a comparable scale, we
enumerate a deterministic, diverse set of valid drug-like structures. Clearly
labelled as synthetic wherever its numbers appear.

Deterministic (no RNG) so benchmarks are reproducible.
"""

from __future__ import annotations

from rdkit import Chem, RDLogger
from rdkit.Chem import Descriptors, rdMolDescriptors

RDLogger.DisableLog("rdApp.*")

# Cores with one, two, or three parenthesised branch positions. Every position
# is always filled with a non-empty group, so every enumerated SMILES is valid.
_ONE = [
    "c1ccc({s})cc1",
    "c1ccc({s})nc1",
    "C1CCC({s})CC1",
    "c1ccc2ccccc2c1{s}",
]
_TWO = [
    "c1cc({s})ccc1{t}",
    "c1ccc({s})c({t})c1",
    "O=C({s})Nc1ccccc1{t}",
    "c1cc({s})cc({t})c1",
    "c1ccc(-c2ccc({t})cc2)cc1{s}",
]
_THREE = [
    "c1c({s})c({t})c({u})cc1",
    "c1cc({s})c({t})c({u})c1",
    "c1c({s})cc({t})cc1{u}",
    "C1CC({s})C({t})C({u})C1",
]

_SUBS = [
    "C",
    "CC",
    "CCC",
    "CCCC",
    "OC",
    "OCC",
    "O",
    "N",
    "NC",
    "N(C)C",
    "Cl",
    "F",
    "Br",
    "I",
    "C(=O)O",
    "C(=O)OC",
    "C#N",
    "OC(F)(F)F",
    "C(=O)N",
    "S(=O)(=O)N",
    "SC",
    "c1ccccc1",
]


def _iter_smiles():
    for tpl in _ONE:
        for s in _SUBS:
            yield tpl.format(s=s)
    for tpl in _TWO:
        for s in _SUBS:
            for t in _SUBS:
                yield tpl.format(s=s, t=t)
    for tpl in _THREE:
        for s in _SUBS:
            for t in _SUBS:
                for u in _SUBS:
                    yield tpl.format(s=s, t=t, u=u)


def generate(n: int) -> list:
    """Return up to ``n`` unique valid components (canonical-SMILES deduped)."""
    from app.search.backend import Component

    seen: set[str] = set()
    out: list = []
    for smiles in _iter_smiles():
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            continue
        canonical = Chem.MolToSmiles(mol)
        if canonical in seen:
            continue
        seen.add(canonical)
        idx = len(out) + 1
        out.append(
            Component(
                regid=f"S{idx:05d}",
                mixture_id=f"MX{idx:05d}",
                comp_index=1,
                smiles=canonical,
                mol_formula=rdMolDescriptors.CalcMolFormula(mol),
                mol_weight=round(Descriptors.MolWt(mol), 4),
            )
        )
        if len(out) >= n:
            break
    return out
