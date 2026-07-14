"""Incremental live indexing for PortableFPBackend (online registration).

The registration endpoint adds one component to an already-built index via
``add_and_index``. That row must be indistinguishable from a start-up-loaded
one: a single-INSERT incremental add and a full rebuild must return the *same*
result set. If they diverged, live-registered compounds would search
differently from bulk-loaded ones and the equivalence guarantee would crack.
"""

from __future__ import annotations

from app.search.backend import Component
from app.search.portable_fp import PortableFPBackend

# Three unrelated structures + one query substructure shared by two of them.
_BENZENE = Component("R1", "M1", 1, "c1ccccc1", "C6H6", 78.11)
_PHENOL = Component("R2", "M2", 1, "Oc1ccccc1", "C6H6O", 94.11)
_ETHANOL = Component("R3", "M3", 1, "CCO", "C2H6O", 46.07)
_ANILINE = Component("R4", "M4", 1, "Nc1ccccc1", "C6H7N", 93.13)


def _built(components: list[Component]) -> PortableFPBackend:
    backend = PortableFPBackend()
    for comp in components:
        backend.add_component(comp)
    backend.build()
    return backend


def test_add_and_index_makes_compound_immediately_searchable():
    backend = _built([_BENZENE, _ETHANOL])
    # Aniline not present yet.
    assert {h.regid for h in backend.substructure_search("c1ccccc1")} == {"R1"}

    ok = backend.add_and_index(_ANILINE)
    assert ok is True

    hits = {h.regid for h in backend.substructure_search("c1ccccc1")}
    assert hits == {"R1", "R4"}  # aniline now matches benzene substructure


def test_incremental_add_matches_full_rebuild_substructure():
    all_comps = [_BENZENE, _PHENOL, _ETHANOL, _ANILINE]
    full = _built(all_comps)

    incremental = _built([_BENZENE, _PHENOL])
    incremental.add_and_index(_ETHANOL)
    incremental.add_and_index(_ANILINE)

    q = "c1ccccc1"
    assert {h.regid for h in incremental.substructure_search(q)} == {
        h.regid for h in full.substructure_search(q)
    }


def test_incremental_add_matches_full_rebuild_exact_and_similarity():
    all_comps = [_BENZENE, _PHENOL, _ETHANOL, _ANILINE]
    full = _built(all_comps)
    incremental = _built([_BENZENE])
    for comp in (_PHENOL, _ETHANOL, _ANILINE):
        incremental.add_and_index(comp)

    assert {h.regid for h in incremental.exact_search("Oc1ccccc1")} == {
        h.regid for h in full.exact_search("Oc1ccccc1")
    }

    inc_sim = [
        (h.regid, round(h.score or 0.0, 6))
        for h in incremental.similarity_search("c1ccccc1", 0.1)
    ]
    full_sim = [
        (h.regid, round(h.score or 0.0, 6))
        for h in full.similarity_search("c1ccccc1", 0.1)
    ]
    assert inc_sim == full_sim


def test_add_and_index_rejects_unparseable_without_raising():
    backend = _built([_BENZENE])
    ok = backend.add_and_index(Component("BAD", "MX", 1, "not_a_smiles", "", 0.0))
    assert ok is False
    # The bad row must not have entered the index.
    assert {h.regid for h in backend.substructure_search("c1ccccc1")} == {"R1"}
