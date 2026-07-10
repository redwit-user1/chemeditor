/**
 * Client for the RDKit-backed property/search API.
 *
 * The property panel deliberately does NOT use Ketcher's in-browser Indigo for
 * its numbers — the PoC must prove the *RDKit* stack computes them. So every
 * value shown comes from this backend.
 */

export interface Properties {
  mol_formula: string;
  mol_weight: number;
  exact_mol_weight: number;
  num_heavy_atoms: number;
  num_rings: number;
  num_h_donors: number;
  num_h_acceptors: number;
  tpsa: number;
  logp: number;
}

export interface PropertiesResponse {
  ok: boolean;
  input_format: string;
  properties: Properties | null;
  error: string | null;
}

// In dev, Vite proxies /api to the FastAPI backend; in Docker they share an origin.
const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export async function fetchProperties(
  structure: string,
  signal?: AbortSignal,
): Promise<PropertiesResponse> {
  const res = await fetch(`${API_BASE}/api/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structure }),
    signal,
  });
  if (!res.ok) {
    throw new Error(`Property API returned ${res.status}`);
  }
  return (await res.json()) as PropertiesResponse;
}
