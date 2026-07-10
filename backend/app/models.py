"""Pydantic request/response models for the API surface."""

from __future__ import annotations

from pydantic import BaseModel, Field


class StructureRequest(BaseModel):
    """A text structure (SMILES or MDL molfile) to analyse."""

    structure: str = Field(..., description="SMILES or MDL molfile text")


class PropertiesPayload(BaseModel):
    mol_formula: str
    mol_weight: float
    exact_mol_weight: float
    num_heavy_atoms: int
    num_rings: int
    num_h_donors: int
    num_h_acceptors: int
    tpsa: float
    logp: float


class PropertiesResponse(BaseModel):
    ok: bool
    input_format: str
    properties: PropertiesPayload | None = None
    error: str | None = None


class ReactionRequest(BaseModel):
    """An Rxnfile or reaction SMILES to break into species."""

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


class SearchRequest(BaseModel):
    """A chemical search request."""

    query: str = Field(..., description="SMILES (or molfile) query structure")
    query_type: str = Field(
        "substructure",
        description="'exact' | 'substructure' | 'similarity'",
    )
    threshold: float = Field(
        0.7, ge=0.0, le=1.0, description="Tanimoto cutoff for similarity search"
    )


class SearchHit(BaseModel):
    regid: str
    mixture_id: str | None = None
    mol_formula: str | None = None
    mol_weight: float | None = None
    score: float | None = Field(
        None, description="Tanimoto similarity for similarity search; else null"
    )
    matched_component: int | None = None


class SearchResponse(BaseModel):
    ok: bool
    backend: str
    query_type: str
    count: int
    hits: list[SearchHit] = []
    error: str | None = None
