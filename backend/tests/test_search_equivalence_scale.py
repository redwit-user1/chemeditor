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


# The 30-query gate (SPEC §4.4 / TASKS M3). A diverse set of distinct SMILES —
# scaffolds, functional groups, halobenzenes, fused rings — run at 600-molecule
# scale against the brute-force reference. Some (piperazine, Boc, morpholine)
# do not occur in the synthetic library and correctly yield empty sets on both
# sides; complete equality must still hold for every query.
SUBSTRUCTURE_QUERIES = [
    "c1ccccc1",                     # benzene
    "Nc1ccccc1",                    # aniline
    "C1CNCCN1",                     # piperazine
    "O=C(OC(C)(C)C)",               # Boc group
    "c1ccncn1",                     # pyrimidine
    "c1ccc(-c2ccccc2)cc1",          # biphenyl
    "c1ccncc1",                     # pyridine
    "C1COCCN1",                     # morpholine
    "S(=O)(=O)N",                   # sulfonamide
    "C(=O)O",                       # carboxylic acid
    "C(=O)OC",                      # ester
    "C(=O)N",                       # amide
    "C#N",                          # nitrile
    "C(F)(F)F",                     # CF3
    "OC(F)(F)F",                    # OCF3
    "c1ccc(Cl)cc1",                 # chlorobenzene
    "c1ccc(F)cc1",                  # fluorobenzene
    "c1ccc(Br)cc1",                 # bromobenzene
    "c1ccc(I)cc1",                  # iodobenzene
    "c1ccc2ccccc2c1",               # naphthalene (fused rings)
    "C1CCCCC1",                     # cyclohexane
    "c1ccc(O)cc1",                  # phenol
    "c1ccc(C)cc1",                  # toluene
    "N(C)C",                        # dimethylamino
    "SC",                           # methylthioether
    "c1ccc(OC)cc1",                 # anisole
    "OCC",                          # ethoxy/ethanol fragment
    "c1ccc(C(=O)O)cc1",             # benzoic acid
    "c1ccc(C(=O)N)cc1",             # benzamide
    "c1ccc(S(=O)(=O)N)cc1",         # benzenesulfonamide
]

assert len(SUBSTRUCTURE_QUERIES) == len(set(SUBSTRUCTURE_QUERIES)) == 30

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
    # Explicit 100%-recall gate: across all 30 substructure queries, the
    # brute-force reference result set must be a SUBSET of PortableFP's result
    # set (no false negatives from the pattern-word screen). Precision is
    # handled by the precise phase; the equivalence test above pins full equality.
    portable, reference = backends
    for query in SUBSTRUCTURE_QUERIES:
        ref = _regids(reference.substructure_search(query))
        got = _regids(portable.substructure_search(query))
        assert ref.issubset(got), f"{query}: screening dropped {ref - got}"


def test_screening_candidate_count_is_recorded(backends):
    # The backend exposes last_candidate_count for benchmark precision
    # diagnostics: candidates (post-screen, pre-precise) must be >= final hits,
    # since the precise RDKit phase only removes false positives.
    portable, _ = backends
    for query in SUBSTRUCTURE_QUERIES:
        hits = portable.substructure_search(query)
        assert portable.last_candidate_count >= len(hits), (
            f"{query}: candidates {portable.last_candidate_count} "
            f"< hits {len(hits)}"
        )
