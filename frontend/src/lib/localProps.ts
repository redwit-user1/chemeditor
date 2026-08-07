/**
 * In-browser fallback for the property panel, using the Indigo WASM engine that
 * ketcher-standalone already bundles.
 *
 * Why this exists
 * ---------------
 * RDKit is the engine of record for this PoC (SPEC; CLAUDE.md). Every number in
 * `reports/bench.md` and `reports/parity.md` comes from the RDKit backend, and
 * that does not change.
 *
 * But the demo the foundation actually clicks is a *static* deployment — there
 * is no `/api/v1` behind it. Measured on the deployment-shaped mirror: paste a
 * SMILES and `POST /api/v1/chem/properties` answers 501, so the panel sat at
 * "—" and the embedding Goono screen was told nothing at all. The one thing
 * this PoC exists to prove ("구조를 붙여넣는 즉시 분자식·분자량이 나온다") did
 * not happen on the deployed build.
 *
 * So: when the RDKit call cannot be made, compute the three headline values
 * locally and **say which engine produced them.** The panel, the popup, and the
 * note block all carry the source. Numbers labelled RDKit are RDKit's; numbers
 * labelled Indigo are Indigo's. Nothing is presented as something it is not.
 *
 * Indigo does not give the descriptors RDKit does (TPSA, cLogP, ring/donor/
 * acceptor counts), so those stay empty rather than being guessed at.
 */
import type { Ketcher } from 'ketcher-core';
import type { PropertiesResponse } from './api';

/** Which engine produced the numbers currently on screen. */
export type PropSource = 'rdkit' | 'indigo';

/**
 * Ask the in-browser Indigo for gross formula, molecular weight and
 * monoisotopic mass. Returns null when Indigo is unavailable or refuses the
 * structure — the caller keeps the original RDKit error in that case, because
 * "the backend is down" and "this structure is invalid" are different problems
 * and must not be collapsed into one message.
 */
export async function computeLocally(
  ketcher: Ketcher,
  molfile: string,
): Promise<PropertiesResponse | null> {
  const indigo = ketcher.indigo;
  if (!indigo || typeof indigo.calculate !== 'function') return null;

  const t0 = performance.now();
  let raw: Record<string, unknown>;
  try {
    raw = (await indigo.calculate(molfile, {
      properties: ['gross', 'molecular-weight', 'monoisotopic-mass'],
    })) as unknown as Record<string, unknown>;
  } catch {
    return null;
  }

  const formula = normaliseGross(raw['gross']);
  const molWeight = toNumber(raw['molecular-weight']);
  const exactMass = toNumber(raw['monoisotopic-mass']);
  if (!formula && molWeight == null) return null;

  return {
    ok: true,
    input_format: 'mol',
    formula,
    mol_weight: molWeight,
    exact_mass: exactMass,
    // Indigo's calculate() does not report these. Empty is honest; 0 is not.
    heavy_atoms: null,
    num_rings: null,
    num_h_donors: null,
    num_h_acceptors: null,
    tpsa: null,
    logp: null,
    sanitized: false,
    elapsed_ms: Math.round(performance.now() - t0),
    error: null,
  };
}

/**
 * Indigo returns the gross formula spaced out ("C9 H8 O4"), and for multi-
 * component structures joined with " + ". RDKit returns "C9H8O4". Strip the
 * spaces so the two engines print the same shape — a formula that changes
 * appearance depending on who computed it looks like a different answer.
 */
export function normaliseGross(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  return value
    .split('+')
    .map((part) => part.replace(/\s+/g, ''))
    .filter(Boolean)
    .join('.');
}

export function toNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : null;
}
