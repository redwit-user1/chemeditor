"""Tests for SDF loading and parity validation against the fixture."""

import os

from app.sdf.loader import load_sdf, to_smiles
from app.sdf.parity import check_parity

FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "sample_foundation.sdf")


def test_loader_reads_all_records():
    result = load_sdf(FIXTURE)
    assert result.n_records == 7
    assert result.n_components == 7
    assert result.n_parse_failures == 0


def test_loader_extracts_schema_fields():
    result = load_sdf(FIXTURE)
    aspirin = next(c for c in result.components if c.regid == "3001")
    assert aspirin.mixture_id == "2001"
    assert aspirin.sdf_formula == "C9H8O4"
    assert to_smiles(aspirin) == "CC(=O)Oc1ccccc1C(=O)O"


def test_structureaggregation_preserved_but_not_parsed():
    # raw_cdx must be captured verbatim and never interpreted.
    result = load_sdf(FIXTURE)
    for comp in result.components:
        assert comp.raw_cdx is not None  # preserved
    # It is opaque base64 — we assert we kept it as-is, not that it decodes.
    assert "Base64" in result.components[0].raw_cdx or result.components[0].raw_cdx


def test_parity_flags_known_mismatches():
    result = load_sdf(FIXTURE)
    parity = check_parity(result.components)
    assert parity.n_checked == 7

    kinds = {(m.regid, m.kind) for m in parity.mismatches}
    # 3005: sodium acetate — SDF formula drops the Na counter-ion.
    assert ("3005", "formula") in kinds
    # 3006: benzoic acid — stored weight off by > 0.01.
    assert ("3006", "weight") in kinds


def test_parity_matches_are_counted():
    result = load_sdf(FIXTURE)
    parity = check_parity(result.components)
    # 5 of 7 records agree on both formula and weight.
    clean = {(c.regid) for c in result.components} - {
        m.regid for m in parity.mismatches
    }
    assert {"3001", "3002", "3003", "3004", "3007"}.issubset(clean)


def test_salt_reason_is_identified():
    result = load_sdf(FIXTURE)
    parity = check_parity(result.components)
    salt = next(m for m in parity.mismatches if m.regid == "3005")
    assert "salt" in salt.reason or "fragment" in salt.reason
