/**
 * Split a molecular formula into text/number segments for subscript rendering.
 * Pure (returns data, not JSX) so it is unit-testable; PropertyBar maps the
 * segments to <sub> / <span>.
 */
export interface FormulaSegment {
  text: string;
  isNumber: boolean;
}

export function splitFormula(formula: string): FormulaSegment[] {
  return formula
    .split(/(\d+)/)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, isNumber: /^\d+$/.test(part) }));
}
