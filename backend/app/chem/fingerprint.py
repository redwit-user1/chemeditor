"""Fingerprints for portable chemical search.

Two different fingerprints, for two different jobs:

* **Pattern fingerprint** (``Chem.PatternFingerprint``) — has the substructure
  screening property: if Q is a substructure of T, then every bit set in Q's
  fingerprint is also set in T's. We store the *set bit indices* in an inverted
  index so substructure screening becomes a plain ``GROUP BY / HAVING COUNT``
  query — no vendor bit operators required.

* **Morgan fingerprint** (ECFP-like) — for Tanimoto similarity. We store the raw
  bits as a BLOB plus the popcount, so similarity screening is a portable
  ``popcount BETWEEN ? AND ?`` range filter.

Nothing here uses Postgres-only syntax; the same bytes and integers move to
Oracle unchanged.
"""

from __future__ import annotations

from rdkit import Chem
from rdkit.Chem import rdFingerprintGenerator
from rdkit.DataStructs import ExplicitBitVect

FP_SIZE = 2048
MORGAN_RADIUS = 2

# One shared Morgan generator (current RDKit API; the deprecated
# GetMorganFingerprintAsBitVect is avoided).
_MORGAN_GEN = rdFingerprintGenerator.GetMorganGenerator(
    radius=MORGAN_RADIUS, fpSize=FP_SIZE
)


def pattern_bits(mol: Chem.Mol) -> list[int]:
    """Return the sorted list of set bit indices of the pattern fingerprint."""
    fp = Chem.PatternFingerprint(mol, fpSize=FP_SIZE)
    return list(fp.GetOnBits())


def morgan_fp(mol: Chem.Mol) -> ExplicitBitVect:
    """Return the Morgan (ECFP) bit-vector fingerprint used for similarity."""
    return _MORGAN_GEN.GetFingerprint(mol)


def morgan_bits(mol: Chem.Mol) -> list[int]:
    """Return the sorted list of set bit indices of the Morgan fingerprint."""
    return list(morgan_fp(mol).GetOnBits())


def bits_to_bytes(on_bits: list[int], size: int = FP_SIZE) -> bytes:
    """Pack a list of set-bit indices into a big-endian bit-packed byte string.

    Portable to any BLOB/RAW column; decoding is the inverse below.
    """
    buf = bytearray((size + 7) // 8)
    for b in on_bits:
        buf[b >> 3] |= 1 << (b & 7)
    return bytes(buf)


def bytes_to_bits(blob: bytes) -> list[int]:
    """Unpack a bit-packed byte string back into set-bit indices."""
    out: list[int] = []
    for byte_index, byte in enumerate(blob):
        if byte:
            base = byte_index << 3
            for bit in range(8):
                if byte & (1 << bit):
                    out.append(base + bit)
    return out


def popcount_bytes(blob: bytes) -> int:
    """Count set bits in a byte string (portable, done in the app layer)."""
    return sum(bin(byte).count("1") for byte in blob)


def tanimoto(bits_a: set[int], bits_b: set[int]) -> float:
    """Tanimoto similarity between two sets of on-bits."""
    if not bits_a and not bits_b:
        return 1.0
    inter = len(bits_a & bits_b)
    union = len(bits_a) + len(bits_b) - inter
    return inter / union if union else 0.0
