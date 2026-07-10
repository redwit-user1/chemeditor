# TASKS

순서가 곧 의존성이다. 각 마일스톤 끝에서 멈추고 결과를 보고한다.

체크박스는 **테스트가 통과하고 커밋된 후에만** 채운다.

---

## M0 — 기반

- [ ] `docker-compose.yml` — postgres:16 + RDKit Cartridge 이미지, api, web
- [ ] `Makefile` — dev / test / bench / parity / load-sdf
- [ ] `api/` FastAPI 스캐폴드, `/healthz`
- [ ] `web/` Vite + React + TS 스캐폴드
- [ ] pytest + vitest 동작 확인
- [ ] `data/*.sdf` 배치 (read-only 취급)

**완료 조건:** `make dev` 후 `curl localhost:8000/healthz` 200.

---

## M1 — 화학 계산 코어 ★ 이게 PoC의 심장

TDD. 테스트를 먼저 쓴다.

- [ ] `chem/convert.py` — MOL ↔ SMILES ↔ InChI ↔ InChIKey
- [ ] `chem/properties.py` — `compute_properties(molblock)`
  - [ ] sanitize 실패 시 예외. 조용한 `None` 반환 금지
  - [ ] `sanitized: bool` 플래그 노출
- [ ] `chem/standardize.py` — cleanup / uncharge / fragment parent / tautomer(옵션)
- [ ] `chem/fingerprint.py` — Morgan FP(r=2, 2048bit) → `bytes`, tanimoto, popcount
- [ ] `chem/stoich.py` — 순수 함수

**stoich 필수 테스트 (합성 노트 실측값):**
```
pyrocatechol     C6H6O2  FW 110.112  0.5 g   → 4.54 mmol, eq 1.000, limiting
acetic anhydride C4H6O3  FW 102.089  0.464 g → 4.54 mmol, eq 1.000, d 1.082, vol 0.428 ml
product          C8H8O3  FW 152.149  theo 0.691 g, actual 0.2558 g, yield 37.0%
                                      theo_mol 4.54, actual_mol 1.681
solvent Acetonitrile 5 ml → reaction molarity 0.908 M
```

**완료 조건:** 위 케이스가 반올림 자리수까지 통과. `pytest api/tests/chem` 전체 green.

---

## M2 — SDF 파이프라인 + Parity 검증

- [ ] `sdf/reader.py`
  - [ ] `VW_MIXTURE_REGNUMBER.*` 파싱
  - [ ] `MIXTURES.*` (n) 다중 컴포넌트 파싱
  - [ ] `STRUCTUREAGGREGATION` → `raw_cdx`에 보존만. **파싱 시도 금지**
- [ ] `sdf/writer.py` — 동일 스키마로 round-trip
- [ ] `models.py` + 마이그레이션 (compounds, components)
- [ ] `make load-sdf`
- [ ] `make parity` → `reports/parity.md`

**완료 조건:**
- round-trip: import → export → import 시 REGID/MOL 손실 0
- `reports/parity.md` 생성. 불일치 전건이 사유와 함께 표에 있을 것.

> 불일치가 나와도 괜찮다. **숨기는 것이 문제다.** 허용오차(MW ±0.01, Formula 완전일치)를 조정하지 않는다.

---

## M3 — 검색 백엔드 두 개 ★ Oracle 이식 가능성의 증명

- [ ] `search/base.py` — `ChemSearchBackend` ABC, `SearchHit`
- [ ] `search/pg_cartridge.py` — 정답지
- [ ] `search/portable_fp.py`
  - [ ] FP 2048bit → `fp_00`..`fp_31` (64bit × 32) 컬럼 분해
  - [ ] `fp_popcount`, `heavy_atom_count` 컬럼 + 인덱스
  - [ ] 스크리닝: 워드별 `(fp_i & :q_i) = :q_i`, 쿼리 비트 없는 워드 제외
  - [ ] 정밀 매칭: 앱에서 `HasSubstructMatch`
  - [ ] similarity: `fp_popcount` 범위 가지치기 `[t*|A|, |A|/t]`
- [ ] Mixture 롤업 (컴포넌트 매치 → 부모 reg_id 중복제거)

### 동치성 테스트 (게이트)

- [ ] 30개 쿼리 세트 (benzene, aniline, piperazine, Boc, pyrimidine, biphenyl, ...)
- [ ] `test_backends_agree` — substructure 결과 집합 **완전 일치**
- [ ] exact 결과 집합 완전 일치
- [ ] similarity — reg_id 집합 일치 + score `abs(Δ) < 1e-6`

