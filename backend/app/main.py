"""FastAPI application — /api/v1 per SPEC §5.

Every search response carries ``elapsed_ms`` and ``backend`` so the benchmark
measures the production code path, not a parallel fast path. The active search
backend is selected with ``CHEM_SEARCH_BACKEND`` (default ``portable_fp`` — the
Oracle-portable implementation whose numbers go into the feasibility report).
"""

from __future__ import annotations

import os
import time

from fastapi import FastAPI, Query, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

from .chem.properties import properties_from_text
from .chem.reaction import parse_reaction
from .models import (
    CompoundRegisterRequest,
    CompoundRegisterResponse,
    CompoundResponse,
    ComponentPayload,
    ContainerPayload,
    ConvertRequest,
    ConvertResponse,
    InventoryResponse,
    InventoryStructureRequest,
    PropertiesResponse,
    ReactionRequest,
    ReactionResponse,
    SdfImportResponse,
    SdfExportRequest,
    SearchHit,
    SearchRequest,
    SearchResponse,
    SpeciesPayload,
    StoichRequest,
    StoichResponse,
    StoichRowOut,
    StoichUsageRequest,
    StoichUsageResponse,
    StoichUsageRowOut,
    StructureRequest,
)
from .reagents.containers import (
    Container,
    search_containers,
    search_containers_by_structure,
)
from .search.backend import Component
from .search.service import build_index

app = FastAPI(
    title="KMEDIhub ELN PoC API",
    version="0.2.0",
    description="Open-source (RDKit) replacement for the ChemDraw SDK chemistry engine.",
)

# CORS whitelist. In production Goono proxies every call, so the browser only
# ever reaches this service through the Vite dev server or the Goono origin —
# never directly. The allowed origins are driven by CHEM_ALLOWED_ORIGINS
# (comma-separated); when unset we default to the Vite dev server (5173) and
# Goono (8080). Set CHEM_ALLOWED_ORIGINS to the real Goono origin(s) in prod.
_DEFAULT_ALLOWED_ORIGINS = (
    "http://localhost:5173,http://localhost:8080,http://127.0.0.1:8080"
)


def parse_allowed_origins(raw: str | None) -> list[str]:
    """Parse the comma-separated CHEM_ALLOWED_ORIGINS value into a clean list.

    Blanks and surrounding whitespace are dropped; an unset/empty value falls
    back to the Vite-dev + Goono default. We never return ``["*"]`` — an empty
    whitelist would silently disable CORS protection, so the default is used
    instead.
    """
    if raw is None or not raw.strip():
        raw = _DEFAULT_ALLOWED_ORIGINS
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


