"""Container-level inventory tests (SPEC §2.2 / §6.4)."""

from app.reagents.containers import (
    CONTAINERS,
    search_containers,
    search_containers_by_structure,
)


def test_containers_built_with_full_schema():
    assert len(CONTAINERS) > 30
    ct = CONTAINERS[0]
    assert ct.container_id.startswith("C")
    assert ct.location and ct.supplier and ct.lot_no
    assert ct.amount > 0 and ct.unit in ("ml", "g")


def test_location_search_is_the_primary_pattern():
    # PRD M4-03: location-based lookup is the stockroom's core usage.
    hits = search_containers(location="Stock Room 3")
    assert hits
    assert all("stock room 3" in ct.location.lower() for ct in hits)


def test_search_by_name_and_cas():
    by_name = search_containers(name="pyridine")
    assert by_name and all("pyridine" in ct.reagent.name.lower() for ct in by_name)
    by_cas = search_containers(cas="110-86-1")
    assert by_cas and all(ct.reagent.cas == "110-86-1" for ct in by_cas)


def test_combined_filters_are_conjunctive():
    all_thf = search_containers(name="THF")
    assert all_thf
    narrowed = search_containers(name="THF", location=all_thf[0].location)
    assert narrowed and len(narrowed) <= len(all_thf)


def test_structure_search_expands_to_containers():
    hits = search_containers_by_structure("c1ccncc1", mode="substructure")
    assert hits
    assert any(ct.reagent.name == "Pyridine" for ct in hits)


def test_exact_structure_search():
    hits = search_containers_by_structure("c1ccncc1", mode="exact")
    assert hits and all(ct.reagent.name == "Pyridine" for ct in hits)


def test_empty_query_returns_nothing():
    assert search_containers() == []
