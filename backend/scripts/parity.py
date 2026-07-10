"""Run parity validation over SDF files and write reports/parity.md.

Compares RDKit-computed MolWt / MolFormula against the foundation's stored SDF
fields for every component. MolWt tolerance ±0.01; MolFormula exact.

Usage:  python -m scripts.parity <sdf_dir_or_file> [output.md]

If the target path has no SDF, the fixture is used and the report says so —
the numbers are never faked to look complete.
"""

from __future__ import annotations

import glob
import os
import sys

from app.sdf.loader import load_sdf
from app.sdf.parity import ParityResult, check_parity

FIXTURE = os.path.join(
    os.path.dirname(__file__), "..", "tests", "fixtures", "sample_foundation.sdf"
)


def _find_sdfs(path: str) -> list[str]:
    if os.path.isfile(path):
        return [path]
    if os.path.isdir(path):
        return sorted(
            glob.glob(os.path.join(path, "*.sdf"))
            + glob.glob(os.path.join(path, "*.sd"))
        )
    return []


def render_md(result: ParityResult, source: str, is_fixture: bool) -> str:
    header = "# 데이터 정합 검증 (reports/parity.md)\n\n"
    if is_fixture:
        header += (
            "> ⚠️ **재단 실측 SDF가 저장소에 없어 픽스처(fixture)로 실행됨.**\n"
            "> 아래 수치는 파이프라인 동작 증명용이다. 실측 SDF를 `data/`에 넣고\n"
            "> `make parity` 를 다시 돌리면 동일 로직으로 전수 대조가 수행된다.\n\n"
        )

    total = result.n_checked
    formula_pct = 100.0 * result.n_formula_ok / total if total else 0.0
    weight_pct = 100.0 * result.n_weight_ok / total if total else 0.0

    lines = [
        header,
        f"- 소스: `{source}`",
        f"- 대조 컴포넌트: **{total}**",
        f"- CTAB 파싱 실패: **{result.n_unparsable}**",
        f"- MolFormula 완전 일치: **{result.n_formula_ok}/{total}** ({formula_pct:.1f}%)",
        f"- MolWt ±0.01 일치: **{result.n_weight_ok}/{total}** ({weight_pct:.1f}%)",
        "",
        "## 불일치 목록",
        "",
    ]

    if not result.mismatches:
        lines.append("불일치 없음. 전 레코드 일치.")
    else:
        lines.append("| REGID | comp | 종류 | SDF 값 | RDKit 값 | 사유 |")
        lines.append("|---|---|---|---|---|---|")
        for m in result.mismatches:
            lines.append(
                f"| {m.regid} | {m.comp_index} | {m.kind} | `{m.sdf_value}` "
                f"| `{m.rdkit_value}` | {m.reason} |"
            )

    lines += [
        "",
        "## 판정 규칙",
        "",
        "- MolWt 허용 오차 **±0.01**, MolFormula **완전 일치** (CLAUDE.md).",
        "- 불일치는 숨기지 않고 사유와 함께 전량 기록한다. 염/counter-ion, 호변이성,",
        "  원자가 오류가 주요 사유다.",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    target = sys.argv[1] if len(sys.argv) > 1 else "../data"
    out_path = sys.argv[2] if len(sys.argv) > 2 else "../reports/parity.md"

    sdfs = _find_sdfs(target)
    is_fixture = False
    if not sdfs:
        sdfs = [FIXTURE]
        is_fixture = True

    all_components = []
    total_records = 0
    total_failures = 0
    for sdf in sdfs:
        loaded = load_sdf(sdf)
        all_components.extend(loaded.components)
        total_records += loaded.n_records
        total_failures += loaded.n_parse_failures

    result = check_parity(all_components)
    result.n_unparsable += total_failures  # record-level failures count too

    source = FIXTURE if is_fixture else target
    md = render_md(result, os.path.abspath(source), is_fixture)
    with open(out_path, "w") as f:
        f.write(md)
    print(f"Wrote {out_path}")
    print(
        f"  checked={result.n_checked} formula_ok={result.n_formula_ok} "
        f"weight_ok={result.n_weight_ok} mismatches={len(result.mismatches)} "
        f"{'(FIXTURE)' if is_fixture else ''}"
    )


if __name__ == "__main__":
    main()
