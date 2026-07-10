import { describe, expect, it } from 'vitest';
import { computeStoichiometry, referenceMmol } from './stoichiometry';
import type { Species } from './api';

const sp = (formula: string, mw: number, role: Species['role']): Species => ({
  role,
  smiles: '',
  mol_formula: formula,
  mol_weight: mw,
});

describe('referenceMmol', () => {
  it('divides mass by molecular weight', () => {
    expect(referenceMmol(100, 60.05)).toBeCloseTo(1.665, 3);
  });
  it('is zero for zero MW', () => {
    expect(referenceMmol(100, 0)).toBe(0);
  });
});

describe('computeStoichiometry', () => {
  // Esterification: acetic acid (ref) + ethanol -> ethyl acetate + water.
  const reactants = [
    { species: sp('C2H4O2', 60.05, 'reactant'), equiv: 1 },
    { species: sp('C2H6O', 46.07, 'reactant'), equiv: 1 },
  ];
  const products = [sp('C4H8O2', 88.11, 'product'), sp('H2O', 18.02, 'product')];

  it('sets the reference mmol from the first reactant', () => {
    const rows = computeStoichiometry(reactants, products, 100);
    const ref = rows.find((r) => r.isReference)!;
    expect(ref.mmol).toBeCloseTo(1.665, 3);
    expect(ref.massMg).toBeCloseTo(100, 1);
    expect(ref.equiv).toBeNull();
  });

  it('scales other reactants by equivalents', () => {
    const rows = computeStoichiometry(
      [reactants[0], { species: reactants[1].species, equiv: 2 }],
      products,
      100,
    );
    const ethanol = rows[1];
    expect(ethanol.mmol).toBeCloseTo(3.33, 2); // 2 equiv
    expect(ethanol.massMg).toBeCloseTo(3.33 * 46.07, 0);
  });

  it('computes product mass as 100% theoretical yield (1:1)', () => {
    const rows = computeStoichiometry(reactants, products, 100);
    const ester = rows.find((r) => r.formula === 'C4H8O2')!;
    expect(ester.role).toBe('product');
    expect(ester.mmol).toBeCloseTo(1.665, 3);
    expect(ester.massMg).toBeCloseTo(1.665 * 88.11, 0);
  });

  it('emits a row per species', () => {
    const rows = computeStoichiometry(reactants, products, 100);
    expect(rows).toHaveLength(4);
  });
});
