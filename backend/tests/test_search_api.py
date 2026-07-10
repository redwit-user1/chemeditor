"""API-level tests for the search endpoint (indexed over the fixture)."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_reports_index():
    body = client.get("/api/health").json()
    assert body["status"] == "ok"
    assert body["index_size"] >= 7
    assert body["search_backend"] == "portable_fp"


def test_substructure_search_finds_benzene_rings():
    resp = client.post(
        "/api/search",
        json={"query": "c1ccccc1", "query_type": "substructure"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    # Aspirin (3001), benzene (3003), benzoic acid (3006) all contain benzene.
    regids = {h["regid"] for h in body["hits"]}
    assert {"3001", "3003", "3006"}.issubset(regids)


def test_exact_search():
    resp = client.post(
        "/api/search", json={"query": "c1ccccc1", "query_type": "exact"}
    )
    body = resp.json()
    assert body["ok"] is True
    regids = {h["regid"] for h in body["hits"]}
    assert "3003" in regids  # benzene record


def test_similarity_search_scored_and_sorted():
    resp = client.post(
        "/api/search",
        json={
            "query": "CC(=O)Oc1ccccc1C(=O)O",
            "query_type": "similarity",
            "threshold": 0.3,
        },
    )
    body = resp.json()
    assert body["ok"] is True
    scores = [h["score"] for h in body["hits"]]
    assert scores == sorted(scores, reverse=True)
    assert all(s >= 0.3 for s in scores)


def test_bad_query_is_graceful():
    resp = client.post(
        "/api/search", json={"query": "!!!", "query_type": "substructure"}
    )
    assert resp.status_code == 200
    body = resp.json()
    # Unparseable query → no hits, not a 500.
    assert body["ok"] is True
    assert body["count"] == 0
