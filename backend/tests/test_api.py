"""API-level tests for the /api/v1 chem endpoints (SPEC §5)."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    body = client.get("/api/v1/health").json()
    assert body["status"] == "ok"
    assert body["search_backend"] == "portable_fp"
    assert body["index_size"] >= 7


def test_properties_smiles():
    resp = client.post("/api/v1/chem/properties", json={"structure": "c1ccccc1"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["input_format"] == "smiles"
    assert body["formula"] == "C6H6"
    assert abs(body["mol_weight"] - 78.11) < 0.01
    assert abs(body["exact_mass"] - 78.047) < 0.001
    assert body["heavy_atoms"] == 6
    assert body["sanitized"] is True
    assert body["elapsed_ms"] >= 0


def test_properties_accepts_molblock_key():
    # SPEC names the field 'molblock'; SMILES text through it still parses.
    resp = client.post("/api/v1/chem/properties", json={"molblock": "CCO"})
    assert resp.json()["formula"] == "C2H6O"


def test_properties_bad_input_returns_ok_false():
    resp = client.post(
        "/api/v1/chem/properties", json={"structure": "!!!nonsense!!!"}
    )
    assert resp.status_code == 200  # graceful, not a 500
    body = resp.json()
    assert body["ok"] is False
    assert body["formula"] is None
    assert body["sanitized"] is False
    assert body["error"]


def test_convert_smiles_to_inchikey():
    resp = client.post(
        "/api/v1/chem/convert",
        json={"input": "c1ccccc1", "from_": "smiles", "to": "inchikey"},
    )
    body = resp.json()
    assert body["ok"] is True
    assert body["output"] == "UHOVQNZJYSORNB-UHFFFAOYSA-N"


def test_convert_bad_input():
    resp = client.post(
        "/api/v1/chem/convert",
        json={"input": "garbage!!!", "from_": "smiles", "to": "inchi"},
    )
    body = resp.json()
    assert body["ok"] is False and body["error"]


def test_stoich_validated_synthesis_note_case():
    """The foundation's real note: eq-driven anhydride, every digit printed."""
    resp = client.post(
        "/api/v1/chem/stoich",
        json={
            "temperature_c": 80,
            "rows": [
                {"role": "reactant", "name": "pyrocatechol", "formula": "C6H6O2",
                 "fw": 110.112, "is_limiting": True, "given": "mass", "mass_g": 0.5},
                {"role": "reactant", "name": "acetic anhydride", "formula": "C4H6O3",
                 "fw": 102.089, "given": "eq", "eq": 1.0, "density": 1.082},
                {"role": "product", "name": "product", "formula": "C8H8O3",
                 "fw": 152.149, "actual_mass_g": 0.2558},
                {"role": "solvent", "name": "Acetonitrile", "volume_ml": 5},
            ],
        },
    )
    body = resp.json()
    assert body["ok"] is True, body.get("error")
    rows = body["rows"]
    assert round(rows[0]["mmol"], 2) == 4.54
    assert round(rows[1]["mass_g"], 3) == 0.464
    assert round(rows[1]["volume_ml"], 3) == 0.428
    assert round(rows[2]["theo_mass_g"], 3) == 0.691
    assert round(rows[2]["yield_pct"], 1) == 37.0
    assert round(body["reaction_molarity"], 3) == 0.908
    assert body["temperature_c"] == 80


def test_stoich_error_without_limiting():
    resp = client.post(
        "/api/v1/chem/stoich",
        json={"rows": [{"role": "reactant", "name": "x", "fw": 100,
                        "given": "mass", "mass_g": 1}]},
    )
    body = resp.json()
    assert body["ok"] is False and body["error"]


def test_reaction_species():
    resp = client.post(
        "/api/v1/chem/reaction", json={"reaction": "CC(=O)O.OCC>>CC(=O)OCC.O"}
    )
    body = resp.json()
    assert body["ok"] is True
    assert [s["mol_formula"] for s in body["reactants"]] == ["C2H4O2", "C2H6O"]