ALLOWED_ORIGINS = parse_allowed_origins(os.environ.get("CHEM_ALLOWED_ORIGINS"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

V1 = "/api/v1"

# Build the chemical-search index once at import/startup.
_SEARCH_BACKEND, _INDEX_SIZE, _INDEX_SOURCE, _COMPOUND_STORE = build_index()


@app.get(f"{V1}/health")
@app.get("/api/health")  # legacy alias
def health() -> dict:
    return {
        "status": "ok",
        "index_size": _INDEX_SIZE,
        "index_source": _INDEX_SOURCE,
        "search_backend": _SEARCH_BACKEND.name,
    }


# ---------- chem ----------

@app.post(f"{V1}/chem/properties", response_model=PropertiesResponse)
def chem_properties(request: StructureRequest) -> PropertiesResponse:
    """Core endpoint: structure text in → RDKit formula/weights out.

    Parse failures come back as ``ok=false`` with the reason — never a 500,
    never a silently swallowed RDKit ``None``.
    """
    start = time.perf_counter()
    result = properties_from_text(request.text)
    elapsed = (time.perf_counter() - start) * 1000.0
    if not result.ok or result.properties is None:
        return PropertiesResponse(
            ok=False,
            input_format=result.input_format,
            sanitized=False,
            elapsed_ms=round(elapsed, 2),
            error=result.error,
        )
    p = result.properties
    return PropertiesResponse(
        ok=True,
        input_format=result.input_format,
        formula=p.mol_formula,
        mol_weight=p.mol_weight,
        exact_mass=p.exact_mol_weight,
        heavy_atoms=p.num_heavy_atoms,
        num_rings=p.num_rings,
        num_h_donors=p.num_h_donors,
        num_h_acceptors=p.num_h_acceptors,
        tpsa=p.tpsa,
        logp=p.logp,
        sanitized=True,  # strict sanitize path; no silent fallback exists
        elapsed_ms=round(elapsed, 2),
    )


@app.post(f"{V1}/chem/convert", response_model=ConvertResponse)
def chem_convert(request: ConvertRequest) -> ConvertResponse:
    """Format conversion: MOL ↔ SMILES ↔ InChI ↔ InChIKey."""
    from .chem.convert import ConvertError, convert

    try:
        return ConvertResponse(
            ok=True, output=convert(request.input, request.from_, request.to)
        )
    except ConvertError as exc:
        return ConvertResponse(ok=False, error=str(exc))


@app.post(f"{V1}/chem/stoich", response_model=StoichResponse)
def chem_stoich(request: StoichRequest) -> StoichResponse:
    """Stoichiometry table: directional pure-function math (chem/stoich.py).

    Rows declare which quantity is *given* (mass / eq / volume); everything
    else is derived from the limiting reactant — the direction matters (see
    the module docstring: the foundation's printed eq 1.000 only reproduces
    when eq is the input).
    """
    from .chem.stoich import StoichRow, compute_stoichiometry

    try:
        rows = [
            StoichRow(
                role=r.role,
                name=r.name or r.formula,
                formula=r.formula,
                fw=r.fw or None,
                is_limiting=r.is_limiting,
                given=r.given if r.role != "solvent" else None,
                mass_g=r.mass_g,
                eq=r.eq,
                volume_ml=r.volume_ml,
                density=r.density,
                molarity=r.molarity,
                coeff=r.coeff,
                actual_mass_g=r.actual_mass_g,
                purity=r.purity,
            )
            for r in request.rows
        ]
        result = compute_stoichiometry(rows, temperature_c=request.temperature_c)
    except (ValueError, TypeError) as exc:
        return StoichResponse(ok=False, error=str(exc))

    out = []
    for rin, rout in zip(request.rows, result.rows):
        out.append(
            StoichRowOut(
                rxn_id=rin.rxn_id,
                role=rout.role,
                name=rout.name,
                formula=rout.formula,
                fw=rout.fw or 0.0,
                is_limiting=rout.is_limiting,
                given=rin.given,
                mass_g=rout.mass_g,
                eq=rout.eq,
                volume_ml=rout.volume_ml,
                density=rout.density,
                molarity=rout.molarity,
                coeff=rout.coeff,
                actual_mass_g=rout.actual_mass_g,
                purity=rout.purity,
                mmol=rout.mmol,
                theo_mass_g=rout.theo_mass_g,
                theo_mol_mmol=rout.theo_mol_mmol,
                actual_mol_mmol=rout.actual_mol_mmol,
                yield_pct=rout.yield_pct,
            )
        )
    return StoichResponse(
        ok=True,
        rows=out,
        reaction_molarity=result.reaction.get("molarity"),
        temperature_c=result.reaction.get("temperature_c"),
    )


@app.post(f"{V1}/chem/stoich/usage", response_model=StoichUsageResponse)
def chem_stoich_usage(request: StoichUsageRequest) -> StoichUsageResponse:
    """Stoichiometry over a LIMS reagent-usage list (Goono ELN).

    Distinct from ``/chem/stoich``, which serves the synthesis-note table and
    is all-or-nothing. Goono feeds this endpoint what the LIMS actually holds —
    ``DELTA_AMOUNT`` + ``UNIT_CCD`` joined to a nullable ``MOL_WT`` — so rows
    are routinely incomplete and the table must render anyway. Every row that
    cannot be converted comes back ``ok=False`` with a ``reason_code`` the UI
    renders in the cell; the remaining rows still compute.

    Goono treats an unreachable chem service as a fallback signal and computes
    locally, so this endpoint never needs to degrade — it either answers or is
    not reached at all.
    """
    from .chem.stoich_usage import UsageEntry, compute_usage_stoichiometry

    entries = [
        UsageEntry(
            key=e.key,
            name=e.name,
            role=e.role,
            mol_wt=e.mol_wt,
            smiles=e.smiles,
            amount=e.amount,
            unit=e.unit,
            density=e.density,
            purity=e.purity,
            equiv=e.equiv,
            coeff=e.coeff,
        )
        for e in request.entries
    ]
    result = compute_usage_stoichiometry(entries)

    return StoichUsageResponse(
        ok=True,
        rows=[StoichUsageRowOut(**vars(r)) for r in result.rows],
        limiting_key=result.limiting_key,
        limiting_name=result.limiting_name,
        limiting_mmol=result.limiting_mmol,
        product_key=result.product_key,
        theoretical_mmol=result.theoretical_mmol,
        theoretical_mass_g=result.theoretical_mass_g,
        yield_pct=result.yield_pct,
        warnings=result.warnings,
        n_rdkit_failures=result.n_rdkit_failures,
    )


@app.post(f"{V1}/chem/reaction", response_model=ReactionResponse)
def chem_reaction(request: ReactionRequest) -> ReactionResponse:
    """Break a reaction into species with RDKit weights (feeds the stoich table)."""
    result = parse_reaction(request.reaction)
    return ReactionResponse(
        ok=result.ok,
        reactants=[SpeciesPayload(**vars(s)) for s in result.reactants],
        products=[SpeciesPayload(**vars(s)) for s in result.products],
        error=result.error,
    )


# ---------- search ----------

def _run_search(query_type: str, fn, request: SearchRequest) -> SearchResponse:
    from .chem.parsing import parse_structure

    # NB: do NOT strip() the raw text before parsing — a V2000 molblock's first
    # line is a blank molecule-name line; stripping it shifts the counts line
    # and the parse fails (same bug class as the SDF reader).
    text = request.text
    if not text.strip():
        return SearchResponse(
            ok=False, backend=_SEARCH_BACKEND.name, query_type=query_type,
            count=0, error="empty query",
        )
    # Accept molblock or SMILES; backends take SMILES.
    parsed = parse_structure(text)
    if not parsed.ok:
        return SearchResponse(
            ok=True, backend=_SEARCH_BACKEND.name, query_type=query_type,
            count=0, error=None,
        )
    from rdkit import Chem

    smiles = Chem.MolToSmiles(parsed.mol)
    start = time.perf_counter()
    try:
        hits = fn(smiles)
    except Exception as exc:  # never leak a stack trace to the UI
        return SearchResponse(
            ok=False, backend=_SEARCH_BACKEND.name, query_type=query_type,
            count=0, error=str(exc),
        )
    elapsed = (time.perf_counter() - start) * 1000.0
    hits = hits[: request.limit]

    def _hit_smiles(h) -> str | None:
        # Thumbnail lookup from the compound store — keeps the search layer
        # (equivalence-gated) untouched.
        for comp in _COMPOUND_STORE.get(h.regid, []):
            if comp.comp_index == h.matched_component:
                return comp.smiles
        return None

    return SearchResponse(
        ok=True,
        backend=_SEARCH_BACKEND.name,
        query_type=query_type,
        count=len(hits),
        hits=[
            SearchHit(
                reg_id=h.regid,
                mixture_id=h.mixture_id,
                mol_formula=h.mol_formula,
                mol_weight=h.mol_weight,
                score=h.score,
                matched_component=h.matched_component,
                smiles=_hit_smiles(h),
            )
            for h in hits
        ],
        elapsed_ms=round(elapsed, 2),
        candidate_count=(
            getattr(_SEARCH_BACKEND, "last_candidate_count", None)
            if query_type == "substructure"
            else None
        ),
    )


@app.post(f"{V1}/search/substructure", response_model=SearchResponse)
def search_substructure(request: SearchRequest) -> SearchResponse:
    return _run_search(
        "substructure", _SEARCH_BACKEND.substructure_search, request
    )


@app.post(f"{V1}/search/exact", response_model=SearchResponse)
def search_exact(request: SearchRequest) -> SearchResponse:
    return _run_search("exact", _SEARCH_BACKEND.exact_search, request)


@app.post(f"{V1}/search/similarity", response_model=SearchResponse)
def search_similarity(request: SearchRequest) -> SearchResponse:
    return _run_search(
        "similarity",
        lambda smiles: _SEARCH_BACKEND.similarity_search(smiles, request.threshold),
        request,
    )


# ---------- depiction (structure thumbnails, SPEC §6 M6 result grid) ----------

from functools import lru_cache


@lru_cache(maxsize=4096)
def _depict_svg(smiles: str, width: int, height: int) -> str | None:
    from rdkit import Chem
    from rdkit.Chem.Draw import rdMolDraw2D

    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None
    drawer = rdMolDraw2D.MolDraw2DSVG(width, height)
    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    return drawer.GetDrawingText()


@app.get(f"{V1}/depict")
def depict(
    smiles: str = Query(...),
    w: int = Query(140, ge=32, le=600),
    h: int = Query(100, ge=32, le=600),
):
    """2D structure depiction as SVG (search-result thumbnails)."""
    svg = _depict_svg(smiles, w, h)
    if svg is None:
        return PlainTextResponse("bad structure", status_code=422)
    return PlainTextResponse(svg, media_type="image/svg+xml")


# ---------- compounds ----------

@app.post(f"{V1}/compounds", response_model=CompoundRegisterResponse)
def register_compound(
    request: CompoundRegisterRequest, response: Response
) -> CompoundRegisterResponse:
    """Register a compound into the LIVE search index (no restart needed).

    Parses ``structure`` (molblock or SMILES), computes properties, adds the
    component to the live backend via the incremental ``add_and_index`` path,
    and records it in the compound store so ``GET /compounds/{reg_id}`` and
    search thumbnails see it immediately.

    Error shape follows the rest of the surface — ``ok=false`` + ``error`` in
    the body. A duplicate ``reg_id`` additionally sets HTTP 409 (the depict
    endpoint sets 422 the same way); a parse failure stays HTTP 200 with
    ``ok=false`` and never a 500, never a swallowed RDKit ``None``.
    """
    from rdkit import Chem

    from .chem.parsing import parse_structure
    from .chem.properties import compute_properties

    reg_id = request.reg_id.strip()
    if not reg_id:
        response.status_code = 422
        return CompoundRegisterResponse(ok=False, error="reg_id is required")

    if reg_id in _COMPOUND_STORE:
        response.status_code = 409
        return CompoundRegisterResponse(
            ok=False, reg_id=reg_id, error=f"reg_id already registered: {reg_id}"
        )

    parsed = parse_structure(request.structure)
    if not parsed.ok:
        # Parse failure is a client-data problem, not a server fault: 200 +
        # ok=false with the RDKit reason (never swallowed, per repo rule).
        return CompoundRegisterResponse(
            ok=False,
            reg_id=reg_id,
            error=parsed.error or "could not parse structure",
        )

    props = compute_properties(parsed.mol)
    smiles = Chem.MolToSmiles(parsed.mol)
    # Single-component registration: comp_index 1, mixture_id == reg_id. The
    # raw_cdx blob is accepted for provenance but never parsed (CLAUDE.md).
    component = Component(
        regid=reg_id,
        mixture_id=reg_id,
        comp_index=1,
        smiles=smiles,
        mol_formula=props.mol_formula,
        mol_weight=props.mol_weight,
    )
    indexed = _SEARCH_BACKEND.add_and_index(component)
    if not indexed:
        # add_and_index re-parses the canonical SMILES; a failure here would be
        # an internal inconsistency, surfaced rather than swallowed.
        return CompoundRegisterResponse(
            ok=False,
            reg_id=reg_id,
            error="structure parsed but could not be indexed",
        )
    _COMPOUND_STORE.setdefault(reg_id, []).append(component)

    return CompoundRegisterResponse(
        ok=True,
        reg_id=reg_id,
        formula=props.mol_formula,
        mol_wt=props.mol_weight,
        exact_mol_wt=props.exact_mol_weight,
    )


@app.get(f"{V1}/compounds/{{reg_id}}", response_model=CompoundResponse)
def get_compound(reg_id: str) -> CompoundResponse:
    comps = _COMPOUND_STORE.get(reg_id)
    if not comps:
        return CompoundResponse(ok=False, error=f"unknown reg_id: {reg_id}")
    return CompoundResponse(
        ok=True,
        reg_id=reg_id,
        mixture_id=comps[0].mixture_id,
        components=[
            ComponentPayload(
                ordinal=c.comp_index,
                smiles=c.smiles,
                mol_formula=c.mol_formula or None,
                mol_weight=c.mol_weight or None,
            )
            for c in comps
        ],
    )


# ---------- inventory ----------

def _container_payload(ct: Container) -> ContainerPayload:
    return ContainerPayload(
        internal_id=ct.internal_id,
        container_id=ct.container_id,
        location=ct.location,
        name=ct.reagent.name,
        cas=ct.reagent.cas,
        smiles=ct.reagent.smiles,
        mol_formula=ct.reagent.mol_formula,
        mol_weight=ct.reagent.mol_weight,
        amount=ct.amount,
        unit=ct.unit,
        supplier=ct.supplier,
        catalog_no=ct.catalog_no,
        cost=ct.cost,
        lot_no=ct.lot_no,
        owner=ct.owner,
    )


@app.get(f"{V1}/inventory/search", response_model=InventoryResponse)
def inventory_search(
    name: str = Query(""), cas: str = Query(""), location: str = Query("")
) -> InventoryResponse:
    try:
        hits = search_containers(name=name, cas=cas, location=location)
    except Exception as exc:
        return InventoryResponse(ok=False, count=0, error=str(exc))
    return InventoryResponse(
        ok=True, count=len(hits), containers=[_container_payload(c) for c in hits]
    )


@app.post(f"{V1}/inventory/search/structure", response_model=InventoryResponse)
def inventory_search_structure(
    request: InventoryStructureRequest,
) -> InventoryResponse:
    from .chem.parsing import parse_structure

    parsed = parse_structure(request.text)
    if not parsed.ok:
        return InventoryResponse(ok=True, count=0)
    from rdkit import Chem

    smiles = Chem.MolToSmiles(parsed.mol)
    try:
        hits = search_containers_by_structure(smiles, mode=request.mode)
    except Exception as exc:
        return InventoryResponse(ok=False, count=0, error=str(exc))
    return InventoryResponse(
        ok=True, count=len(hits), containers=[_container_payload(c) for c in hits]
    )


# ---------- sdf ----------

@app.post(f"{V1}/sdf/import", response_model=SdfImportResponse)
async def sdf_import(file: UploadFile) -> SdfImportResponse:
    """Validate an uploaded SDF against the loader (parse counts + errors).

    PoC semantics: reports what would be ingested; the live index is built at
    startup from CHEM_INDEX_SDF.
    """
    import os
    import tempfile

    from .sdf.loader import load_sdf, to_smiles

    raw = await file.read()
    with tempfile.NamedTemporaryFile(
        "wb", suffix=".sdf", delete=False
    ) as tmp:
        tmp.write(raw)
        path = tmp.name
    try:
        loaded = load_sdf(path)
        errors = [
            f"record parse failure: {regid}"
            for regid in loaded.parse_failure_regids
        ]
        ok_count = 0
        for comp in loaded.components:
            if to_smiles(comp) is not None:
                ok_count += 1
        failed = loaded.n_components - ok_count
        return SdfImportResponse(
            ok=True, imported=ok_count, failed=failed, errors=errors[:50]
        )
    except Exception as exc:
        return SdfImportResponse(ok=False, errors=[str(exc)])
    finally:
        os.unlink(path)


@app.post(f"{V1}/sdf/export", response_class=PlainTextResponse)
def sdf_export(request: SdfExportRequest) -> str:
    """Export indexed compounds back to the foundation SDF schema."""
    from rdkit import Chem

    from .sdf.loader import ComponentRecord
    from .sdf.writer import write_sdf

    records: list[ComponentRecord] = []
    for reg_id in request.reg_ids:
        for comp in _COMPOUND_STORE.get(reg_id, []):
            mol = Chem.MolFromSmiles(comp.smiles)
            if mol is None:
                continue
            records.append(
                ComponentRecord(
                    regid=comp.regid,
                    mixture_id=comp.mixture_id,
                    comp_index=comp.comp_index,
                    molblock=Chem.MolToMolBlock(mol),
                    sdf_formula=comp.mol_formula or None,
                    sdf_weight=comp.mol_weight or None,
                    raw_cdx=None,
                )
            )
    return write_sdf(records)
