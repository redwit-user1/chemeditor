/**
 * Client for the RDKit-backed /api/v1 (SPEC §5).
 *
 * The property panel deliberately does NOT use Ketcher's in-browser Indigo for
 * its numbers — the PoC must prove the *RDKit* stack computes them. Every value
 * shown comes from this backend, and search responses carry the backend name +
 * server-side elapsed_ms so the UI can display the real code-path latency.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';
const V1 = `${API_BASE}/api/v1`;

async function post<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${V1}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return (await res.json()) as T;
}

// ---------- chem/properties ----------

export interface PropertiesResponse {
  ok: boolean;
  input_format: string;
  formula: string | null;
  mol_weight: number | null;
  exact_mass: number | null;
  heavy_atoms: number | null;
  num_rings: number | null;
  num_h_donors: number | null;
  num_h_acceptors: number | null;
  tpsa: number | null;
  logp: number | null;
  sanitized: boolean;
  elapsed_ms: number;
  error: string | null;
}

export function fetchProperties(
  structure: string,
  signal?: AbortSignal,
): Promise<PropertiesResponse> {
  return post<PropertiesResponse>('/chem/properties', { structure }, signal);
}

// ---------- search ----------

export type QueryType = 'exact' | 'substructure' | 'similarity';

export interface SearchHit {
  reg_id: string;
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
  elapsed_ms: number;
  candidate_count: number | null;
  error: string | null;
}

export function searchStructures(
  structure: string,
  queryType: QueryType,
  threshold = 0.7,
): Promise<SearchResponse> {
  return post<SearchResponse>(`/search/${queryType}`, { structure, threshold });
}

// ---------- stoichiometry (server-side pure math — chem/stoich.py) ----------

export interface StoichRowIn {
  rxn_id?: string;
  role: 'reactant' | 'product' | 'solvent';
  name?: string;
  formula?: string;
  fw?: number;
  is_limiting?: boolean;
  given?: 'mass' | 'eq' | 'volume';
  mass_g?: number | null;
  eq?: number | null;
  volume_ml?: number | null;
  density?: number | null;
  molarity?: number | null;
  coeff?: number;
  actual_mass_g?: number | null;
  purity?: number | null;
}

export interface StoichRowOut extends StoichRowIn {
  mmol: number | null;
  theo_mass_g: number | null;
  theo_mol_mmol: number | null;
  actual_mol_mmol: number | null;
  yield_pct: number | null;
}

export interface StoichResponse {
  ok: boolean;
  rows: StoichRowOut[];
  reaction_molarity: number | null;
  temperature_c: number | null;
  error: string | null;
}

export function computeStoich(
  rows: StoichRowIn[],
  temperatureC?: number,
): Promise<StoichResponse> {
  return post<StoichResponse>('/chem/stoich', {
    rows,
    temperature_c: temperatureC ?? null,
  });
}

// ---------- reaction species extraction ----------

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

export function parseReaction(reaction: string): Promise<ReactionResponse> {
  return post<ReactionResponse>('/chem/reaction', { reaction });
}

// ---------- inventory (container level) ----------

export interface ContainerHit {
  internal_id: number;
  container_id: string;
  location: string;
  name: string;
  cas: string;
  smiles: string;
  mol_formula: string;
  mol_weight: number;
  amount: number;
  unit: string;
  supplier: string;
  catalog_no: string;
  cost: number | null;
  lot_no: string;
  owner: string;
}

export interface InventoryResponse {
  ok: boolean;
  count: number;
  containers: ContainerHit[];
  error: string | null;
}

export async function searchInventory(params: {
  name?: string;
  cas?: string;
  location?: string;
}): Promise<InventoryResponse> {
  const qs = new URLSearchParams();
  if (params.name) qs.set('name', params.name);
  if (params.cas) qs.set('cas', params.cas);
  if (params.location) qs.set('location', params.location);
  const res = await fetch(`${V1}/inventory/search?${qs.toString()}`);
  if (!res.ok) throw new Error(`inventory search returned ${res.status}`);
  return (await res.json()) as InventoryResponse;
}

export function searchInventoryByStructure(
  structure: string,
  mode: 'substructure' | 'exact',
): Promise<InventoryResponse> {
  return post<InventoryResponse>('/inventory/search/structure', {
    structure,
    mode,
  });
}

// ---------- health ----------

export interface HealthResponse {
  status: string;
  index_size: number;
  index_source: string;
  search_backend: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${V1}/health`);
  return (await res.json()) as HealthResponse;
}
