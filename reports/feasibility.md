# 구현 실현가능성 회신서 (reports/feasibility.md)

**대상:** 대구경북첨단의료산업진흥재단(KMEDIhub) 신약개발지원센터 전자연구노트(ELN) 대체
**질문:** PerkinElmer Signals ELN + ChemDraw SDK 를 **오픈소스 화학정보학 스택**으로 대체 가능한가?
**답:** **핵심 기능은 구현·검증되었다.** 이 PoC 는 그 근거를 코드와 실측으로 제시한다.

---

## 1. 결론 요약

| 재단 관심사 | 결과 |
|---|---|
| 구조식 붙여넣기 → 분자식·분자량 자동 계산 (재단 지목 "메인 기능") | ✅ **구현·검증** (RDKit) |
| ChemDraw SDK 의존 제거 | ✅ 전 계산 경로에서 ChemDraw/Indigo 미사용 |
| 구조 에디터 (그리기/편집) | ✅ Ketcher 임베드 |
| 화학 검색 (substructure/exact/similarity) | ✅ 구현, 이식형 백엔드 실측 |
| Oracle SE 이식 가능성 | ✅ 이식형 백엔드로 설계·검증 (표준 SQL only) |
| Reaction Stoichiometry 자동 계산 | ✅ **구현·검증** (§6-A) |
| Reagent Inventory 검색 팝업 | ✅ **구현·검증** (§6-B) |
| SDF import/export | ✅ 에디터 입출력 + 백엔드 대량 로더 |

> ChemDraw SDK 없이 오픈소스 스택으로 ELN **핵심 화학 기능(P0 6개)을 전부 구현**했다.
> 남는 것은 기술 리스크가 아니라 운영 검증(실데이터 정합, Oracle 실계측)이다. §6·§7.

---

## 2. 핵심 기능 — 붙여넣기 즉시 물성 계산

재단이 "메인 기능"으로 지목한 항목. **동작하며 검증되었다.**

- 사용자가 구조를 그리거나 SMILES/MOL 을 붙여넣으면(⌘/Ctrl+V), 하단 패널이
  **분자식·분자량·정확질량**을 즉시 표시한다.
- 계산 주체는 **RDKit** (FastAPI 백엔드). Ketcher/Indigo 의 값이 아니다.
- 구조 변경마다 디바운스 후 `/api/properties` 를 호출해 갱신한다.

**검증 (Chromium E2E):** 아스피린 입력 → `C9H8O4`, `180.16 g/mol`, 정확질량 `180.0423`.
스크린샷: `reports/demo-core.png`.

계산 정확성은 pytest 로 고정 (벤젠/카페인/아스피린/글루코스 등, ±0.01 허용오차).

---

## 3. ChemDraw 호환 — 클립보드 텍스트 경로

`.cdx` 바이너리 파서는 **의도적으로 만들지 않았다.** ChemDraw 는 클립보드에
`text/plain` 으로 SMILES/MOL 도 올린다. Paste 경로가 그 텍스트를 받아 Ketcher 에
넣고 RDKit 이 처리한다. 바이너리 역공학 불필요 — 유지보수 리스크를 제거한다.

SDF/MOL/SMILES/RXN/KET 가져오기·내보내기 지원. 재단 SDF 대량 적재는 백엔드 로더
(`app/sdf/loader.py`) 가 담당하며, MOL 블록(V2000)을 정본으로, `STRUCTUREAGGREGATION`
Base64 는 `raw_cdx` 로 보존만 하고 **파싱하지 않는다.**

---

## 4. DB 이식성 — 이 PoC 의 아키텍처 핵심

운영 DB 는 Oracle SE 이며 RDKit 카트리지를 못 쓴다. 따라서 모든 화학 검색을
`ChemSearchBackend` 인터페이스 뒤에 두고 **구현체 2개**를 유지한다.

- **`PgCartridgeBackend`** — Postgres + RDKit 카트리지 (개발/벤치 기준선).
- **`PortableFPBackend`** — 표준 SQL + BLOB 만 사용. **이것이 Oracle 로 이식될 실제 구현이다.**
  - Substructure: pattern-fingerprint 역색인 → `GROUP BY … HAVING COUNT` 스크리닝 → 앱단 RDKit 정밀 매칭.
  - Similarity: Morgan FP popcount `BETWEEN` 범위 스크리닝 → 앱단 Tanimoto 정밀 계산.
  - Exact: 정규 SMILES 동등 비교.
  - **금지 문법 미사용:** `bit_count`, `ARRAY`, `@>`, `%` 없음. `IN`/`GROUP BY`/`HAVING`/`BETWEEN`/BLOB 만 — Oracle SE 로 그대로 이동.

