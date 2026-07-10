"""Format conversion — MOL ↔ SMILES ↔ InChI ↔ InChIKey (SPEC §3.1, TASKS M1).

Everything is RDKit; no ChemDraw SDK. Per project rule, a ``None`` from RDKit
is *never* silently swallowed: every parse or write failure raises
:class:`ConvertError` with the reason, so the ``/chem/convert`` endpoint can
surface it verbatim.
"""

from __future__ import annotations

from typing import Callable, Literal

from rdkit import Chem
from rdkit import RDLogger

# We report failures ourselves; keep RDKit's stderr chatter off (same policy
# as parsing.py).
RDLogger.DisableLog("rdApp.*")

FromFormat = Literal["mol", "smiles", "inchi"]
ToFormat = Literal["mol", "smiles", "inchi", "inchikey"]


class ConvertError(ValueError):
    """A structure could not be parsed or written in the requested format.

    Always carries a human-readable reason — callers must never see a silent
    ``None`` in place of a conversion result.
    """


# --- parsing (text → mol) -----------------------------------------------------


def _parse(input_text: str, from_: str) -> Chem.Mol:
    if input_text is None or input_text.strip() == "":
        raise ConvertError(f"empty input for format {from_!r}")

    parsers: dict[str, Callable[[str], "Chem.Mol | None"]] = {
        "mol": Chem.MolFromMolBlock,
        "smiles": lambda t: Chem.MolFromSmiles(t.strip()),
        "inchi": lambda t: Chem.MolFromInchi(t.strip()),
    }
    parser = parsers.get(from_)
    if parser is None:
        raise ConvertError(
            f"unknown input format {from_!r}; expected one of mol, smiles, inchi"
        )

    try:
        mol = parser(input_text)
    except Exception as exc:  # RDKit can raise on malformed input
        raise ConvertError(f"RDKit failed to parse {from_}: {exc}") from exc
    if mol is None:
        raise ConvertError(
            f"RDKit could not parse/sanitize the input as {from_}"
        )
    return mol


# --- writing (mol → text) -------------------------------------------------------


def _write(mol: Chem.Mol, to: str) -> str:
    writers: dict[str, Callable[[Chem.Mol], str]] = {
        "mol": Chem.MolToMolBlock,
        "smiles": Chem.MolToSmiles,
        "inchi": Chem.MolToInchi,
        "inchikey": Chem.MolToInchiKey,
    }
    writer = writers.get(to)
    if writer is None:
        raise ConvertError(
            f"unknown output format {to!r}; "
            "expected one of mol, smiles, inchi, inchikey"
        )

    try:
        out = writer(mol)
    except Exception as exc:
        raise ConvertError(f"RDKit failed to write {to}: {exc}") from exc
    if not out:
        # MolToInchi returns '' when InChI generation fails.
        raise ConvertError(f"RDKit produced no output for format {to!r}")
    return out


# --- public API ------------------------------------------------------------------


def convert(input_text: str, from_: FromFormat, to: ToFormat) -> str:
    """Convert a structure between text formats.

    Raises :class:`ConvertError` (with the reason) on any parse or write
    failure — never returns ``None``.
    """
    return _write(_parse(input_text, from_), to)


# Thin named helpers over a parsed mol, for callers already holding one.


def to_molblock(mol: Chem.Mol) -> str:
    """RDKit mol → MDL molblock. Raises ConvertError on failure."""
    return _write(mol, "mol")


def to_smiles(mol: Chem.Mol) -> str:
    """RDKit mol → canonical SMILES. Raises ConvertError on failure."""
    return _write(mol, "smiles")


def to_inchi(mol: Chem.Mol) -> str:
    """RDKit mol → standard InChI. Raises ConvertError on failure."""
    return _write(mol, "inchi")


def to_inchikey(mol: Chem.Mol) -> str:
    """RDKit mol → InChIKey. Raises ConvertError on failure."""
    return _write(mol, "inchikey")
