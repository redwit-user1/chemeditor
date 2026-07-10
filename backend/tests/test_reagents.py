"""Reagent inventory tests."""

from fastapi.testclient import TestClient

from app.main import app
from app.reagents.inventory import (
    REAGENTS,
    search_by_substructure,
    search_by_text,
)

client = TestClient(app)


def test_inventory_loaded():
    assert len(REAGENTS) > 20
    # Every reagent has a computed formula and weight.
    assert all(r.mol_formula and r.mol_weight > 0 for r in REAGENTS)


def test_search_by_name():
    hits = search_by_text("pyridine")
    assert any(r.name == "Pyridine" for r in hits)


def test_search_by_cas():
    hits = search_by_text("110-86-1")
    assert len(hits) == 1
    assert hits[0].name == "Pyridine"


def test_search_by_substructure_finds_aromatics():
    hits = search_by_substructure("c1ccccc1")
    names = {r.name for r in hits}
    assert {"Toluene", "Aniline", "Phenol"}.issubset(names)


def test_api_reagents_by_name():
    body = client.get("/api/reagents", params={"q": "THF"}).json()
    assert body["ok"] is True
    assert any(r["name"] == "THF" for r in body["reagents"])


def test_api_reagents_by_structure():
    body = client.get(
        "/api/reagents", params={"structure": "c1ccncc1"}
    ).json()
    assert body["ok"] is True
    assert any(r["name"] == "Pyridine" for r in body["reagents"])


def test_api_reagents_empty_query():
    body = client.get("/api/reagents", params={"q": ""}).json()
    assert body["ok"] is True
    assert body["count"] == 0
