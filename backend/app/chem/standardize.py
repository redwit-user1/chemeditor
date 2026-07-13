"""Structure standardization pipeline — SPEC §3.3.

Pipeline (RDKit ``rdMolStandardize``):

1. ``Cleanup``          — valence / aromaticity normalization (always)
2. ``FragmentParent``   — salt stripping, keep the parent fragment (opt-in)
3. ``Uncharger``        — neutralize charges (on by default)
4. ``TautomerEnumerator.Canonicalize`` — canonical tautomer (opt-in; slow)

.. warning::

   **Salt stripping changes molecular weight.** ``fragment_parent=True``
   removes counterions, so MW / formula computed *after* standardization will
   not match the original SDF record. Parity comparisons against the
   foundation's data must use **pre-standardization** values; standardized
   structures are for **search indexing only**. Mixing the two makes the
   parity report lie (SPEC §3.3).
"""

from __future__ import annotations

from rdkit import Chem
from rdkit import RDLogger
from rdkit.Chem.MolStandardize import rdMolStandardize

# Same policy as parsing.py: we surface errors explicitly, so silence RDKit's
# stderr chatter.
RDLogger.DisableLog("rdApp.*")


class StandardizeError(ValueError):
    """A structure could not be parsed or standardized.

    Always carries a human-readable reason — a ``None`` from RDKit is never
    silently swallowed.
    """


def standardize(
    mol: Chem.Mol,
    *,
    fragment_parent: bool = False,
    uncharge: bool = True,
    tautomer: bool = False,
) -> Chem.Mol:
    """Run the SPEC §3.3 standardization pipeline on an RDKit mol.

    Returns a new mol; the input is not modified. See the module docstring:
    the result is for search indexing only, never for parity comparison.

    :param fragment_parent: strip salts / counterions, keeping the parent
        fragment (``rdMolStandardize.FragmentParent``). **Changes MW.**
    :param uncharge: neutralize formal charges (``Uncharger``). On by default.
    :param tautomer: map to the canonical tautomer
        (``TautomerEnumerator.Canonicalize``). Off by default — it is slow,
        enable it only when building the search index.
    :raises StandardizeError: if ``mol`` is ``None`` or any pipeline stage
        fails or returns ``None``.
    """
    if mol is None:
        raise StandardizeError("cannot standardize: mol is None (parse failed?)")

    try:
        out = rdMolStandardize.Cleanup(mol)
        if out is not None and fragment_parent:
            out = rdMolStandardize.FragmentParent(out)
        if out is not None and uncharge:
            out = rdMolStandardize.Uncharger().uncharge(out)
        if out is not None and tautomer:
            out = rdMolStandardize.TautomerEnumerator().Canonicalize(out)
    except Exception as exc:  # RDKit raises on unfixable valence problems etc.
        raise StandardizeError(f"standardization failed: {exc}") from exc

    if out is None:
        raise StandardizeError("standardization pipeline returned None")
    return out


def standardize_smiles(
    smiles: str,
    *,
    fragment_parent: bool = False,
    uncharge: bool = True,
    tautomer: bool = False,
) -> str:
    """Parse SMILES, standardize, and return canonical SMILES.

    Convenience wrapper over :func:`standardize` for the search-indexing path.
    Same warning applies: the output is an **index key**, not a registration
    structure — MW/formula parity must be checked on the un-standardized input.

    :raises StandardizeError: on SMILES parse failure or pipeline failure.
    """
    if smiles is None or smiles.strip() == "":
        raise StandardizeError("empty SMILES input")

    try:
        mol = Chem.MolFromSmiles(smiles.strip())
    except Exception as exc:
        raise StandardizeError(f"RDKit failed to parse SMILES: {exc}") from exc
    if mol is None:
        raise StandardizeError(f"RDKit could not parse SMILES: {smiles!r}")

    out = standardize(
        mol,
        fragment_parent=fragment_parent,
        uncharge=uncharge,
        tautomer=tautomer,
    )
    return Chem.MolToSmiles(out)
