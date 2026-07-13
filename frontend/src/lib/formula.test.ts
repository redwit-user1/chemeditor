import { describe, expect, it } from 'vitest';
import { splitFormula } from './formula';

describe('splitFormula', () => {
  it('separates element letters from subscript numbers', () => {
    expect(splitFormula('C9H8O4')).toEqual([
      { text: 'C', isNumber: false },
      { text: '9', isNumber: true },
      { text: 'H', isNumber: false },
      { text: '8', isNumber: true },
      { text: 'O', isNumber: false },
      { text: '4', isNumber: true },
    ]);
  });

  it('handles single atoms without a count', () => {
    expect(splitFormula('H2O')).toEqual([
      { text: 'H', isNumber: false },
      { text: '2', isNumber: true },
      { text: 'O', isNumber: false },
    ]);
  });

  it('drops empty segments', () => {
    expect(splitFormula('C6H6').every((s) => s.text.length > 0)).toBe(true);
  });
});
