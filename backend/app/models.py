"""Pydantic request/response models for the /api/v1 surface (SPEC §5)."""

from __future__ import annotations

from pydantic import BaseModel, Field, model_validator


# ---------- chem/properties ----------

class StructureRequest(BaseModel):
    """A text structure to analyse. SPEC names the field ``molblock``; the
    paste path also sends SMILES, so ``structure`` is accepted as an alias."""

    molblock: str | None = None
    structure: str | None = None

    @model_validator(mode="after")
    def _one_of(self) -> "StructureRequest":
        if not (self.molblock or self.structure):
            raise ValueError("either 'molblock' or 'structure' is required")
        return self

    @property
    def text(self) -> str:
        return self.molblock or self.structure or ""


class PropertiesResponse(BaseModel):
    ok: bool
    input_format: str
    formula: str | None = None
    mol_weight: float | None = None
    exact_mass: float | None = None
    heavy_atoms: int | None = None
    num_rings: int | None = None
    num_h_donors: int | None = None
    num_h_acceptors: int | None = None
    tpsa: float | None = None
    logp: float | None = None
    sanitized: bool = False
    elapsed_ms: float = 0.0
    error: str | None = None


# ---------- chem/convert ----------

class ConvertRequest(BaseModel):
    input: str
    from_: str = Field(..., alias="from_", description="'mol'|'smiles'|'inchi'")
    to: str = Field(..., description="'mol'|'smiles'|'inchi'|'inchikey'")

    model_config = {"populate_by_name": True}


class ConvertResponse(BaseModel):
    ok: bool
    output: str | None = None
    error: str | None = None


# ---------- chem/stoich ----------

class StoichRowIn(BaseModel):
    rxn_id: str = ""
    role: str = "reactant"  # 'reactant' | 'product' | 'solvent'
    name: str = ""
    formula: str = ""
    fw: float = 0.0
    is_limiting: bool = False
    given: str = "mass"  # 'mass' | 'eq' | 'volume'
    mass_g: float | None = None
    eq: float | None = None
    volume_ml: float | None = None
    density: float | None = None
    molarity: float | None = None
    coeff: float = 1.0
    actual_mass_g: float | None = None
    purity: float | None = None


class StoichRowOut(StoichRowIn):
    mmol: float | None = None
    theo_mass_g: float | None = None
    theo_mol_mmol: float | None = None
    actual_mol_mmol: float | None = None
    yield_pct: float | None = None


class StoichRequest(BaseModel):
    rows: list[StoichRowIn]
    temperature_c: float | None = None


class StoichResponse(BaseModel):
    ok: bool
    rows: list[StoichRowOut] = []
    reaction_molarity: float | None = None
    temperature_c: float | None = None
    error: str | None = None


# ---------- reaction (species extraction for the stoich table) ----------

class ReactionRequest(BaseModel):
    reaction: str = Field(..., description="MDL Rxnfile or reaction SMILES")


class SpeciesPayload(BaseModel):
    role: str
    smiles: str
    mol_formula: str
    mol_weight: float


class ReactionResponse(BaseModel):
    ok: bool
    reactants: list[SpeciesPayload] = []
    products: list[SpeciesPayload] = []
    error: str | None = None


# ---------- search ----------

class SearchRequest(BaseModel):
    molblock: str | None = None
    structure: str | None = None
    threshold: float = Field(0.7, ge=0.0, le=1.0)
    limit: int = Field(200, ge=1, le=2000)

    @property
    def text(self) -> str:
        return self.molblock or self.structure or ""


class SearchHit(BaseModel):
    reg_id: str
    mixture_id: str | None = None
    mol_formula: str | None = None
    mol_weight: float | None = None
    score: float | None = None
    matched_component: int | None = None
    smiles: str | None = None  # matched component structure (for thumbnails)


class SearchResponse(BaseModel):
    ok: bool
    backend: str
    query_type: str
    count: int
    hits: list[SearchHit] = []
    elapsed_ms: float = 0.0
    candidate_count: int | None = None  # screening candidates (substructure)
    error: str | None = None


# ---------- compounds ----------

class ComponentPayload(BaseModel):
    ordinal: int
    smiles: str
    mol_formula: str | None = None
    mol_weight: float | None = None


class CompoundResponse(BaseModel):
    ok: bool
    reg_id: str | None = None
    mixture_id: str | None = None
    components: list[ComponentPayload] = []
    error: str | None = None


class CompoundRegisterRequest(BaseModel):
    """Live compound registration (``POST /api/v1/compounds``).

    ``structure`` is a V2000 molblock or a SMILES string (same auto-detection
    as the paste/search paths). ``raw_cdx`` is the ChemDraw Base64 blob — kept
    for provenance only and never parsed (CLAUDE.md: preserve, do not decode).
    """

    reg_id: str
    structure: str
    raw_cdx: str | None = None


class CompoundRegisterResponse(BaseModel):
    ok: bool
    reg_id: str | None = None
    formula: str | None = None
    mol_wt: float | None = None
    exact_mol_wt: float | None = None
    error: str | None = None


# ---------- inventory ----------

class ContainerPayload(BaseModel):
    internal_id: int
    container_id: str
    location: str
    name: str
    cas: str
    smiles: str
    mol_formula: str
    mol_weight: float
    amount: float
    unit: str
    supplier: str
    catalog_no: str
    cost: float | None = None
    lot_no: str
    owner: str


class InventoryResponse(BaseModel):
    ok: bool
    count: int
    containers: list[ContainerPayload] = []
    error: str | None = None


class InventoryStructureRequest(BaseModel):
    molblock: str | None = None
    structure: str | None = None
    mode: str = "substructure"  # 'substructure' | 'exact'

    @property
    def text(self) -> str:
        return self.molblock or self.structure or ""


# ---------- sdf ----------

class SdfImportResponse(BaseModel):
    ok: bool
    imported: int = 0
    failed: int = 0
    errors: list[str] = []


class SdfExportRequest(BaseModel):
    reg_ids: list[str]
