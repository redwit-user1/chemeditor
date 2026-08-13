"""A small reagent inventory and its search.

Stands in for the foundation's reagent stockroom database. Each reagent has a
name, CAS number, and structure (SMILES). Searchable three ways — by name, by
CAS, or by structure (substructure via the same portable search backend) — so a
chemist can find a reagent and drop it straight onto the reaction canvas.

The dataset here is a representative common-reagent set; in production this
table is populated from the inventory system.
"""

from __future__ import annotations

from dataclasses import dataclass

from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

# (name, CAS, SMILES)
_RAW: list[tuple[str, str, str]] = [
    ("Acetic acid", "64-19-7", "CC(=O)O"),
    ("Acetic anhydride", "108-24-7", "CC(=O)OC(C)=O"),
    ("Acetone", "67-64-1", "CC(C)=O"),
    ("Acetonitrile", "75-05-8", "CC#N"),
    ("Aniline", "62-53-3", "Nc1ccccc1"),
    ("Benzaldehyde", "100-52-7", "O=Cc1ccccc1"),
    ("Benzoic acid", "65-85-0", "OC(=O)c1ccccc1"),
    ("Benzyl bromide", "100-39-0", "BrCc1ccccc1"),
    ("Boc anhydride", "24424-99-5", "CC(C)(C)OC(=O)OC(=O)OC(C)(C)C"),
    ("Bromobenzene", "108-86-1", "Brc1ccccc1"),
    ("n-Butyllithium", "109-72-8", "[Li]CCCC"),
    ("Chloroform", "67-66-3", "ClC(Cl)Cl"),
    ("Dichloromethane", "75-09-2", "ClCCl"),
    ("DIPEA (Hunig's base)", "7087-68-5", "CCN(C(C)C)C(C)C"),
    ("DMF", "68-12-2", "CN(C)C=O"),
    ("DMSO", "67-68-5", "CS(C)=O"),
    ("EDC", "25952-53-8", "CCN=C=NCCCN(C)C"),
    ("Ethanol", "64-17-5", "CCO"),
    ("Ethyl acetate", "141-78-6", "CCOC(C)=O"),
    ("Formic acid", "64-18-6", "OC=O"),
    # HATU 는 트리아졸로[4,5-b]피리디늄 — 고리에 질소가 하나 더 있다(아자벤조트리아졸).
    # 여기 등록돼 있던 SMILES 는 벤조트리아졸이라 실제로는 HBTU 였다: 이름은 HATU 인데
    # 삽입되는 구조는 다른 물질이었다(C11H16N5O+ 234.28 vs 참값 C10H15N6O+ 235.27).
    # 재단이 이름을 짚어 요청한 시약이라 조용히 두면 틀린 구조가 노트에 남는다.
    ("HATU", "148893-10-1", "CN(C)C(On1nnc2cccnc21)=[N+](C)C"),
    ("HBTU", "94790-37-1", "CN(C)C(On1nnc2ccccc21)=[N+](C)C"),
    ("Imidazole", "288-32-4", "c1c[nH]cn1"),
    ("Methanol", "67-56-1", "CO"),
    ("Methyl iodide", "74-88-4", "CI"),
    ("Morpholine", "110-91-8", "C1COCCN1"),
    ("Palladium acetate", "3375-31-3", "CC(=O)O[Pd]OC(C)=O"),
    ("Phenol", "108-95-2", "Oc1ccccc1"),
    ("Piperidine", "110-89-4", "C1CCNCC1"),
    ("Pyridine", "110-86-1", "c1ccncc1"),
    ("Sodium borohydride", "16940-66-2", "[BH4-].[Na+]"),
    ("Sodium hydroxide", "1310-73-2", "[OH-].[Na+]"),
    ("TFA", "76-05-1", "OC(=O)C(F)(F)F"),
    ("THF", "109-99-9", "C1CCOC1"),
    ("Toluene", "108-88-3", "Cc1ccccc1"),
    ("Triethylamine", "121-44-8", "CCN(CC)CC"),
    ("Trimethylsilyl chloride", "75-77-4", "C[Si](C)(C)Cl"),
    ("Water", "7732-18-5", "O"),
]


@dataclass(frozen=True)
class Reagent:
    name: str
    cas: str
    smiles: str
    mol_formula: str
    mol_weight: float


def _build() -> list[Reagent]:
    out: list[Reagent] = []
    for name, cas, smiles in _RAW:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            continue
        out.append(
            Reagent(
                name=name,
                cas=cas,
                smiles=Chem.MolToSmiles(mol),
                mol_formula=rdMolDescriptors.CalcMolFormula(mol),
                mol_weight=round(Descriptors.MolWt(mol), 2),
            )
        )
    return out


REAGENTS: list[Reagent] = _build()


def search_by_text(query: str, limit: int = 25) -> list[Reagent]:
    """Case-insensitive substring match on name or CAS."""
    q = query.strip().lower()
    if not q:
        return []
    hits = [
        r for r in REAGENTS if q in r.name.lower() or q in r.cas.lower()
    ]
    return hits[:limit]


def search_by_substructure(query_smiles: str, limit: int = 25) -> list[Reagent]:
    """Reagents that contain the query structure as a substructure."""
    qmol = Chem.MolFromSmiles(query_smiles)
    if qmol is None:
        return []
    hits = []
    for r in REAGENTS:
        mol = Chem.MolFromSmiles(r.smiles)
        if mol is not None and mol.HasSubstructMatch(qmol):
            hits.append(r)
    return hits[:limit]
