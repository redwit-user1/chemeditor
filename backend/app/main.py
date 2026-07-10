"""FastAPI application.

The one endpoint that matters for the core thesis is ``POST /api/properties``:
text structure in → MolFormula / MolWt / ExactMolWt out, computed by RDKit.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi import Query

from .chem.properties import properties_from_text
from .chem.reaction import parse_reaction
from .models import (
    PropertiesPayload,
    PropertiesResponse,
    ReactionRequest,
    ReactionResponse,
    ReagentHit,
    ReagentResponse,
    SearchHit,
    SearchRequest,
    SearchResponse,
    SpeciesPayload,
    StructureRequest,
)
from .reagents.inventory import search_by_substructure, search_by_text
from .search.service import build_index

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


# Build the chemical-search index once at import/startup.
_SEARCH_BACKEND, _INDEX_SIZE, _INDEX_SOURCE = build_index()


@app.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "index_size": _INDEX_SIZE,
        "index_source": _INDEX_SOURCE,
        "search_backend": _SEARCH_BACKEND.name,
    }


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


@app.get("/api/reagents", response_model=ReagentResponse)
def reagents(
    q: str = Query("", description="name or CAS substring"),
    structure: str = Query("", description="optional SMILES substructure filter"),
) -> ReagentResponse:
    """Reagent inventory search by name/CAS and/or structure.

    Returns reagents the chemist can insert onto the reaction canvas.
    """
    try:
        if structure.strip():
            hits = search_by_substructure(structure)
        else:
            hits = search_by_text(q)
    except Exception as exc:
        return ReagentResponse(ok=False, count=0, error=str(exc))

    return ReagentResponse(
        ok=True,
        count=len(hits),
        reagents=[
            ReagentHit(
                name=r.name,
                cas=r.cas,
                smiles=r.smiles,
                mol_formula=r.mol_formula,
                mol_weight=r.mol_weight,
            )
            for r in hits
        ],
    )


@app.post("/api/reaction", response_model=ReactionResponse)
def reaction(request: ReactionRequest) -> ReactionResponse:
    """Break a reaction into reactant/product species with RDKit weights.

    Feeds the stoichiometry table; the UI does the equivalents/moles/yield math
    from these per-species molecular weights.
    """
    result = parse_reaction(request.reaction)
    return ReactionResponse(
        ok=result.ok,
        reactants=[SpeciesPayload(**vars(s)) for s in result.reactants],
        products=[SpeciesPayload(**vars(s)) for s in result.products],
        error=result.error,
    )


@app.post("/api/search", response_model=SearchResponse)
def search(request: SearchRequest) -> SearchResponse:
    """Chemical search over the indexed library (exact / substructure / similarity).

    Results are rolled up to the parent REGID. The active backend is the
    portable SQL implementation unless configured otherwise.
    """
    query = request.query.strip()
    if not query:
        return SearchResponse(
            ok=False,
            backend=_SEARCH_BACKEND.name,
            query_type=request.query_type,
            count=0,
            error="empty query",
        )

    try:
        if request.query_type == "exact":
            hits = _SEARCH_BACKEND.exact_search(query)
        elif request.query_type == "substructure":
            hits = _SEARCH_BACKEND.substructure_search(query)
        elif request.query_type == "similarity":
            hits = _SEARCH_BACKEND.similarity_search(query, request.threshold)
        else:
            return SearchResponse(
                ok=False,
                backend=_SEARCH_BACKEND.name,
                query_type=request.query_type,
                count=0,
                error=f"unknown query_type: {request.query_type}",
            )
    except Exception as exc:  # never leak a stack trace to the UI
        return SearchResponse(
            ok=False,
            backend=_SEARCH_BACKEND.name,
            query_type=request.query_type,
            count=0,
            error=str(exc),
        )

    return SearchResponse(
        ok=True,
        backend=_SEARCH_BACKEND.name,
        query_type=request.query_type,
        count=len(hits),
        hits=[
            SearchHit(
                regid=h.regid,
                mixture_id=h.mixture_id,
                mol_formula=h.mol_formula,
                mol_weight=h.mol_weight,
                score=h.score,
                matched_component=h.matched_component,
            )
            for h in hits
        ],
    )
