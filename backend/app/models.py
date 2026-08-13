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


class DepictRequest(StructureRequest):
    """A structure to render as SVG, plus the thumbnail box to render it into.

    Separate from the GET form because that one takes SMILES only, and the
    callers that need this (the Goono LIMS compound table) hold molblocks.
    """

    w: int = Field(140, ge=32, le=600)
    h: int = Field(100, ge=32, le=600)


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


# ---------- chem/stoich/usage (LIMS reagent-usage flow) ----------
#
# Separate from StoichRow* above on purpose. Those model the synthesis-note
# table, where the chemist supplies a complete row and a bad row is an error.
# These model what Goono's LIMS actually recorded (DELTA_AMOUNT + UNIT_CCD +
# a possibly-null MOL_WT), where incomplete rows are normal and must still
# render — so the response is per-row tolerant instead of all-or-nothing.

class StoichUsageEntryIn(BaseModel):
    key: str = ""                    # caller correlation id (LIMS txn id)
    name: str = ""
    role: str = "reactant"           # reactant|limiting|reagent|solvent|product
    mol_wt: float | None = None
    smiles: str = ""
    amount: float | None = None
    unit: str = ""                   # g|mg|kg|mol|mmol|mL|L
    density: float | None = None     # g/mL
    purity: float | None = None
    equiv: float | None = None
    coeff: float = 1.0


class StoichUsageRowOut(BaseModel):
    key: str = ""
    name: str = ""
    role: str = "reactant"
    ok: bool = False
    reason_code: str | None = None
    reason: str | None = None
    is_limiting: bool = False
    mol_wt: float | None = None
    mol_wt_source: str = ""
    unit: str = ""
    amount: float | None = None
    mass_g: float | None = None
    effective_mass_g: float | None = None
    volume_ml: float | None = None
    density: float | None = None
    purity: float | None = None
    coeff: float = 1.0
    mmol: float | None = None
    equiv: float | None = None
    theoretical_mmol: float | None = None
    theoretical_mass_g: float | None = None
    yield_pct: float | None = None


class StoichUsageRequest(BaseModel):
    entries: list[StoichUsageEntryIn] = []


class StoichUsageResponse(BaseModel):
    ok: bool = True
    rows: list[StoichUsageRowOut] = []
    limiting_key: str | None = None
    limiting_name: str | None = None
    limiting_mmol: float | None = None
    product_key: str | None = None
    theoretical_mmol: float | None = None
    theoretical_mass_g: float | None = None
    yield_pct: float | None = None
    warnings: list[str] = []
    n_rdkit_failures: int = 0
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
    # 화살표 위 시약(커플링 시약·염기·촉매·용매). 반응물도 생성물도 아니지만
    # 합성 노트에는 반드시 남아야 하는 종이다.
    agents: list[SpeciesPayload] = []
    input_format: str | None = None  # 'smiles' | 'rxnblock'
    # RXN 블록에는 agent 자리가 없다(V2000·V3000 모두). 빈 목록이 "안 그렸다"인지
    # "포맷이 못 담는다"인지 호출자가 구분할 수 있어야 한다.
    agents_unsupported_in_format: bool = False
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
