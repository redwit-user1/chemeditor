"""Structure parsing.

ChemDraw and Ketcher both place plain-text structures on the clipboard —
usually an MDL molfile (V2000/V3000) or a SMILES string. We never touch the
binary ``.cdx`` blob (see CLAUDE.md); a molfile or SMILES is always available.

Per project rule: a ``None`` from RDKit (parse / sanitize failure) is *never*
silently swallowed. Every parse returns an explicit :class:`ParseResult` whose
``error`` is populated on failure, and callers are expected to surface it.
"""

from __future__ import annotations

from dataclasses import dataclass

from rdkit import Chem
from rdkit import RDLogger

# RDKit is noisy on stderr for every sanitize failure. We capture the reason
# ourselves (see _capture_sanitize_error) so silence the global logger.
RDLogger.DisableLog("rdApp.*")


@dataclass(frozen=True)
class ParseResult:
    """Outcome of parsing a text structure.

    ``mol`` is ``None`` exactly when parsing failed, in which case ``error``
    explains why and ``input_format`` records what we *tried* to read it as.
    """

    mol: "Chem.Mol | None"
    input_format: str
    error: "str | None" = None

    @property
    def ok(self) -> bool:
        return self.mol is not None


def looks_like_molblock(text: str) -> bool:
    """Heuristic: does this text look like an MDL molfile rather than SMILES?

    Molfiles carry an ``M  END`` terminator and/or a V2000/V3000 counts line.
    SMILES never do. We deliberately keep this conservative — a false negative
    just means we try SMILES, which fails cleanly for real molfiles anyway.
    """
    if "M  END" in text or "M END" in text:
        return True
    if "V2000" in text or "V3000" in text:
        return True
    # A molfile has at least 4 header lines before the counts line.
    lines = text.splitlines()
    return len(lines) >= 4 and ("  0999" in text or "999 V" in text)


def parse_structure(text: str) -> ParseResult:
    """Parse clipboard / editor text into an RDKit mol.

    Auto-detects molfile vs SMILES. Returns a :class:`ParseResult` — check
    ``.ok`` before using ``.mol``.
    """
    if text is None or text.strip() == "":
        return ParseResult(mol=None, input_format="empty", error="empty input")

    if looks_like_molblock(text):
        return _parse_molblock(text)
    return _parse_smiles(text)


def _parse_molblock(text: str) -> ParseResult:
    try:
        mol = Chem.MolFromMolBlock(text, sanitize=True)
    except Exception as exc:  # RDKit can raise on malformed connection tables
        return ParseResult(mol=None, input_format="mol", error=str(exc))
    if mol is None:
        return ParseResult(
            mol=None,
            input_format="mol",
            error="RDKit could not parse/sanitize the molfile",
        )
    return ParseResult(mol=mol, input_format="mol")


def _parse_smiles(text: str) -> ParseResult:
    smiles = text.strip().split("\n")[0].strip()
    try:
        mol = Chem.MolFromSmiles(smiles)
    except Exception as exc:
        return ParseResult(mol=None, input_format="smiles", error=str(exc))
    if mol is None:
        return ParseResult(
            mol=None,
            input_format="smiles",
            error=f"RDKit could not parse SMILES: {smiles!r}",
        )
    return ParseResult(mol=mol, input_format="smiles")