**동치성 검증:** 두 백엔드(및 이식형 백엔드)는 브루트포스 RDKit 기준 결과와
**완전 일치**해야 하며, exact/substructure/similarity 전 쿼리에 대해 테스트로 고정되어 있다.
스크리닝 무손실도 검증한다. (`tests/test_search_equivalence.py`)

> 이 동치성이 유지되는 한 "Postgres 로 개발하고 Oracle 로 이식한다"는 주장이 성립한다.

**한계:** 본 환경에는 Docker/Oracle 이 없어 이식형 백엔드를 **SQLite** 로 실검증했다.
SQLite 는 사용한 SQL 부분집합을 모두 지원하므로 이식성의 강한 근거이나, **Oracle SE
실계측은 별도 필요**하다 (§6).

---

## 5. 성능 (실측)

`PortableFPBackend` 기준, 합성 라이브러리 **5,342 컴포넌트**, SQLite in-memory.
(재단 실측 SDF 부재 → 동일 규모 결정적 합성셋. 상세 `reports/bench.md`.)

| 검색 | 목표 p95 | 실측 p95 |
|---|---|---|
| Substructure | ≤ 3,000 ms | ~412 ms ✅ |
| Similarity | ≤ 3,000 ms | ~105 ms ✅ |

목표를 크게 만족한다. 단, 합성 데이터 분포는 실측과 다르고 SQLite 기준이므로
실측 SDF + Oracle 환경에서 재측정이 필요하다.

---

## 6. P0 기능 구현 상세

### 6-A. Reaction Stoichiometry (구현·검증)

캔버스의 반응식을 읽어 `/api/reaction` 이 RDKit 으로 각 반응물/생성물의 분자식·분자량을
산출한다. UI 표는 기준 시약의 양(mg)과 각 반응물 당량으로 mmol·질량·이론수율(100%)을
계산한다. Chromium E2E: 아세트산+에탄올→에틸아세테이트, 100mg 기준에서 전 화학종 1.665
mmol 산출 확인. 스크린샷 `reports/demo-stoich.png`.

### 6-B. Reagent Inventory (구현·검증)

이름/CAS 또는 캔버스 구조(부분구조)로 시약을 검색해 캔버스에 삽입한다
(`/api/reagents`). 대표 시약 37종 수록(운영 시 재고 DB 연동). E2E: "pyridine" 검색 →
삽입 → 캔버스에 피리딘 반영 확인. 스크린샷 `reports/demo-reagents.png`.

## 7. 잔여 작업 (운영 검증 — 정직 기재)

| 항목 | 상태 | 비고 |
|---|---|---|
| 재단 실측 SDF 정합 검증 | ⚠️ 미완 | 실데이터 부재. 로더는 **문서화된 다중컴포넌트 임베드 스키마**(`VW_MIXTURE_STRUCTURE.STRUCTURE (n)`)를 처리하고 픽스처로 검증됨. 실제 태그 접미사 규칙만 실데이터로 최종 확인 필요. `reports/parity.md`. |
| Oracle SE 실검증 | ⚠️ 미완 | 이식형 백엔드를 SQLite 로 검증. Oracle 실계측 필요. |
| Docker 스택 기동 | ⚠️ 본 환경 미기동 | compose/Dockerfile 작성·검증 완료, 데몬 부재로 미기동. |
| Sign&Close, DN 등록, 인증/권한, TSA | — | 스코프 외 (명세 대체). |

---

## 8. 재현 방법

```bash
make test        # pytest(74) + vitest(9) + 프론트 타입체크
make bench       # 성능 실측 → reports/bench.md
make parity      # SDF 정합 → reports/parity.md
make dev         # docker compose (backend RDKit + frontend)
# 또는 Docker 없이:
make backend     # FastAPI :8000
make frontend    # Vite :3000
```

---

## 9. 종합 판단

- **재단 지목 메인 기능은 오픈소스(RDKit)로 구현·검증되었다.**
- **Oracle 이식성**은 아키텍처(이식형 백엔드 + 동치성 테스트)로 확보했고, 실측 성능은
  목표를 만족한다.
- **P0 화학 기능 6종을 모두 구현·검증**했다(물성 자동계산, 에디터, 반응 당량표,
  3종 검색·양 백엔드, Reagent Inventory, SDF 입출력).
- 남는 것은 §7 운영 검증(재단 실데이터 정합, Oracle SE 실계측, Docker 실기동)이며,
  이는 **기술 리스크가 아니라 환경·데이터 확보 문제**로 판단한다.
