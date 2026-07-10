"""Tests for the documented multi-component (embedded-structure) SDF layout."""

import os

from app.sdf.loader import load_sdf, parse_records, to_smiles

MIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "sample_mixture.sdf")


def test_embedded_structures_yield_multiple_components():
    result = load_sdf(MIXTURE)
    # One SDF record → two components (aspirin + caffeine).
    assert result.n_records == 1
    assert result.n_components == 2
    assert result.n_parse_failures == 0


def test_components_share_parent_regid_with_indices():
    result = load_sdf(MIXTURE)
    assert {c.regid for c in result.components} == {"7001"}
    assert sorted(c.comp_index for c in result.components) == [1, 2]


def test_embedded_molblocks_parse_to_expected_structures():
    result = load_sdf(MIXTURE)
    by_index = {c.comp_index: c for c in result.components}
    assert to_smiles(by_index[1]) == "CC(=O)Oc1ccccc1C(=O)O"  # aspirin
    assert by_index[1].sdf_formula == "C9H8O4"
    assert by_index[2].sdf_formula == "C8H10N4O2"  # caffeine


def test_per_component_structureaggregation_preserved_not_parsed():
    result = load_sdf(MIXTURE)
    cdx = {c.comp_index: c.raw_cdx for c in result.components}
    assert cdx[1] and cdx[2] and cdx[1] != cdx[2]  # distinct, preserved verbatim


def test_parser_keeps_embedded_molblock_blank_name_line():
    # The embedded molblock value must retain its leading blank name line, or
    # the V2000 counts line shifts and RDKit fails. Round-trip proves it parses.
    result = load_sdf(MIXTURE)
    assert all(to_smiles(c) is not None for c in result.components)


def test_parse_records_splits_on_delimiter_line():
    with open(MIXTURE) as fh:
        records = parse_records(fh.read())
    assert len(records) == 1
    # The embedded structure fields are captured as multi-line values.
    struct_fields = [
        v for t, v in records[0].fields if "STRUCTURE" in t and "\n" in v
    ]
    assert len(struct_fields) == 2
