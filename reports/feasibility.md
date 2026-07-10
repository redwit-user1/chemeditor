# 구현 실현가능성 회신서 (reports/feasibility.md)

**수신:** KMEDIhub 정보전산팀장 · 원장
**건:** PerkinElmer Signals ELN + CBOE 대체 시 화학 엔진의 오픈소스 스택(Ketcher + RDKit) 구현 가능 여부
**근거:** 본 문서의 모든 수치는 `reports/bench.md`(실측 성능)와 `reports/parity.md`(정합 검증)에서 가져왔다.
그 두 파일에 없는 숫자는 쓰지 않았다.

---

## 결론 요약

| # | 질문 (SPEC §9) | 답 | 실측 근거 |
|---|---|---|---|
| 1 | ChemDraw SDK 없이 붙여넣기 → 즉시 물성 계산? | **예** | E2E p50 404 ms / p95 439 ms |
| 2 | Oracle SE 제약 하 substructure 3초 내? (5,342건) | **예** | 최악 쿼리 p95 50.1 ms |
| 3 | 5,342 → 50k → 500k 확장 임계점? | **~30만 후보에서 3s 초과** | 500k 광역 쿼리 p95 4,216 ms ❌ |
| 4 | RDKit 계산 == 기존 CBOE 데이터? | **파이프라인 검증 완료, 실데이터 미확보** | 픽스처 6/7 일치 + 불일치 사유 분류 |
| 5 | `.cdx` 파서 없이 ChemDraw 붙여넣기 동작? | **예** | text/plain 경로, E2E 검증 |
| 6 | 남는 리스크? | UX 저항 (정량화 불가) + §6 상술 | — |

---

## 1. ChemDraw SDK 없이 "붙여넣기 → 즉시 물성 계산"이 되는가

**예. E2E p50 404 ms / p95 439 ms** (Chromium 30회, 150 ms 디바운스 포함;
붙여넣기 → Ketcher 렌더 → HTTP → RDKit 계산 → 화면 갱신 전 구간).
백엔드 계산 자체는 p95 **0.31 ms**. 목표 ≤ 1초를 여유 있게 만족한다.

표시 항목은 기존 시스템과 동일하다: Mol Formula, Mol Weight, Exact Mass, Heavy Atoms.
계산 주체는 전부 RDKit(BSD) — ChemDraw SDK도, Ketcher 내장 엔진(Indigo)도 수치에
관여하지 않는다. 재단 합성노트 KJA-025-84의 stoichiometry 표(4.54 mmol / 0.464 g /
0.428 ml / 0.691 g / 37.0% / 0.908 M)가 **인쇄 자릿수까지** 재현됨을 테스트로 고정했다.

## 2. Oracle SE 제약(Cartridge 불가) 하에서 substructure 검색이 3초 내인가

**예 — 재단 현재 규모(5,342건)에서 최악 쿼리 p95 50.1 ms** (30개 대표 쿼리 × 100회,
`PortableFPBackend`). Similarity p95 14.6 ms.

이식 경로의 구성: fingerprint를 32개의 signed 64bit 정수 컬럼으로 분해 저장하고,
표준 SQL(`WHERE (fp_i & :q) = :q` — Oracle `BITAND`)로 스크리닝한 뒤 앱 레이어
RDKit이 정밀 확정한다. `bit_count`/`ARRAY`/`@>`/`%` 등 Postgres 전용 문법은 없다.

**정합성 보증:** 30개 쿼리 전부에서 브루트포스 RDKit 정답지와 결과 집합
**완전 일치**(부분집합 아님, 스크리닝 재현율 100%)를 테스트 게이트로 고정했다.

> 기술 정정 1건: SPEC §4.3의 "Morgan FP로 substructure 스크리닝" 지시는 화학적으로
> 성립하지 않아(부분구조 포함성 부재 → false negative) 스크리닝 전용으로 설계된
> PatternFingerprint로 교체했다. 상세: `docs/DECISIONS.md`.

## 3. 5,342 → 50,000 → 500,000 확장 시 어디서 깨지는가

| 규모 | Substructure 최악 p95 | Similarity p95 | ≤3s |
|---|---|---|---|
| 5,342 | 50.1 ms | 14.6 ms | ✅ |
| 50,000 | 427.0 ms | 149.7 ms | ✅ |
| 500,000 | **4,216.4 ms** | 1,795.8 ms | **❌** |

**미달을 미달로 적는다.** 500,000건에서 benzene(후보 456,448건)·toluene(339,626건)
두 광역 쿼리가 3초를 넘는다. 병목은 스크리닝이 아니라 **정밀 매칭 단계가 후보 수에
선형**(약 9 µs/후보)이라는 점이다 — 즉 임계점은 "규모"가 아니라 **후보 약 30만 건**이며,
50만 건 라이브러리에서도 선택적 쿼리(phenol 이하 28개)는 1.2~2.4초에 그친다.

