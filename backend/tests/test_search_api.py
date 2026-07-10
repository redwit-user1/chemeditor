"""API-level tests for /api/v1/search/* and /compounds (SPEC §5)."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_substructure_search_shape_and_hits():
    resp = client.post(
        "/api/v1/search/substructure", json={"structure": "c1ccccc1"}
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["backend"] == "portable_fp"
    assert body["elapsed_ms"] >= 0
    assert body["candidate_count"] is not None  # screening precision diagnostic
    regids = {h["reg_id"] for h in body["hits"]}
    # Aspirin (3001), benzene (3003), benzoic acid (3006) contain benzene.
    assert {"3001", "3003", "3006"}.issubset(regids)


def test_exact_search():
    body = client.post(
        "/api/v1/search/exact", json={"structure": "c1ccccc1"}
    ).json()
    assert body["ok"] is True
    assert "3003" in {h["reg_id"] for h in body["hits"]}


def test_similarity_search_scored_sorted():
    body = client.post(
        "/api/v1/search/similarity",
        json={"structure": "CC(=O)Oc1ccccc1C(=O)O", "threshold": 0.3},
    ).json()
    assert body["ok"] is True
    scores = [h["score"] for h in body["hits"]]
    assert scores == sorted(scores, reverse=True)
    assert all(s >= 0.3 for s in scores)


def test_limit_is_applied():
    body = client.post(
        "/api/v1/search/substructure",
        json={"structure": "c1ccccc1", "limit": 1},
    ).json()
    assert body["count"] == 1


def test_molblock_query_with_leading_blank_line():
    # Regression: the V2000 name line is blank; the endpoint must not strip it
    # (stripping shifts the counts line and the query silently returns 0 hits).
    from rdkit import Chem

    molfile = Chem.MolToMolBlock(Chem.MolFromSmiles("c1ccccc1"))
    assert molfile.startswith("\n")  # the blank name line is really there
    body = client.post(
        "/api/v1/search/substructure", json={"structure": molfile}
    ).json()
    assert body["ok"] is True
    assert {"3001", "3003", "3006"}.issubset({h["reg_id"] for h in body["hits"]})


def test_unparseable_query_is_graceful():
    body = client.post(
        "/api/v1/search/substructure", json={"structure": "!!!"}
    ).json()
    assert body["ok"] is True and body["count"] == 0


def test_compound_detail_and_unknown():
    ok = client.get("/api/v1/compounds/3001").json()
    assert ok["ok"] is True
    assert ok["components"][0]["smiles"]
    missing = client.get("/api/v1/compounds/does-not-exist").json()
    assert missing["ok"] is False


def test_sdf_export_round_trips_regid():
    text = client.post(
        "/api/v1/sdf/export", json={"reg_ids": ["3001", "3003"]}
    ).text
    assert "VW_MIXTURE_REGNUMBER.REGID" in text
    assert "3001" in text and "3003" in text and "$$$$" in text


def test_sdf_import_reports_counts():
    import os

    fixture = os.path.join(
        os.path.dirname(__file__), "fixtures", "sample_foundation.sdf"
    )
    with open(fixture, "rb") as fh:
        resp = client.post(
            "/api/v1/sdf/import", files={"file": ("sample.sdf", fh, "text/plain")}
        )
    body = resp.json()
    assert body["ok"] is True
    assert body["imported"] == 7 and body["failed"] == 0


def test_depict_returns_svg():
    resp = client.get("/api/v1/depict", params={"smiles": "c1ccccc1O"})
    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("image/svg+xml")
    assert "<svg" in resp.text


def test_depict_bad_structure_422():
    assert client.get("/api/v1/depict", params={"smiles": "!!!"}).status_code == 422


def test_search_hits_carry_smiles_for_thumbnails():
    body = client.post(
        "/api/v1/search/substructure", json={"structure": "c1ccccc1"}
    ).json()
    assert all(h["smiles"] for h in body["hits"])
