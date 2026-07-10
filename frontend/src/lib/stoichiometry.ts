import type { Species } from './api';

/**
 * Pure stoichiometry arithmetic, separated from the React panel so it can be
 * unit-tested. The first reactant is the reference reagent: its amount (mg)
 * fixes the mmol basis, other reactants scale by their equivalents, and product
 * mass is the 100% theoretical yield (1:1 from the reference).
 */

export interface StoichRow {
  role: 'reactant' | 'product';
  formula: string;
  mw: number;
  equiv: number | null; // null for products / reference marker handled in UI
  mmol: number;
  massMg: number;
  isReference: boolean;
}

export function referenceMmol(refMassMg: number, refMw: number): number {
  return refMw > 0 ? refMassMg / refMw : 0;
}

export function computeStoichiometry(
  reactants: { species: Species; equiv: number }[],
  products: Species[],
  refMassMg: number,
): StoichRow[] {
  const refMw = reactants[0]?.species.mol_weight ?? 0;
  const refMmol = referenceMmol(refMassMg, refMw);

  const reactantRows: StoichRow[] = reactants.map((r, i) => {
    const isReference = i === 0;
    const mmol = isReference ? refMmol : refMmol * r.equiv;
    return {
      role: 'reactant',
      formula: r.species.mol_formula,
      mw: r.species.mol_weight,
      equiv: isReference ? null : r.equiv,
      mmol,
      massMg: mmol * r.species.mol_weight,
      isReference,
    };
  });

  const productRows: StoichRow[] = products.map((p) => ({
    role: 'product',
    formula: p.mol_formula,
    mw: p.mol_weight,
    equiv: null,
    mmol: refMmol,
    massMg: refMmol * p.mol_weight,
    isReference: false,
  }));

  return [...reactantRows, ...productRows];
}
