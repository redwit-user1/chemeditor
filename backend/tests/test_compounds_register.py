"""API tests for live compound registration (POST /api/v1/compounds).

Registration must make a new compound searchable and retrievable without a
server restart — the whole point of the endpoint (the index was previously
built once at startup and never updated).
"""

from __future__ import annotations

from fastapi.testclient import TestClient

from app import main
from app.main import app, parse_allowed_origins

client = TestClient(app)


def _unique_reg_id(prefix: str) -> str:
    # Keep tests independent of order and of the module-level compound store
    # by using a reg_id that no fixture and no other test registers.
    n = 0
    while f"{prefix}-{n}" in main._COMPOUND_STORE:
        n += 1
    return f"{prefix}-{n}"


def test_register_success_returns_properties():
    reg_id = _unique_reg_id("NEW-CAFFEINE")
    resp = client.post(
        "/api/v1/compounds",
        json={"reg_id": reg_id, "structure": "Cn1cnc2c1c(=O)n(C)c(=O)n2C"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["reg_id"] == reg_id
    assert body["formula"] == "C8H10N4O2"
    assert abs(body["mol_wt"] - 194.19) < 0.01
    assert abs(body["exact_mol_wt"] - 194.0804) < 0.001

    # Immediately retrievable via GET.
    got = client.get(f"/api/v1/compounds/{reg_id}").json()
    assert got["ok"] is True
    assert got["components"][0]["mol_formula"] == "C8H10N4O2"


def test_register_then_substructure_hit_without_restart():
    reg_id = _unique_reg_id("NEW-BIPHENYL")
    # Biphenyl contains a benzene ring; register it, then find it via search
    # against the SAME live app instance (no restart).
    resp = client.post(
        "/api/v1/compounds",
        json={"reg_id": reg_id, "structure": "c1ccccc1-c1ccccc1"},
    )
    assert resp.json()["ok"] is True

    hits = client.post(
        "/api/v1/search/substructure",
        json={"structure": "c1ccccc1", "limit": 2000},
    ).json()
    regids = {h["reg_id"] for h in hits["hits"]}
    assert reg_id in regids
    # Thumbnail SMILES must resolve from the store for the freshly added row.
    new_hit = next(h for h in hits["hits"] if h["reg_id"] == reg_id)
    assert new_hit["smiles"]


def test_register_duplicate_reg_id_is_409():
    reg_id = _unique_reg_id("NEW-DUP")
    first = client.post(
        "/api/v1/compounds", json={"reg_id": reg_id, "structure": "CCO"}
    )
    assert first.status_code == 200 and first.json()["ok"] is True

    dup = client.post(
        "/api/v1/compounds", json={"reg_id": reg_id, "structure": "CCO"}
    )
    assert dup.status_code == 409
    body = dup.json()
    assert body["ok"] is False
    assert reg_id in body["error"]


def test_register_parse_failure_is_ok_false_not_500():
    reg_id = _unique_reg_id("NEW-BAD")
    resp = client.post(
        "/api/v1/compounds",
        json={"reg_id": reg_id, "structure": "!!!not a structure!!!"},
    )
    assert resp.status_code == 200  # graceful, never a 500
    body = resp.json()
    assert body["ok"] is False
    assert body["error"]
    # A failed parse must not create a store entry.
    assert reg_id not in main._COMPOUND_STORE
    assert client.get(f"/api/v1/compounds/{reg_id}").json()["ok"] is False


def test_register_accepts_molblock_and_raw_cdx():
    from rdkit import Chem

    reg_id = _unique_reg_id("NEW-MOLBLOCK")
    molblock = Chem.MolToMolBlock(Chem.MolFromSmiles("c1ccccc1O"))
    resp = client.post(
        "/api/v1/compounds",
        json={
            "reg_id": reg_id,
            "structure": molblock,
            "raw_cdx": "VmpEQzEyLjA=",  # ignored (never parsed), just accepted
        },
    )
    body = resp.json()
    assert body["ok"] is True
    assert body["formula"] == "C6H6O"


# ---------- CORS whitelist parsing ----------

def test_cors_default_when_unset():
    origins = parse_allowed_origins(None)
    assert origins == [
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ]


def test_cors_default_when_blank():
    assert parse_allowed_origins("   ") == parse_allowed_origins(None)


def test_cors_parses_and_trims_whitelist():
    origins = parse_allowed_origins(
        " https://eln.goono.io , https://lims.example.org ,"
    )
    assert origins == ["https://eln.goono.io", "https://lims.example.org"]
    assert "*" not in origins


def test_cors_middleware_uses_whitelist_not_wildcard():
    # The running app must not be wide-open; the default whitelist is applied.
    assert "*" not in main.ALLOWED_ORIGINS
    assert "http://localhost:5173" in main.ALLOWED_ORIGINS
