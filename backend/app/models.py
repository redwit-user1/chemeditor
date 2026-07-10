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
