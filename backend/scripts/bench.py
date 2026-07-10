"""Benchmark the PortableFPBackend (SPEC §7.2 / TASKS M4).

Measures the production search code path — the exact methods the /api/v1
handlers call (the API's elapsed_ms wraps the same function invocation this
script times; there is no separate fast path).

Scales: 5,342 (foundation size, unique synthetic structures) plus 50,000 and
500,000 via synthetic amplification (duplicating unique structures under new
reg_ids — per SPEC §7.2 "합성 증식"). Duplicated rows share one parsed mol in
the precise-phase cache, so memory stays bounded while SQL row counts are real.

Per query we record p50/p95/p99 and the mean screening-candidate count
(precision diagnostic). Warmup 10, then N repetitions per query (default 100;
the actual N used is written into the report — never silently reduced).

Usage: python -m scripts.bench [out.md] [scales csv] [reps]
"""

from __future__ import annotations

import platform
import statistics
import sys
import time

from app.chem.properties import properties_from_text
from app.search.backend import Component
from app.search.portable_fp import PortableFPBackend
from scripts.synthetic import generate

BASE_N = 5342
WARMUP = 10
DEFAULT_REPS = 100

# 30 representative substructure queries (SPEC §7.2 list + coverage).
QUERIES = [
    ("benzene", "c1ccccc1"),
    ("aniline", "Nc1ccccc1"),
    ("piperazine", "C1CNCCN1"),
    ("Boc", "O=C(OC(C)(C)C)"),
    ("pyrimidine", "c1ccncn1"),
    ("biphenyl", "c1ccc(-c2ccccc2)cc1"),
    ("pyridine", "c1ccncc1"),
    ("morpholine", "C1COCCN1"),
    ("sulfonamide", "S(=O)(=O)N"),
    ("carboxylic-acid", "C(=O)O"),
    ("ester", "C(=O)OC"),
    ("amide", "C(=O)N"),
    ("nitrile", "C#N"),
    ("CF3", "C(F)(F)F"),
    ("OCF3", "OC(F)(F)F"),
    ("chlorobenzene", "c1ccc(Cl)cc1"),
    ("fluorobenzene", "c1ccc(F)cc1"),
    ("bromobenzene", "c1ccc(Br)cc1"),
    ("iodobenzene", "c1ccc(I)cc1"),
    ("naphthalene", "c1ccc2ccccc2c1"),
    ("cyclohexane", "C1CCCCC1"),
    ("phenol", "c1ccc(O)cc1"),
    ("toluene", "c1ccc(C)cc1"),
    ("dimethylamino", "N(C)C"),
    ("thioether", "SC"),
    ("anisole", "c1ccc(OC)cc1"),
    ("ethoxy", "OCC"),
    ("benzoic-acid", "c1ccc(C(=O)O)cc1"),
    ("benzamide", "c1ccc(C(=O)N)cc1"),
    ("benzenesulfonamide", "c1ccc(S(=O)(=O)N)cc1"),
]

SIMILARITY_QUERIES = [
    ("tolu-acid", "Cc1ccc(C(=O)O)cc1", 0.4),
    ("chloro-amine", "Clc1ccc(N(C)C)cc1", 0.5),
    ("cyano-amide", "N#Cc1ccccc1C(=O)N", 0.35),
]


def _pcts(ms: list[float]) -> dict:
    s = sorted(ms)
    return {
        "p50": statistics.median(s),
        "p95": s[min(len(s) - 1, int(0.95 * len(s)))],
        "p99": s[min(len(s) - 1, int(0.99 * len(s)))],
    }


def build_backend(scale: int) -> tuple[PortableFPBackend, float]:
    """Index `scale` components; above BASE_N, amplify by duplication."""
    unique = generate(min(scale, BASE_N))
    t0 = time.perf_counter()
    backend = PortableFPBackend()
    for comp in unique:
        backend.add_component(comp)

    if scale > len(unique):
        # Synthetic amplification: duplicate rows under fresh reg_ids, sharing
        # the already-computed fp tuple and parsed mol (bench-only shortcut for
        # *indexing*; the *search* path is untouched production code).
        originals = list(backend._pending)  # noqa: SLF001 — bench harness
        n_unique = len(originals)
        idx = 0
        while backend._next_id < scale:  # noqa: SLF001
            src = originals[idx % n_unique]
            cid = backend._next_id  # noqa: SLF001
            backend._next_id += 1  # noqa: SLF001
            dup = (cid, f"DUP{cid:06d}", f"DM{cid:06d}") + src[3:]
            backend._pending.append(dup)  # noqa: SLF001
            backend._mols[cid] = backend._mols[src[0]]  # shared mol object
            idx += 1

    backend.build()
    return backend, time.perf_counter() - t0


