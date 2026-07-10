"""Backend equivalence — the test that guards the Oracle-portability claim.

Every search backend must return the *same* rolled-up result set as the
brute-force RDKit reference. ``PortableFPBackend`` (SQLite here, Oracle in
production) runs unconditionally. ``PgCartridgeBackend`` joins the same
parametrization when a Postgres+cartridge DSN is provided via ``PG_DSN``.
"""

from __future__ import annotations

import os

import pytest

from app.search.backend import ChemSearchBackend, Component
from app.search.portable_fp import PortableFPBackend
from app.search.reference import BruteForceBackend

# A small library with multi-component mixtures, shared scaffolds (benzene,
# pyridine) for substructure hits, and near-duplicates for similarity.
DATASET: list[Component] = [
    Component("R1", "M1", 1, "c1ccccc1", "C6H6", 78.11),            # benzene
    Component("R1", "M1", 2, "CCO", "C2H6O", 46.07),               # + ethanol
    Component("R2", "M2", 1, "c1ccccc1C", "C7H8", 92.14),          # toluene
    Component("R3", "M3", 1, "c1ccccc1O", "C6H6O", 94.11),         # phenol
    Component("R4", "M4", 1, "c1ccncc1", "C5H5N", 79.10),          # pyridine
    Component("R5", "M5", 1, "CC(=O)Oc1ccccc1C(=O)O", "C9H8O4", 180.16),  # aspirin
    Component("R6", "M6", 1, "CC(=O)Oc1ccccc1C(=O)OC", "C10H10O4", 194.18),  # aspirin methyl ester
    Component("R7", "M7", 1, "CCCCCC", "C6H14", 86.18),            # hexane
    Component("R8", "M8", 1, "c1ccccc1N", "C6H7N", 93.13),         # aniline
    Component("R8", "M8", 2, "c1ccccc1", "C6H6", 78.11),           # + benzene (dup scaffold)
]


def make_backend(factory) -> ChemSearchBackend:
    backend = factory()
    for comp in DATASET:
        backend.add_component(comp)
    backend.build()
    return backend


@pytest.fixture(scope="module")
def reference() -> ChemSearchBackend:
    return make_backend(BruteForceBackend)


def _backends_under_test():
    factories = [("portable_fp", PortableFPBackend)]
    dsn = os.environ.get("PG_DSN")
    if dsn:
        from app.search.pg_cartridge import PgCartridgeBackend

        factories.append(("pg_cartridge", lambda: PgCartridgeBackend(dsn)))
    return factories


BACKENDS = _backends_under_test()


def regid_set(hits) -> set[str]:
    return {h.regid for h in hits}


def scored(hits) -> dict[str, float]:
    return {h.regid: round(h.score, 6) for h in hits}


EXACT_QUERIES = ["c1ccccc1", "CCO", "c1ccncc1", "CC(=O)Oc1ccccc1C(=O)O"]
SUBSTRUCTURE_QUERIES = ["c1ccccc1", "c1ccncc1", "C=O", "c1ccccc1O", "CCCCCC"]
SIMILARITY_QUERIES = [
    ("CC(=O)Oc1ccccc1C(=O)O", 0.3),
    ("c1ccccc1", 0.2),
    ("c1ccccc1N", 0.5),
]


@pytest.mark.parametrize("bname,factory", BACKENDS, ids=[b[0] for b in BACKENDS])
@pytest.mark.parametrize("query", EXACT_QUERIES)
def test_exact_matches_reference(reference, bname, factory, query):
    backend = make_backend(factory)
    assert regid_set(backend.exact_search(query)) == regid_set(
        reference.exact_search(query)
    ), f"{bname} exact({query}) diverged"


@pytest.mark.parametrize("bname,factory", BACKENDS, ids=[b[0] for b in BACKENDS])
@pytest.mark.parametrize("query", SUBSTRUCTURE_QUERIES)
def test_substructure_matches_reference(reference, bname, factory, query):
    backend = make_backend(factory)
    assert regid_set(backend.substructure_search(query)) == regid_set(
        reference.substructure_search(query)
    ), f"{bname} substructure({query}) diverged"


@pytest.mark.parametrize("bname,factory", BACKENDS, ids=[b[0] for b in BACKENDS])
@pytest.mark.parametrize("query,threshold", SIMILARITY_QUERIES)
def test_similarity_matches_reference(reference, bname, factory, query, threshold):
    backend = make_backend(factory)
    got = backend.similarity_search(query, threshold)
    ref = reference.similarity_search(query, threshold)
    # Same members and the same Tanimoto scores.
    assert scored(got) == scored(ref), f"{bname} similarity({query}) diverged"
    # Rolled-up ordering must be by descending score.
    scores = [h.score for h in got]
    assert scores == sorted(scores, reverse=True)


def test_substructure_screening_is_not_lossy():
    # The pattern-fingerprint screen must never drop a true substructure match:
    # benzene is a substructure of toluene, phenol, aspirin, aniline, benzene.
    backend = make_backend(PortableFPBackend)
    hits = regid_set(backend.substructure_search("c1ccccc1"))
    assert {"R1", "R2", "R3", "R5", "R6", "R8"}.issubset(hits)


def test_rollup_collapses_mixture_components():
    # R1 and R8 each contain benzene in one component — one hit apiece, no dupes.
    backend = make_backend(PortableFPBackend)
    hits = backend.substructure_search("c1ccccc1")
    regids = [h.regid for h in hits]
    assert len(regids) == len(set(regids))


def test_signed_word_bitwise_and_preserves_containment():
    # The pat_00..pat_31 columns are SIGNED 64-bit integers. Words with the top
    # bit set become negative under int.from_bytes(..., signed=True). This test
    # verifies two's-complement bitwise AND still computes bit-containment — the
    # exact predicate the SQL screening uses: (pat_i & :qi) = :qi.
    from rdkit import Chem

    from app.chem.fingerprint import PATTERN_WORD_COUNT, pattern_words

    # Explicit two's-complement check on hand-picked signed words.
    all_bits = int.from_bytes(b"\xff" * 8, "big", signed=True)   # -1
    top_bit = int.from_bytes(b"\x80" + b"\x00" * 7, "big", signed=True)
    assert all_bits == -1 and top_bit < 0
    assert (all_bits & top_bit) == top_bit  # containment under signed AND

    sub = Chem.MolFromSmiles("c1ccccc1")        # benzene
    sup = Chem.MolFromSmiles("c1ccc(O)cc1")     # phenol ⊇ benzene
    other = Chem.MolFromSmiles("CCCCCC")        # hexane ⊉ benzene
    qw = pattern_words(sub)
    tw = pattern_words(sup)
    ow = pattern_words(other)

    assert len(qw) == PATTERN_WORD_COUNT == 32
    # The signed path is actually exercised (some word has the high bit set).
    assert any(w < 0 for w in qw + tw)

    # Containment: benzene's words ⊆ phenol's words under signed AND.
    for q, t in zip(qw, tw):
        if q != 0:
            assert (t & q) == q
    # Non-containment: at least one benzene word is NOT carried by hexane, so
    # the screen correctly rejects it.
    assert any(q != 0 and (o & q) != q for q, o in zip(qw, ow))
