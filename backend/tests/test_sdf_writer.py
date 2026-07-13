"""Round-trip tests for the SDF writer (import → export → import, zero loss)."""

import os

from app.sdf.loader import ComponentRecord, load_sdf, to_smiles
from app.sdf.writer import write_sdf, write_sdf_file

FIXTURES = os.path.join(os.path.dirname(__file__), "fixtures")
FOUNDATION = os.path.join(FIXTURES, "sample_foundation.sdf")
MIXTURE = os.path.join(FIXTURES, "sample_mixture.sdf")


def _key(c: ComponentRecord):
    return (c.regid, c.comp_index)


def _load_text(tmp_path, text: str):
    """Write SDF text to a temp file and load it back through the reader."""
    path = os.path.join(tmp_path, "roundtrip.sdf")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
    return load_sdf(path)


def _assert_zero_loss(original, reloaded):
    orig = {_key(c): c for c in original.components}
    back = {_key(c): c for c in reloaded.components}

    # Same set of (regid, comp_index).
    assert set(orig) == set(back)
    # No new parse failures introduced by the round-trip.
    assert reloaded.n_parse_failures == original.n_parse_failures

    for key, oc in orig.items():
        bc = back[key]
        assert oc.mixture_id == bc.mixture_id
        assert oc.sdf_formula == bc.sdf_formula
        assert oc.sdf_weight == bc.sdf_weight
        # raw_cdx preserved byte-identical.
        assert oc.raw_cdx == bc.raw_cdx
        # Molblock still parses to the SAME canonical SMILES (compare SMILES,
        # not raw text).
        assert to_smiles(oc) == to_smiles(bc)
        assert to_smiles(bc) is not None


# --- GATE: flat foundation (7 records) --------------------------------------


def test_foundation_roundtrip_zero_loss(tmp_path):
    original = load_sdf(FOUNDATION)
    assert original.n_records == 7
    assert original.n_components == 7

    text = write_sdf(original.components)
    reloaded = _load_text(str(tmp_path), text)

    assert reloaded.n_records == 7
    assert reloaded.n_components == 7
    _assert_zero_loss(original, reloaded)


# --- GATE: embedded mixture (1 record, 2 components) ------------------------


def test_mixture_roundtrip_zero_loss(tmp_path):
    original = load_sdf(MIXTURE)
    assert original.n_records == 1
    assert original.n_components == 2

    text = write_sdf(original.components)
    reloaded = _load_text(str(tmp_path), text)

    # One group (regid, mixture_id) → one record with two embedded components.
    assert reloaded.n_records == 1
    assert reloaded.n_components == 2
    _assert_zero_loss(original, reloaded)


def test_mixture_emits_embedded_structure_fields():
    original = load_sdf(MIXTURE)
    text = write_sdf(original.components)
    # Multi-component group emits one embedded STRUCTURE field per component.
    assert text.count("> <VW_MIXTURE_STRUCTURE.STRUCTURE (1)>") == 1
    assert text.count("> <VW_MIXTURE_STRUCTURE.STRUCTURE (2)>") == 1
    # Records are delimited by a $$$$ line.
    assert text.rstrip().endswith("$$$$")


def test_combined_roundtrip_zero_loss(tmp_path):
    """Flat + embedded components written together survive the round-trip."""
    original_foundation = load_sdf(FOUNDATION)
    original_mixture = load_sdf(MIXTURE)
    combined = original_foundation.components + original_mixture.components

    text = write_sdf(combined)
    reloaded = _load_text(str(tmp_path), text)

    # 7 flat records + 1 mixture record.
    assert reloaded.n_records == 8
    assert reloaded.n_components == 9

    orig_by_key = {
        _key(c): c for c in combined
    }
    back_by_key = {_key(c): c for c in reloaded.components}
    assert set(orig_by_key) == set(back_by_key)
    for key, oc in orig_by_key.items():
        bc = back_by_key[key]
        assert oc.sdf_formula == bc.sdf_formula
        assert oc.sdf_weight == bc.sdf_weight
        assert oc.raw_cdx == bc.raw_cdx
        assert to_smiles(oc) == to_smiles(bc) is not None


# --- STRUCTUREAGGREGATION emission rule -------------------------------------


def test_raw_cdx_present_emits_structureaggregation():
    comp = ComponentRecord(
        regid="9001",
        mixture_id="8001",
        comp_index=1,
        molblock=load_sdf(FOUNDATION).components[0].molblock,
        sdf_formula="C9H8O4",
        sdf_weight=180.159,
        raw_cdx="VmpDMTIuMEJhc2U2NA==",
    )
    text = write_sdf([comp])
    assert "> <MIXTURES.STRUCTUREAGGREGATION>" in text
    assert "VmpDMTIuMEJhc2U2NA==" in text


def test_raw_cdx_none_emits_no_structureaggregation():
    comp = ComponentRecord(
        regid="9002",
        mixture_id="8002",
        comp_index=1,
        molblock=load_sdf(FOUNDATION).components[0].molblock,
        sdf_formula="C9H8O4",
        sdf_weight=180.159,
        raw_cdx=None,
    )
    text = write_sdf([comp])
    assert "STRUCTUREAGGREGATION" not in text


def test_raw_cdx_none_roundtrips(tmp_path):
    comp = ComponentRecord(
        regid="9002",
        mixture_id="8002",
        comp_index=1,
        molblock=load_sdf(FOUNDATION).components[0].molblock,
        sdf_formula="C9H8O4",
        sdf_weight=180.159,
        raw_cdx=None,
    )
    text = write_sdf([comp])
    reloaded = _load_text(str(tmp_path), text)
    assert reloaded.n_components == 1
    got = reloaded.components[0]
    assert got.raw_cdx is None
    assert got.regid == "9002"
    assert got.sdf_formula == "C9H8O4"
    assert got.sdf_weight == 180.159


# --- empty input ------------------------------------------------------------


def test_empty_component_list_returns_empty_string():
    assert write_sdf([]) == ""


def test_write_sdf_file_roundtrips(tmp_path):
    original = load_sdf(MIXTURE)
    path = os.path.join(str(tmp_path), "out.sdf")
    write_sdf_file(path, original.components)
    reloaded = load_sdf(path)
    _assert_zero_loss(original, reloaded)