**완료 조건:** 30/30 통과. **하나라도 실패하면 M4로 넘어가지 않는다.**

> 스크리닝 재현율은 100%여야 한다. false negative는 곧 PoC 전제의 붕괴다.
> 정밀도가 낮은 건(후보 과다) 괜찮다 — 그건 성능 문제이지 정합성 문제가 아니다.

---

## M4 — 벤치마크

- [ ] `bench/` — 워밍업 10, 반복 100, p50/p95/p99
- [ ] 규모 시나리오: 5,342 (실측) / 50,000 / 500,000 (합성 증식)
- [ ] 스크리닝 후보 수도 함께 기록 (정밀도 진단용)
- [ ] `make bench` → `reports/bench.md`

**완료 조건:** 표가 채워짐.

> **`PortableFPBackend` 수치가 정본.** Cartridge는 비교행.
> 3초 목표 미달 시 **미달로 적는다.** 목표를 낮추지 않는다. 원인과 개선안을 병기한다.

---

## M5 — API

- [ ] `POST /chem/properties`, `/chem/convert`, `/chem/stoich`
- [ ] `POST /search/{substructure,exact,similarity}`
  - [ ] 응답에 `elapsed_ms`, `backend` 포함
- [ ] `GET /compounds/{reg_id}`
- [ ] `GET /inventory/search`, `POST /inventory/search/structure`
- [ ] `POST /sdf/import`, `POST /sdf/export`
- [ ] `CHEM_SEARCH_BACKEND` 환경변수 (기본 `portable_fp`)

**완료 조건:** OpenAPI 문서 생성. 통합 테스트 green.

---

## M6 — 프론트엔드 ★ 데모의 얼굴

- [ ] `KetcherPanel` — ketcher-react 임베드
- [ ] `onChange` debounce 150ms → `/chem/properties`
- [ ] **paste 핸들러** — `clipboardData.getData('text/plain')` 에서 SMILES/MOL 파싱
  - [ ] `.cdx` 바이너리 경로 없음을 코드로 확인
- [ ] `PropertyPanel` — 캔버스 바로 아래. Formula / MolWt / ExactMass / HeavyAtoms / **⏱ ms 표시**
- [ ] `StoichTable` — 합성 노트 컬럼 그대로. `Limit?` 토글 시 전 행 eq 재계산
- [ ] `StructureSearch` — 그리기 → 검색 → 결과 그리드(구조 썸네일 + REGID + Formula + MW)
- [ ] `InventoryDialog` — Simple(Name/CAS) | Structure(Exact/Substructure) 탭
  - [ ] 결과 컬럼: Internal ID / Container ID / Location / Name / CAS / Cost / Size / Supplier
  - [ ] 행 선택 → Reaction 테이블 삽입

**완료 조건:** 브라우저에서 구조를 붙여넣으면 1초 내 하단에 물성이 뜬다. 이게 안 되면 나머지는 무의미하다.

---

## M7 — 회신서

- [ ] `reports/feasibility.md`

SPEC §9의 6개 질문에 **실측 근거를 붙여** 답한다.

1. ChemDraw SDK 없이 붙여넣기 → 즉시 계산? → **[E2E ms]**
2. Oracle SE 제약 하 substructure 3초 내? → **[PortableFP p95]**
3. 5,342 → 50,000 → 500,000 확장 시 임계점? → **[측정치]**
4. RDKit 계산 == 기존 CBOE 데이터? → **[parity %]**
5. `.cdx` 파서 없이 ChemDraw 붙여넣기 동작? → **[예/아니오 + 근거]**
6. 남는 리스크? → **[UX 저항. 정량화 불가함을 명시]**

- [ ] `docs/DECISIONS.md` 작성 (SPEC §8 항목들)

**완료 조건:**
- 모든 수치가 `reports/bench.md`, `reports/parity.md` 에서 온 실측치.
- 추정치·희망치 0건.
- 미달 항목이 있으면 그대로 기술.

> 이 문서의 독자는 재단 정보전산팀장과 원장이다.
> "가능합니다"라고 쓰고 싶은 유혹이 클 것이다. 근거가 없으면 쓰지 않는다.

---

## 진행 규칙

- 마일스톤 하나 끝 → **멈추고 보고** → 다음으로.
- 테스트 없이 구현 코드를 쓰지 않는다.
- M3 동치성 테스트가 실패한 상태로 M4 이후를 진행하지 않는다.
- 성능 목표에 못 미치면 목표가 아니라 **결과를 고친다** (= 사실대로 적는다).
- RDKit `None` 반환을 무시하는 코드는 리뷰에서 거절한다.
