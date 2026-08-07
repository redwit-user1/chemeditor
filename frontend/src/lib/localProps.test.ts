import { describe, expect, it } from 'vitest';
import { normaliseGross, toNumber } from './localProps';

/**
 * The fallback engine's output has to print the same shape as RDKit's, or the
 * same molecule looks like two different answers depending on which engine
 * happened to be reachable. These are the only two places a value is
 * transformed on the way in, so they are the only two places that can lie.
 */
describe('normaliseGross', () => {
  it('strips the spaces Indigo puts between element groups', () => {
    // Indigo: "C9 H8 O4"   RDKit: "C9H8O4"
    expect(normaliseGross('C9 H8 O4')).toBe('C9H8O4');
  });

  it('keeps single-element formulas intact', () => {
    expect(normaliseGross('H2 O')).toBe('H2O');
  });

  it('joins multi-component formulas with a dot, as RDKit does', () => {
    // A salt comes back from Indigo as "C7 H6 O2 + Na"
    expect(normaliseGross('C7 H6 O2 + Na')).toBe('C7H6O2.Na');
  });

  it('returns null for empty or non-string input rather than an empty formula', () => {
    // An empty string would render as a blank formula field, which reads as
    // "computed and it is nothing" instead of "not computed".
    expect(normaliseGross('')).toBeNull();
    expect(normaliseGross('   ')).toBeNull();
    expect(normaliseGross(undefined)).toBeNull();
    expect(normaliseGross(42)).toBeNull();
  });
});

describe('toNumber', () => {
  it('accepts the numeric strings Indigo returns', () => {
    expect(toNumber('180.157')).toBeCloseTo(180.157, 3);
  });

  it('accepts real numbers unchanged', () => {
    expect(toNumber(180.157)).toBeCloseTo(180.157, 3);
  });

  it('rejects non-finite values instead of showing NaN in the panel', () => {
    expect(toNumber(Number.NaN)).toBeNull();
    expect(toNumber(Number.POSITIVE_INFINITY)).toBeNull();
    expect(toNumber('not a number')).toBeNull();
    expect(toNumber(null)).toBeNull();
  });
});