def bench_scale(scale: int, reps: int) -> dict:
    backend, build_s = build_backend(scale)

    # Warmup.
    for name, smi in QUERIES[:WARMUP]:
        backend.substructure_search(smi)

    per_query = []
    for name, smi in QUERIES:
        times, cands, hits = [], [], 0
        for _ in range(reps):
            t0 = time.perf_counter()
            result = backend.substructure_search(smi)
            times.append((time.perf_counter() - t0) * 1000.0)
            cands.append(backend.last_candidate_count)
            hits = len(result)
        per_query.append(
            {"name": name, "hits": hits,
             "cand": statistics.mean(cands), **_pcts(times)}
        )

    sim_times: list[float] = []
    for _, smi, thr in SIMILARITY_QUERIES:
        for _ in range(reps):
            t0 = time.perf_counter()
            backend.similarity_search(smi, thr)
            sim_times.append((time.perf_counter() - t0) * 1000.0)

    all_sub = [t for q in per_query for t in [q["p50"]]]  # per-query medians
    overall = _pcts(
        [t for q in per_query for t in (q["p50"], q["p95"], q["p99"])]
    )
    return {
        "scale": scale,
        "build_s": build_s,
        "reps": reps,
        "queries": per_query,
        "sub_overall_p95": max(q["p95"] for q in per_query),
        "sub_median_p50": statistics.median(all_sub),
        "sim": _pcts(sim_times),
        "overall": overall,
    }


def render(results: list[dict], prop_ms: dict) -> str:
    lines = [
        "# 성능 벤치마크 (reports/bench.md)",
        "",
        "> 실측값만 기록. `PortableFPBackend`(Oracle 이식 경로, PatternFP 워드 스크리닝) 기준.",
        "> 측정은 프로덕션 검색 함수 그 자체를 탄다 — API `elapsed_ms` 가 감싸는 동일 호출.",
        f"> 환경: Python {platform.python_version()} · {platform.system()} {platform.machine()} · SQLite in-memory.",
        "> 데이터: 합성(synthetic) 라이브러리. 5,342 = 고유 구조; 50k/500k 는 합성 증식(중복 reg_id).",
        "> 실측 SDF 부재 — 재단 데이터 확보 후 재측정 필요.",
        "",
        "## 물성 계산 (핵심 기능 백엔드 compute)",
        "",
        f"| p50 | p95 | p99 | 목표 |",
        f"|---|---|---|---|",
        f"| {prop_ms['p50']:.2f} ms | {prop_ms['p95']:.2f} ms | {prop_ms['p99']:.2f} ms | ≤ 1000 ms {'✅' if prop_ms['p95'] <= 1000 else '❌'} |",
        "",
    ]
    for r in results:
        verdict = "✅" if r["sub_overall_p95"] <= 3000 else "❌"
        lines += [
            f"## Substructure — {r['scale']:,}건 (빌드 {r['build_s']:.1f}s, 워밍업 {WARMUP} + 쿼리당 {r['reps']}회)",
            "",
            f"최악 쿼리 p95 = **{r['sub_overall_p95']:.1f} ms** (목표 ≤ 3,000 ms {verdict}) · 쿼리 p50 중앙값 {r['sub_median_p50']:.1f} ms",
            "",
            "| 쿼리 | 히트(REGID) | p50 | p95 | p99 | 후보수(스크리닝) |",
            "|---|---|---|---|---|---|",
        ]
        for q in sorted(r["queries"], key=lambda x: -x["p95"])[:10]:
            lines.append(
                f"| {q['name']} | {q['hits']:,} | {q['p50']:.1f} | {q['p95']:.1f} "
                f"| {q['p99']:.1f} | {q['cand']:,.0f} |"
            )
        lines += [
            f"| *(나머지 {len(r['queries']) - 10}개 쿼리 p95 ≤ 위 표 최소값)* | | | | | |",
            "",
            f"Similarity (3 쿼리 × {r['reps']}회): p50 {r['sim']['p50']:.1f} / p95 {r['sim']['p95']:.1f} / p99 {r['sim']['p99']:.1f} ms "
            f"{'✅' if r['sim']['p95'] <= 3000 else '❌ 목표 미달'}",
            "",
        ]
    lines += [
        "## 판정 요약",
        "",
        "| 규모 | Substructure 최악 p95 | Similarity p95 | ≤3s |",
        "|---|---|---|---|",
    ]
    for r in results:
        ok = "✅" if r["sub_overall_p95"] <= 3000 and r["sim"]["p95"] <= 3000 else "❌"
        lines.append(
            f"| {r['scale']:,} | {r['sub_overall_p95']:.1f} ms | {r['sim']['p95']:.1f} ms | {ok} |"
        )
    lines += [
        "",
        "미달 항목이 있으면 위 표에 그대로 남는다. 목표를 조정하지 않는다.",
        "",
    ]
    return "\n".join(lines)


def bench_properties(reps: int = 200) -> dict:
    samples = [c.smiles for c in generate(200)]
    for s in samples[:WARMUP]:
        properties_from_text(s)
    times = []
    for i in range(reps):
        t0 = time.perf_counter()
        properties_from_text(samples[i % len(samples)])
        times.append((time.perf_counter() - t0) * 1000.0)
    return _pcts(times)


def main() -> None:
    out = sys.argv[1] if len(sys.argv) > 1 else "../reports/bench.md"
    scales = (
        [int(x) for x in sys.argv[2].split(",")]
        if len(sys.argv) > 2
        else [5342, 50000, 500000]
    )
    reps = int(sys.argv[3]) if len(sys.argv) > 3 else DEFAULT_REPS

    prop_ms = bench_properties()
    results = []
    for scale in scales:
        print(f"[bench] scale={scale:,} …", flush=True)
        r = bench_scale(scale, reps)
        print(
            f"[bench]   worst sub p95={r['sub_overall_p95']:.1f}ms "
            f"sim p95={r['sim']['p95']:.1f}ms build={r['build_s']:.1f}s",
            flush=True,
        )
        results.append(r)

    with open(out, "w") as f:
        f.write(render(results, prop_ms))
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
