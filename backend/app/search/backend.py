"""The ``ChemSearchBackend`` contract.

Every chemical search in the system goes through this interface. Two
implementations must exist and must return the *same result sets*:

* ``PgCartridgeBackend`` — RDKit Postgres cartridge (dev/benchmark baseline)
* ``PortableFPBackend`` — standard SQL + BLOB, the implementation that ports to
  Oracle SE where the cartridge is unavailable.

If these two ever disagree, the Oracle-portability claim collapses — so the test
suite pins them to a shared brute-force RDKit reference.

Results are rolled up to the parent REGID: a mixture with several matching
components yields a single hit (the best-scoring component for similarity).
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass(frozen=True)
class Component:
    """One indexable component of a (possibly multi-component) mixture."""

    regid: str
    mixture_id: str
    comp_index: int
    smiles: str
    mol_formula: str = ""
    mol_weight: float = 0.0


@dataclass(frozen=True)
class Hit:
    """A search result, rolled up to the parent REGID."""

    regid: str
    mixture_id: str
    mol_formula: str
    mol_weight: float
    matched_component: int
    score: float | None = None  # Tanimoto for similarity; None otherwise

    def key(self) -> str:
        return self.regid


class ChemSearchBackend(ABC):
    """Common interface for all chemical search implementations."""

    name: str = "abstract"

    @abstractmethod
    def add_component(self, component: Component) -> None:
        """Register a component for indexing. Ignores unparseable structures
        (counted separately by the loader — never silently in chemistry code)."""

    @abstractmethod
    def build(self) -> None:
        """Finalize indexes after all components have been added."""

    def add_and_index(self, component: Component) -> bool:
        """Add ONE component to an already-built *live* index.

        Used for online compound registration (``POST /api/v1/compounds``),
        where the index must reflect the new structure immediately without a
        server restart. The result set after this call must be identical to
        the one a full rebuild (``add_component`` for every component +
        ``build``) would produce — the two backends' equivalence guarantee
        extends to incrementally-added rows.

        Returns ``True`` if the component was indexed, ``False`` if its
        structure was unparseable (never silently swallowed — the caller
        surfaces the failure).

        Default implementation appends and does a full ``build()``; backends
        that support single-row insertion override this to avoid rebuilding
        the whole index on every insert.
        """
        before = self._indexed_count()
        self.add_component(component)
        self.build()
        return self._indexed_count() > before

    def _indexed_count(self) -> int:
        """Number of components accepted into the index so far.

        Backs the default ``add_and_index`` parse-success check. Backends that
        track pending rows expose that count; others may override.
        """
        return len(getattr(self, "_pending", []))

    @abstractmethod
    def exact_search(self, query_smiles: str) -> list[Hit]:
        """Structures whose canonical form equals the query's."""

    @abstractmethod
    def substructure_search(self, query_smiles: str) -> list[Hit]:
        """Structures that contain the query as a substructure."""

    @abstractmethod
    def similarity_search(self, query_smiles: str, threshold: float) -> list[Hit]:
        """Structures with Tanimoto(Morgan) >= threshold, best score per REGID."""


def rollup_by_regid(hits: list[Hit]) -> list[Hit]:
    """Collapse component hits to one per REGID.

    For scored hits the highest score wins; ties and unscored hits keep the
    lowest component index for determinism. Output is sorted: by score
    descending when scored, then by REGID.
    """
    best: dict[str, Hit] = {}
    for hit in hits:
        current = best.get(hit.regid)
        if current is None or _better(hit, current):
            best[hit.regid] = hit

    scored = any(h.score is not None for h in best.values())
    if scored:
        return sorted(
            best.values(),
            key=lambda h: (-(h.score or 0.0), h.regid),
        )
    return sorted(best.values(), key=lambda h: h.regid)


def _better(candidate: Hit, current: Hit) -> bool:
    if candidate.score is not None and current.score is not None:
        if candidate.score != current.score:
            return candidate.score > current.score
        return candidate.matched_component < current.matched_component
    return candidate.matched_component < current.matched_component
