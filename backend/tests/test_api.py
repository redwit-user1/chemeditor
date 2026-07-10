"""API-level tests for the property endpoint."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    assert client.get("/api/health").json()["status"] == "ok"


def test_properties_smiles():
    resp = client.post("/api/properties", json={"structure": "c1ccccc1"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["input_format"] == "smiles"
    assert body["properties"]["mol_formula"] == "C6H6"
    assert abs(body["properties"]["mol_weight"] - 78.11) < 0.01


def test_properties_bad_input_returns_ok_false():
    resp = client.post("/api/properties", json={"structure": "!!!nonsense!!!"})
    assert resp.status_code == 200  # graceful, not a 500
    body = resp.json()
    assert body["ok"] is False
    assert body["properties"] is None
    assert body["error"]
