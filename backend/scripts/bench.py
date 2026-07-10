"""Benchmark the PortableFPBackend at foundation scale.

Measures real wall-clock latency for substructure and similarity search on a
~5,342-component index, warmed up then ≥100 repetitions, reporting p50/p95/p99.

Measured on ``PortableFPBackend`` (the Oracle-portable path) per CLAUDE.md —
cartridge numbers, if any, are reference-only.

Usage:  python -m scripts.bench [output.md] [n_components] [iterations]
"""

from __future__ import annotations

import platform
import statistics
import sys
import time

from app.search.portable_fp import PortableFPBackend
from scripts.synthetic import generate

DEFAULT_N = 5342
DEFAULT_ITERS = 120
WARMUP = 20

# Queries chosen to span selective and broad results.
SUBSTRUCTURE_QUERIES = [
    "c1ccccc1",       # benzene — very common, large result set
    "c1ccncc1",       # pyridine
    "C(=O)O",         # carboxylic acid
    "S(=O)(=O)N",     # sulfonamide
    "OC(F)(F)F",      # trifluoromethoxy — rare
]
SIMILARITY_QUERIES = [
    ("Cc1ccc(C(=O)O)cc1", 0.4),
    ("Clc1ccc(N(C)C)cc1", 0.5),
    ("N#Cc1ccccc1C(=O)N", 0.3),
]


def _percentiles(samples_ms: list[float]) -> dict[str, float]:
    s = sorted(samples_ms)
    return {
        "p50": statistics.median(s),
        "p95": s[min(len(s) - 1, int(0.95 * len(s)))],
        "p99": s[min(len(s) - 1, int(0.99 * len(s)))],
        "mean": statistics.fmean(s),
        "max": s[-1],
    }


def _time_calls(fn, queries, iterations: int) -> list[float]:
    times: list[float] = []
    for i in range(iterations):
        q = queries[i % len(queries)]
        start = time.perf_counter()
        fn(q)
        times.append((time.perf_counter() - start) * 1000.0)
    return times


def run(n: int, iterations: int) -> dict:
    lib = generate(n)
    backend = PortableFPBackend()
    t0 = time.perf_counter()
    for comp in lib:
        backend.add_component(comp)
    backend.build()
    build_s = time.perf_counter() - t0

    # Warmup (JIT of RDKit calls, filesystem/page cache, SQLite plan cache).
    _time_calls(lambda q: backend.substructure_search(q), SUBSTRUCTURE_QUERIES, WARMUP)
    _time_calls(
        lambda q: backend.similarity_search(q[0], q[1]), SIMILARITY_QUERIES, WARMUP
    )

    sub_ms = _time_calls(
        lambda q: backend.substructure_search(q), SUBSTRUCTURE_QUERIES, iterations
    )
    sim_ms = _time_calls(
        lambda q: backend.similarity_search(q[0], q[1]), SIMILARITY_QUERIES, iterations
    )

    return {
        "n_components": len(lib),
        "build_s": build_s,
        "iterations": iterations,
        "substructure": _percentiles(sub_ms),
        "similarity": _percentiles(sim_ms),
    }


def render_md(result: dict) -> str:
    def row(name, p):
        return (
            f"| {name} | {p['p50']:.1f} | {p['p95']:.1f} | {p['p99']:.1f} "
            f"| {p['mean']:.1f} | {p['max']:.1f} |"
        )

    sub_ok = "✅" if result["substructure"]["p95"] <= 3000 else "❌"
    sim_ok = "✅" if result["similarity"]["p95"] <= 3000 else "❌"

    return f"""# 성능 벤치마크 (reports/bench.md)

> 실측값만 기록. `PortableFPBackend`(Oracle 이식 대상 경로) 기준.

## 환경

- 데이터셋: **합성(synthetic)** 라이브러리 {result['n_components']:,}개 컴포넌트
  (재단 실측 SDF는 비공개·미포함 → 동일 규모의 결정적 합성셋으로 대체)
- 백엔드: `PortableFPBackend` (표준 SQL + BLOB, SQLite in-memory)
- 인덱스 빌드: {result['build_s']:.2f}s
- 반복: {result['iterations']}회 (워밍업 {WARMUP}회 별도), 쿼리 라운드로빈
- Python: {platform.python_version()} · {platform.system()} {platform.machine()}

## 결과 (ms)

| 검색 | p50 | p95 | p99 | mean | max |
|---|---|---|---|---|---|
{row('Substructure', result['substructure'])}
{row('Similarity', result['similarity'])}

## 목표 대비

| 항목 | 목표 (p95) | 실측 (p95) | 판정 |
|---|---|---|---|
| Substructure 검색 | ≤ 3000 ms | {result['substructure']['p95']:.1f} ms | {sub_ok} |
| Similarity 검색 | ≤ 3000 ms | {result['similarity']['p95']:.1f} ms | {sim_ok} |

## 주의

- 합성 데이터는 실측 데이터의 분자량/스캐폴드 분포와 다르다. 실측 SDF 확보 후
  재측정이 필요하다. 위 수치는 **이식 가능 경로가 목표 규모에서 동작함**을 보이는
  근거이지, 재단 데이터에 대한 최종 성능 보증이 아니다.
- SQLite in-memory 기준. Oracle SE에서는 I/O·플래너 특성이 달라 재측정 대상이다.
"""


def main() -> None:
    out_path = sys.argv[1] if len(sys.argv) > 1 else "../reports/bench.md"
    n = int(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_N
    iterations = int(sys.argv[3]) if len(sys.argv) > 3 else DEFAULT_ITERS

    result = run(n, iterations)
    md = render_md(result)
    with open(out_path, "w") as f:
        f.write(md)
    print(f"Wrote {out_path}")
    print(
        f"  substructure p95={result['substructure']['p95']:.1f}ms  "
        f"similarity p95={result['similarity']['p95']:.1f}ms  "
        f"(n={result['n_components']}, build={result['build_s']:.2f}s)"
    )


if __name__ == "__main__":
    main()
