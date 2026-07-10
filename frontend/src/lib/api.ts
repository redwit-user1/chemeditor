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

export type QueryType = 'exact' | 'substructure' | 'similarity';

export interface SearchHit {
  regid: string;
  mixture_id: string | null;
  mol_formula: string | null;
  mol_weight: number | null;
  score: number | null;
  matched_component: number | null;
}

export interface SearchResponse {
  ok: boolean;
  backend: string;
  query_type: string;
  count: number;
  hits: SearchHit[];
  error: string | null;
}

export async function searchStructures(
  query: string,
  queryType: QueryType,
  threshold = 0.7,
): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, query_type: queryType, threshold }),
  });
  if (!res.ok) {
    throw new Error(`Search API returned ${res.status}`);
  }
  return (await res.json()) as SearchResponse;
}

export interface Reagent {
  name: string;
  cas: string;
  smiles: string;
  mol_formula: string;
  mol_weight: number;
}

export interface ReagentResponse {
  ok: boolean;
  count: number;
  reagents: Reagent[];
  error: string | null;
}

export async function searchReagents(
  q: string,
  structure = '',
): Promise<ReagentResponse> {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (structure) params.set('structure', structure);
  const res = await fetch(`${API_BASE}/api/reagents?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Reagent API returned ${res.status}`);
  }
  return (await res.json()) as ReagentResponse;
}

export interface Species {
  role: 'reactant' | 'product';
  smiles: string;
  mol_formula: string;
  mol_weight: number;
}

export interface ReactionResponse {
  ok: boolean;
  reactants: Species[];
  products: Species[];
  error: string | null;
}

export async function parseReaction(reaction: string): Promise<ReactionResponse> {
  const res = await fetch(`${API_BASE}/api/reaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reaction }),
  });
  if (!res.ok) {
    throw new Error(`Reaction API returned ${res.status}`);
  }
  return (await res.json()) as ReactionResponse;
}

export interface HealthResponse {
  status: string;
  index_size: number;
  index_source: string;
  search_backend: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/api/health`);
  return (await res.json()) as HealthResponse;
}
