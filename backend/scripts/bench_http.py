"""End-to-end HTTP latency benchmark for the Chem Service (TASKS: Goono 통합).

Measures the *client-observed* HTTP round-trip latency of the two write-path
endpoints Goono will proxy:

  * POST /api/v1/chem/properties  — the paste→properties core (RDKit compute)
  * POST /api/v1/compounds        — compound registration (parse + live index)

This is the FastAPI leg only. The Goono reverse-proxy hop is NOT included
(Goono is unbuildable in this sandbox); the number here is the lower bound the
proxy adds to. Compute-only latency is reported separately in bench.md
(properties backend compute ≈ 0.2 ms) — the gap between that and the numbers
here is FastAPI + Uvicorn + loopback HTTP + JSON (de)serialization.

Three representative structures exercise the properties endpoint:
  small   — a pasted SMILES (aspirin, 13 heavy atoms)
  medium  — a V2000 molblock (caffeine, 14 heavy atoms; from the bundled SDF)
  large   — a V2000 molblock (reserpine, 44 heavy atoms; drug-like)

Usage:
    python -m scripts.bench_http http://127.0.0.1:PORT
"""

from __future__ import annotations

import statistics
import sys
import time

import httpx
from rdkit import Chem
from rdkit.Chem import rdDepictor

WARMUP = 20
PROP_REPS = 200        # per structure
COMPOUND_REPS = 100

# --- structures ---------------------------------------------------------------

SMALL_SMILES = "CC(=O)Oc1ccccc1C(=O)O"  # aspirin, pasted-SMILES path


def _molblock(smiles: str) -> str:
    """Deterministic V2000 molblock with 2D coords (the paste-from-editor path)."""
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise SystemExit(f"could not build molblock for {smiles!r}")
    rdDepictor.Compute2DCoords(mol)
    return Chem.MolToMolBlock(mol)


MEDIUM_MOLBLOCK = _molblock("Cn1c(=O)c2c(ncn2C)n(C)c1=O")  # caffeine (14 heavy)
LARGE_MOLBLOCK = _molblock(  # reserpine (44 heavy), C33H40N2O9
    "COC(=O)[C@H]1[C@@H](OC)[C@H](OC(=O)c2cc(OC)c(OC)c(OC)c2)C[C@@H]2[C@H]1C"
    "[C@H]1c3[nH]c4ccc(OC)cc4c3CCN1C2"
)

PROP_STRUCTURES = [
    ("small (aspirin SMILES, 13 heavy)", SMALL_SMILES),
    ("medium (caffeine molblock, 14 heavy)", MEDIUM_MOLBLOCK),
    ("large (reserpine molblock, 44 heavy)", LARGE_MOLBLOCK),
]


def _pct(samples: list[float], q: float) -> float:
    """Nearest-rank percentile in ms."""
    s = sorted(samples)
    if not s:
        return float("nan")
    k = max(0, min(len(s) - 1, round(q / 100.0 * (len(s) - 1))))
    return s[k]


def _summary(samples: list[float]) -> str:
    return (
        f"p50 {_pct(samples, 50):.2f} / "
        f"p95 {_pct(samples, 95):.2f} / "
        f"p99 {_pct(samples, 99):.2f} ms "
        f"(mean {statistics.mean(samples):.2f}, n={len(samples)})"
    )


def bench_properties(client: httpx.Client, base: str) -> dict[str, list[float]]:
    url = f"{base}/api/v1/chem/properties"
    # warmup across all three structures
    for _ in range(WARMUP):
        for _, s in PROP_STRUCTURES:
            client.post(url, json={"structure": s})
    results: dict[str, list[float]] = {}
    for label, s in PROP_STRUCTURES:
        samples: list[float] = []
        for _ in range(PROP_REPS):
            t0 = time.perf_counter()
            r = client.post(url, json={"structure": s})
            samples.append((time.perf_counter() - t0) * 1000.0)
            r.raise_for_status()
            body = r.json()
            if not body.get("ok"):
                raise SystemExit(f"properties failed for {label}: {body.get('error')}")
        results[label] = samples
    return results


def bench_compounds(client: httpx.Client, base: str) -> list[float]:
    url = f"{base}/api/v1/compounds"
    # warmup with throwaway reg_ids
    for i in range(WARMUP):
        client.post(url, json={"reg_id": f"BENCH-WARM-{i}", "structure": SMALL_SMILES})
    samples: list[float] = []
    for i in range(COMPOUND_REPS):
        payload = {"reg_id": f"BENCH-{i}", "structure": SMALL_SMILES}
        t0 = time.perf_counter()
        r = client.post(url, json=payload)
        samples.append((time.perf_counter() - t0) * 1000.0)
        r.raise_for_status()
        body = r.json()
        if not body.get("ok"):
            raise SystemExit(f"compound register failed at {i}: {body.get('error')}")
    return samples


def main() -> None:
    base = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
    base = base.rstrip("/")
    with httpx.Client(timeout=30.0) as client:
        prop = bench_properties(client, base)
        comp = bench_compounds(client, base)

    print(f"# Chem Service HTTP latency — {base}")
    print(f"# warmup={WARMUP}, properties reps={PROP_REPS}/structure, "
          f"compounds reps={COMPOUND_REPS}")
    print()
    all_prop: list[float] = []
    print("## POST /api/v1/chem/properties")
    for label, _ in PROP_STRUCTURES:
        samples = prop[label]
        all_prop += samples
        print(f"  {label:42s} {_summary(samples)}")
    print(f"  {'aggregate (all 3 × 200)':42s} {_summary(all_prop)}")
    print()
    print("## POST /api/v1/compounds (registration, unique reg_ids)")
    print(f"  {'':42s} {_summary(comp)}")


if __name__ == "__main__":
    main()
