"""Reagent inventory tests — master search + /api/v1/inventory endpoints."""

from fastapi.testclient import TestClient

from app.main import app
from app.reagents.inventory import (
    REAGENTS,
    search_by_substructure,
    search_by_text,
)

client = TestClient(app)


def test_inventory_master_loaded():
    assert len(REAGENTS) > 20
    assert all(r.mol_formula and r.mol_weight > 0 for r in REAGENTS)


def test_master_search_by_name_and_cas():
    assert any(r.name == "Pyridine" for r in search_by_text("pyridine"))
    hits = search_by_text("110-86-1")
    assert len(hits) == 1 and hits[0].name == "Pyridine"


def test_master_search_by_substructure():
    names = {r.name for r in search_by_substructure("c1ccccc1")}
    assert {"Toluene", "Aniline", "Phenol"}.issubset(names)


def test_api_inventory_search_by_name():
    body = client.get("/api/v1/inventory/search", params={"name": "THF"}).json()
    assert body["ok"] is True and body["count"] >= 1
    ct = body["containers"][0]
    # SPEC §6.4 result columns must all be present.
    for key in ("internal_id", "container_id", "location", "name", "cas",
                "cost", "amount", "unit", "supplier"):
        assert key in ct
    assert ct["name"] == "THF"


def test_api_inventory_search_by_location():
    body = client.get(
        "/api/v1/inventory/search", params={"location": "Stock Room 3"}
    ).json()
    assert body["ok"] is True and body["count"] >= 1
    assert all("Stock Room 3" in c["location"] for c in body["containers"])


def test_api_inventory_structure_search():
    body = client.post(
        "/api/v1/inventory/search/structure",
        json={"structure": "c1ccncc1", "mode": "substructure"},
    ).json()
    assert body["ok"] is True
    assert any(c["name"] == "Pyridine" for c in body["containers"])


def test_api_inventory_exact_structure_search():
    body = client.post(
        "/api/v1/inventory/search/structure",
        json={"structure": "c1ccncc1", "mode": "exact"},
    ).json()
    assert body["ok"] is True
    assert all(c["name"] == "Pyridine" for c in body["containers"])


def test_api_inventory_empty_query():
    body = client.get("/api/v1/inventory/search").json()
    assert body["ok"] is True and body["count"] == 0
