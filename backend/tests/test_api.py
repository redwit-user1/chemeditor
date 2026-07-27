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


# ---------- /chem/stoich/usage (LIMS reagent-usage flow) ----------

def _usage(entries):
    resp = client.post("/api/v1/chem/stoich/usage", json={"entries": entries})
    assert resp.status_code == 200
    return resp.json()


def test_stoich_usage_amide_coupling():
    body = _usage([
        {"key": "acid", "name": "benzoic acid",
         "smiles": "OC(=O)c1ccccc1", "amount": 610.6, "unit": "mg"},
        {"key": "amine", "name": "benzylamine",
         "smiles": "NCc1ccccc1", "amount": 590.0, "unit": "mg"},
        {"key": "dcm", "name": "DCM", "amount": 25.0,
         "unit": "mL", "role": "solvent"},
        {"key": "prod", "name": "N-benzylbenzamide",
         "smiles": "O=C(NCc1ccccc1)c1ccccc1",
         "amount": 887.0, "unit": "mg", "role": "product"},
    ])
    assert body["ok"] is True
    assert body["limiting_key"] == "acid"
    assert abs(body["limiting_mmol"] - 5.0) < 0.01
    assert abs(body["yield_pct"] - 83.97) < 0.5
    rows = {r["key"]: r for r in body["rows"]}
    assert rows["acid"]["is_limiting"] is True
    assert abs(rows["amine"]["equiv"] - 1.10) < 0.01
    # the solvent has no density on file -> stated reason, not a blank
    assert rows["dcm"]["ok"] is False
    assert rows["dcm"]["reason_code"] == "missing_density"
    assert rows["dcm"]["reason"]


def test_stoich_usage_unit_ccd_codes_from_lims():
    """Goono's UNIT_CCD vocabulary (G/MG/ML/L/MOL) must all be accepted."""
    body = _usage([
        {"key": "g", "mol_wt": 100.0, "amount": 1.0, "unit": "G"},
        {"key": "mg", "mol_wt": 100.0, "amount": 1000.0, "unit": "MG"},
        {"key": "mol", "mol_wt": 100.0, "amount": 0.01, "unit": "MOL"},
        {"key": "ml", "mol_wt": 100.0, "amount": 1.0, "unit": "ML",
         "density": 1.0},
        {"key": "l", "mol_wt": 100.0, "amount": 0.001, "unit": "L",
         "density": 1.0},
    ])
    for row in body["rows"]:
        assert row["ok"] is True, row
        assert abs(row["mmol"] - 10.0) < 1e-9


def test_stoich_usage_ea_unit_is_rejected_with_a_reason():
    """'EA' is a countable unit — it has no mass or mole meaning."""
    row = _usage([{"key": "a", "mol_wt": 100.0, "amount": 2.0, "unit": "EA"}])["rows"][0]
    assert row["ok"] is False
    assert row["reason_code"] == "unknown_unit"


def test_stoich_usage_rdkit_failure_is_surfaced_and_counted():
    body = _usage([{"key": "a", "smiles": "not~smiles",
                    "amount": 1.0, "unit": "g"}])
    assert body["n_rdkit_failures"] == 1
    assert body["rows"][0]["reason_code"] == "smiles_parse_failed"


def test_stoich_usage_empty_entries():
    body = _usage([])
    assert body["ok"] is True
    assert body["rows"] == []
    assert body["limiting_key"] is None


def test_stoich_usage_does_not_disturb_the_note_table_endpoint():
    """The two stoich endpoints are independent contracts."""
    resp = client.post("/api/v1/chem/stoich", json={"rows": [
        {"role": "reactant", "name": "A", "fw": 100.0,
         "is_limiting": True, "given": "mass", "mass_g": 1.0},
    ]})
    assert resp.json()["ok"] is True
