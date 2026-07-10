"""Scaled backend equivalence — the crux, stress-tested at real size.

The small parametrized suite in test_search_equivalence.py proves the contract
on curated cases. This suite proves it does not break at scale: it indexes a
large deterministic library and asserts PortableFPBackend returns *exactly* the
brute-force RDKit result set for hundreds of real queries drawn from the data
itself. If the fingerprint screening ever dropped a true hit, this would catch
it.
"""

from __future__ import annotations

import pytest

from app.search.portable_fp import PortableFPBackend
from app.search.reference import BruteForceBackend
from scripts.synthetic import generate

# A few hundred molecules is enough to exercise the screening broadly while
# keeping the brute-force reference fast.
LIBRARY = generate(600)


@pytest.fixture(scope="module")
def backends():
    portable = PortableFPBackend()
    reference = BruteForceBackend()
    for comp in LIBRARY:
        portable.add_component(comp)
        reference.add_component(comp)
    portable.build()
    reference.build()
    return portable, reference


# Draw query structures from the library itself + common substructures, so
# most queries return non-trivial result sets.
SUBSTRUCTURE_QUERIES = [
    "c1ccccc1",
    "c1ccncc1",
    "C(=O)O",
    "C(=O)N",
    "S(=O)(=O)N",
    "OC(F)(F)F",
    "c1ccc(Cl)cc1",
    "N(C)C",
    "C#N",
    "C1CCCCC1",
]

SIMILARITY_QUERIES = [
    ("Cc1ccc(C(=O)O)cc1", 0.3),
    ("Clc1ccc(N(C)C)cc1", 0.4),
    ("N#Cc1ccccc1C(=O)N", 0.35),
    ("O=S(=O)(N)c1ccccc1", 0.3),
    ("FC(F)(F)Oc1ccc(C)cc1", 0.4),
]


def _regids(hits) -> set[str]:
    return {h.regid for h in hits}


@pytest.mark.parametrize("query", SUBSTRUCTURE_QUERIES)
def test_substructure_equivalence_at_scale(backends, query):
    portable, reference = backends
    got = _regids(portable.substructure_search(query))
    ref = _regids(reference.substructure_search(query))
    # No false negatives (screening lossless) AND no false positives.
    assert got == ref, (
        f"substructure({query}): "
        f"missing={ref - got} extra={got - ref} (ref size={len(ref)})"
    )


@pytest.mark.parametrize("query,threshold", SIMILARITY_QUERIES)
def test_similarity_equivalence_at_scale(backends, query, threshold):
    portable, reference = backends
    got = {h.regid: round(h.score, 6) for h in portable.similarity_search(query, threshold)}
    ref = {h.regid: round(h.score, 6) for h in reference.similarity_search(query, threshold)}
    assert got == ref, (
        f"similarity({query}, {threshold}): "
        f"missing={set(ref) - set(got)} extra={set(got) - set(ref)}"
    )


def test_exact_equivalence_samples_every_10th(backends):
    # Exact-search each of a sample of indexed molecules; must find itself.
    portable, reference = backends
    for comp in LIBRARY[::10]:
        got = _regids(portable.exact_search(comp.smiles))
        ref = _regids(reference.exact_search(comp.smiles))
        assert got == ref, f"exact({comp.smiles}) diverged"
        assert comp.regid in got


def test_substructure_screening_is_lossless_vs_bruteforce(backends):
    # Aggregate check: across all substructure queries, PortableFP must never
    # miss a hit the brute-force reference found.
    portable, reference = backends
    for query in SUBSTRUCTURE_QUERIES:
        ref = _regids(reference.substructure_search(query))
        got = _regids(portable.substructure_search(query))
        assert ref.issubset(got), f"{query}: screening dropped {ref - got}"
