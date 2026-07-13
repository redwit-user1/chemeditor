"""Generate a synthetic demo SDF (foundation schema) so local search has rich hits.

NOT foundation data — deterministic synthetic library, clearly named demo_synthetic.
"""
from __future__ import annotations
import sys
from rdkit import Chem, RDLogger
RDLogger.DisableLog("rdApp.*")

from scripts.synthetic import generate
from app.sdf.writer import write_sdf_file, ComponentRecord
from rdkit.Chem import rdMolDescriptors, Descriptors

n = int(sys.argv[1]) if len(sys.argv) > 1 else 1200
out = sys.argv[2] if len(sys.argv) > 2 else "../data/demo_synthetic.sdf"

comps = generate(n)
records = []
for c in comps:
    mol = Chem.MolFromSmiles(c.smiles)
    if mol is None:
        continue
    mb = Chem.MolToMolBlock(mol)
    records.append(ComponentRecord(
        regid=c.regid, mixture_id=c.mixture_id, comp_index=1,
        molblock=mb,
        sdf_formula=rdMolDescriptors.CalcMolFormula(mol),
        sdf_weight=round(Descriptors.MolWt(mol), 4),
        raw_cdx=None,
    ))
write_sdf_file(out, records)
print(f"wrote {len(records)} components -> {out}")