개선안(미구현, 설계만 제시): ① 결과 상한(limit) 도달 시 정밀 매칭 조기 종료 —
실제 UI는 200건만 표시하므로 광역 쿼리일수록 효과가 큼, ② 후보 정밀 매칭 병렬화,
③ ring-count 등 추가 프리필터. 참고로 재단 라이브러리는 현재 5,342건이고 500k는
94배 성장 시나리오다. 500k 측정은 소요시간 사유로 쿼리당 20회 반복(기본 100회
미만)이며 표에 명시했다.

## 4. RDKit 계산값이 기존 CBOE 데이터와 일치하는가

**실데이터 미확보 — 검증 파이프라인은 완성, 수치는 픽스처 기준.** 재단 실측 SDF가
본 저장소에 없어(비공개) 전 레코드 대조는 실행하지 못했다. 파이프라인은 재단 스키마
(다중 컴포넌트 임베드 `VW_MIXTURE_STRUCTURE.STRUCTURE (n)` 레이아웃, `STRUCTUREAGGREGATION`
보존·비파싱)를 처리하며, 픽스처에서 **의도적으로 주입한 불일치 2건(염 counter-ion 누락,
저장값 오류)을 정확히 사유와 함께 검출**했다 (6/7 일치, `reports/parity.md`).
허용오차는 MolWt ±0.01, MolFormula 완전 일치로 고정했고 조정하지 않는다.
실측 SDF를 `data/`에 넣고 `make parity` 실행이 필요하다 — **이것이 회신 확정 전
반드시 남은 한 단계다.**

## 5. ChemDraw 클립보드 붙여넣기가 `.cdx` 파서 없이 동작하는가

**예.** ChemDraw는 복사 시 클립보드에 `text/plain`으로 SMILES 또는 MOL 텍스트를
함께 올린다. 본 구현의 paste 경로는 그 텍스트를 받아 RDKit이 파싱한다 — `.cdx`
바이너리 코드 경로는 존재하지 않는다(코드베이스에서 확인 가능). SMILES/MOL 텍스트
붙여넣기 → 물성 계산은 E2E로 검증했다(§1의 404 ms가 그 측정). 한계의 정직한 기재:
**실제 ChemDraw 데스크톱이 설치된 환경에서의 상호운용 확인은 본 PoC 환경(폐쇄
컨테이너)에서 수행하지 못했다.** MOL 블록 경로가 동일하므로 리스크는 낮게 보나,
파일럿 첫 주에 실기기 확인을 권장한다.

## 6. 남는 리스크는 무엇인가

**① 연구원의 그리기 UX 저항 — 정량화 불가.** Ketcher는 기능적으로 충분하지만
(그리기·템플릿·reaction 모드·단축키), ChemDraw에 10년 익은 손과는 다르다. 이것은
벤치마크로 측정할 수 없는 종류의 리스크이며, 측정할 수 없다는 사실을 그대로 적는다.
"교육으로 해결 가능합니다" 같은 근거 없는 낙관은 쓰지 않는다. 완화 수단은 파일럿
부서 우선 적용과 병행 사용 기간 확보뿐이다.

**② 재단이 지금 겪는 문제의 본질은 벤더 종속이다.** PerkinElmer(현 Revvity)
라이선스 종속이 서비스 중단으로 이어진 것이 이 사업의 출발점이다. 그 해결책으로
다시 Revvity의 ChemDraw SDK에 종속되는 것은 **같은 리스크의 재발**이다. 본 PoC의
스택(Ketcher Apache-2.0 / RDKit BSD)은 소스가 공개되어 있어 공급 중단이라는 개념
자체가 성립하지 않는다. — 이 논점을 제시하는 우리가 그 대안을 제공하는 당사자라는
**이해상충은 숨기지 않는다.** 판단 근거는 전부 본 저장소의 실측·테스트로 공개되어
있으며, 제3자가 `make test` / `make bench`로 재현할 수 있다.

**③ 운영 환경 실검증 잔여.** 이식형 백엔드는 SQLite로 실검증했고(사용 SQL 부분집합은
Oracle SE와 호환) Postgres+Cartridge 기준선은 `PG_DSN` 제공 시 동일 동치성 스위트에
편입되도록 준비되어 있으나, **Oracle SE 실계측과 Docker 스택 실기동은 본 환경(데몬
부재)에서 수행하지 못했다.** 실데이터 parity(§4)와 함께 파일럿 착수 시 최우선 항목이다.

---

## 재현 방법

```bash
make test    # pytest 175 + vitest + tsc
make bench   # 30쿼리 × 3규모 실측 → reports/bench.md
make parity  # 실측 SDF 전수 대조 → reports/parity.md (data/*.sdf 필요)
make dev     # docker compose — 데모 스택
```

산출물: 데모 앱(스크린샷 `reports/demo-v1.png`, `demo-stoich-v1.png`,
`demo-search-v1.png`) · 설계 결정 기록 `docs/DECISIONS.md`.
