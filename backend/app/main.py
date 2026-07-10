"""FastAPI application.

The one endpoint that matters for the core thesis is ``POST /api/properties``:
text structure in → MolFormula / MolWt / ExactMolWt out, computed by RDKit.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .chem.properties import properties_from_text
from .models import (
    PropertiesPayload,
    PropertiesResponse,
    StructureRequest,
)

app = FastAPI(
    title="KMEDIhub ELN PoC API",
    version="0.1.0",
    description="Open-source (RDKit) replacement for the ChemDraw SDK property engine.",
)

# The Vite dev server runs on a different origin; allow it in the PoC.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/properties", response_model=PropertiesResponse)
def properties(request: StructureRequest) -> PropertiesResponse:
    """Compute molecular properties for a pasted / drawn structure.

    Never raises on bad input — a parse failure comes back as ``ok=false`` with
    an explanatory ``error`` so the UI can show it instead of a stack trace.
    """
    result = properties_from_text(request.structure)
    payload = (
        PropertiesPayload(**result.properties.as_dict())
        if result.properties is not None
        else None
    )
    return PropertiesResponse(
        ok=result.ok,
        input_format=result.input_format,
        properties=payload,
        error=result.error,
    )
