"""Brute-force reference backend — the ground truth for equivalence tests.

No SQL, no screening, no fingerprints: it evaluates every component with RDKit
directly. It is too slow for production but definitively correct, so both real
backends are tested to match it exactly.
"""

from __future__ import annotations

from rdkit import Chem

from ..chem.fingerprint import morgan_bits, tanimoto
from .backend import ChemSearchBackend, Component, Hit, rollup_by_regid


class BruteForceBackend(ChemSearchBackend):
    name = "reference"

    def __init__(self) -> None:
        self._rows: list[tuple[Component, Chem.Mol, set[int]]] = []

    def add_component(self, component: Component) -> None:
        mol = Chem.MolFromSmiles(component.smiles)
        if mol is None:
            return  # loader tracks parse failures; search just skips them
        self._rows.append((component, mol, set(morgan_bits(mol))))

    def build(self) -> None:  # nothing to finalize
        pass

    def exact_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        target = Chem.MolToSmiles(qmol)
        hits = [
            _hit(comp)
            for comp, mol, _ in self._rows
            if Chem.MolToSmiles(mol) == target
        ]
        return rollup_by_regid(hits)

    def substructure_search(self, query_smiles: str) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        hits = [
            _hit(comp)
            for comp, mol, _ in self._rows
            if mol.HasSubstructMatch(qmol)
        ]
        return rollup_by_regid(hits)

    def similarity_search(self, query_smiles: str, threshold: float) -> list[Hit]:
        qmol = Chem.MolFromSmiles(query_smiles)
        if qmol is None:
            return []
        qbits = set(morgan_bits(qmol))
        hits: list[Hit] = []
        for comp, _, bits in self._rows:
            score = tanimoto(qbits, bits)
            if score >= threshold:
                hits.append(_hit(comp, score=score))
        return rollup_by_regid(hits)


def _hit(comp: Component, score: float | None = None) -> Hit:
    return Hit(
        regid=comp.regid,
        mixture_id=comp.mixture_id,
        mol_formula=comp.mol_formula,
        mol_weight=comp.mol_weight,
        matched_component=comp.comp_index,
        score=score,
    )
