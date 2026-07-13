# 기능 정의서 (Feature Definition)

- **문서 목적**: KMEDIhub ELN PoC(전자연구노트 대체 시스템 기술검증 프로토타입)가 실제로 구현한 기능을 정의합니다. 모든 항목은 코드베이스에서 직접 확인한 내용만 기술합니다.
- **대상 독자**: 재단 의사결정자, PM
- **최종수정일**: 2026-07-13
- **관련 문서**: `docs/SPEC.md`(기술 명세), `docs/PRD.md`(요구사항), `docs/DEPLOY.md`(배포), `reports/`(성능·정합 실측)

---

## 1. 전체 기능 맵

| 기능 ID | 기능명 | 한 줄 요약 | 주요 화면/버튼 | 관련 API 엔드포인트 |
|---|---|---|---|---|
| F-01 | 구조 그리기 / 붙여넣기 | Ketcher 캔버스에 구조를 그리거나 ChemDraw 등에서 복사한 텍스트(SMILES/MOL)를 붙여넣음 | 캔버스, 툴바 "Paste" | (편집 자체는 브라우저 내 처리) |
| F-02 | 실시간 물성 패널 | 구조 변경 즉시 분자식·분자량 등 9개 물성을 RDKit으로 자동 계산·표시 | 하단 PropertyBar | `POST /api/v1/chem/properties` |
| F-03 | 구조 검색 3종 | 캔버스 구조를 질의로 부분구조/완전일치/유사도 검색 | 툴바 "Search…" → Structure Search 패널 | `POST /api/v1/search/substructure` · `/exact` · `/similarity` |
| F-04 | Stoichiometry 자동 계산 | 캔버스의 반응식을 읽어 당량·질량·mmol·수율을 자동 계산하는 표 | 툴바 "Stoich…" → Stoichiometry 패널 | `POST /api/v1/chem/reaction`, `POST /api/v1/chem/stoich` |
| F-05 | Reagent Inventory 검색·삽입 | 시약 재고를 이름/CAS/위치 또는 구조로 검색해 캔버스에 삽입 | 툴바 "Reagents…" → Inventory Search 팝업 | `GET /api/v1/inventory/search`, `POST /api/v1/inventory/search/structure` |
| F-06 | SDF import / export | SDF 등 표준 화학 파일 열기·저장, 서버측 SDF 검증·내보내기 | 툴바 "Open…", "Save As" | `POST /api/v1/sdf/import`, `POST /api/v1/sdf/export` |
| F-07 | 구조 썸네일 (depict) | SMILES를 2D 구조 SVG 이미지로 렌더링(검색 결과 그리드용) | 검색 결과 목록의 구조 이미지 | `GET /api/v1/depict` |

보조 엔드포인트(단독 기능이 아닌 지원 API): `GET /api/v1/health`(인덱스 크기·검색 백엔드 확인), `POST /api/v1/chem/convert`(MOL ↔ SMILES ↔ InChI ↔ InChIKey 형식 변환), `GET /api/v1/compounds/{reg_id}`(REGID별 컴포넌트 조회).

---

## 2. 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│  브라우저 (프론트엔드: React + TypeScript + Vite)           │
│  배포: Vercel — <Vercel 배포 URL>                           │
│                                                             │
│  ┌───────────────────────────────┐  ┌────────────────────┐  │
│  │ Ketcher 에디터 (Apache 2.0)   │  │ 사이드 패널        │  │
│  │ · 구조 그리기/붙여넣기        │  │ · Structure Search │  │
│  │ · standalone WASM 구조 서비스 │  │ · Stoichiometry    │  │
│  │   (편집·형식 변환은 브라우저  │  │ · Inventory Search │  │
│  │    안에서 자체 처리)          │  │   (모달)           │  │
│  └──────────────┬────────────────┘  └────────┬───────────┘  │
│                 │ 'change' 이벤트 (150ms 디바운스)          │
│  ┌──────────────▼────────────────────────────▼───────────┐  │
│  │ PropertyBar — Mol Formula / Mol Weight / Exact Mass 등 │  │
│  └──────────────┬─────────────────────────────────────────┘ │
└─────────────────┼───────────────────────────────────────────┘
                  │ HTTPS (REST, /api/v1)
┌─────────────────▼───────────────────────────────────────────┐
│  백엔드 (FastAPI + RDKit, Python)                           │
│  배포: Hostinger VPS + Traefik HTTPS                        │
│  https://chemeditor.srv1711580.hstgr.cloud                  │
│                                                             │
│  · chem/  — 물성 계산, 반응 파싱, stoich 순수 계산 모듈     │
│  · search/ — ChemSearchBackend 인터페이스                   │
│      ├ PortableFPBackend (기본값, Oracle SE 이식 대상)      │
│      └ PgCartridgeBackend (개발/벤치마크 기준선)            │
│  · reagents/ — 시약 재고 검색                               │
│  · sdf/ — SDF 로더·파서·라이터                              │
│                                                             │
│  검색 인덱스: 서버 기동 시 CHEM_INDEX_SDF 환경변수가        │
│  가리키는 SDF(재단 실측 데이터)로 1회 구축                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 기능 상세

### F-01. 구조 그리기 / 붙여넣기 (Ketcher, ChemDraw 클립보드 호환)

| 항목 | 내용 |
|---|---|
| **기능명** | Ketcher 기반 구조 편집 및 클립보드 붙여넣기 |
| **목적** | ChemDraw SDK 없이 브라우저에서 구조식을 그리고, 기존 ChemDraw 사용자가 복사한 구조를 그대로 이어받기 위함. PoC의 출발점이 되는 입력 수단입니다. |
| **사용자 시나리오** | 연구자가 ChemDraw에서 구조를 복사한 뒤 본 시스템 캔버스에 붙여넣으면 동일 구조가 나타난다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: (a) 캔버스에서 마우스로 직접 그리기, (b) 캔버스에서 ⌘/Ctrl+V, (c) 툴바 "Paste" 버튼 클릭.
2. **처리**: "Paste" 버튼은 클립보드의 텍스트(`navigator.clipboard.readText()`)를 읽어 Ketcher의 `addFragment()`로 캔버스에 추가합니다. ChemDraw는 복사 시 클립보드에 `text/plain` 형태의 SMILES 또는 MOL 블록도 함께 올리므로, 이 텍스트를 그대로 사용합니다. 구조 해석·렌더링은 Ketcher의 standalone WASM 구조 서비스가 브라우저 안에서 수행하며 이 단계에서는 백엔드 통신이 없습니다.
3. **출력**: 캔버스에 구조가 표시되고, 상태바에 "Pasted structure from clipboard." 메시지가 나타납니다. 구조 변경 이벤트가 발생하여 F-02(물성 패널)가 즉시 이어집니다.

**관련 화면/버튼**: 캔버스(Ketcher 에디터), 툴바 "Paste", "New"(캔버스 비우기). 툴바 안내문구: "Paste a structure (⌘/Ctrl+V) or draw — properties compute below."

**관련 API**: 없음(브라우저 내 처리). 붙여넣기 직후 F-02가 `POST /api/v1/chem/properties`를 호출합니다.

**제약·주의사항**
- ChemDraw의 **바이너리 `.cdx` 파일 파싱은 지원하지 않습니다**(의도된 스코프 제외). 클립보드의 텍스트 형식(SMILES/MOL)을 사용하며, 이것으로 붙여넣기 요구를 충족합니다.
- 클립보드가 비어 있으면 "Clipboard is empty." 오류를 표시합니다.
- 브라우저 클립보드 읽기 권한이 필요합니다(HTTPS 환경에서 동작).

---

### F-02. 실시간 물성 패널 (PropertyBar)

| 항목 | 내용 |
|---|---|
| **기능명** | 실시간 분자 물성 자동 계산 패널 |
| **목적** | 재단이 지목한 본 PoC의 핵심 검증 대상 — "구조식을 붙여넣는 즉시 하단에서 분자식·분자량이 자동 계산된다"를 RDKit으로 구현. |
| **사용자 시나리오** | 연구자가 구조를 붙여넣거나 그리면 별도 조작 없이 하단 패널에 분자식과 분자량이 즉시 나타난다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: 캔버스의 모든 구조 변경(그리기, 붙여넣기, 파일 열기, 삭제). Ketcher의 `change` 이벤트를 구독합니다.
2. **처리**: 150ms 디바운스 후 캔버스의 MOL 블록을 `POST /api/v1/chem/properties`로 전송 → 백엔드가 RDKit으로 파싱(SMILES/MOL 자동 판별)·sanitize 후 물성을 계산합니다. 이전 요청이 완료되기 전에 새 변경이 오면 이전 요청을 중단(abort)하여 오래된 응답이 최신 결과를 덮어쓰지 않도록 합니다.
3. **출력**: 하단 PropertyBar에 아래 9개 항목이 표시됩니다(코드 기준 실제 표시 항목).

| 구분 | 표시 라벨 | 내용 | 표시 형식 |
|---|---|---|---|
| 주요 | Mol Formula | 분자식 (아래첨자 렌더링) | 예: C₂₉H₃₂N₂O₂ |
| 주요 | Mol Weight | 분자량 | 소수 2자리 |
| 주요 | Exact Mass | 정밀질량 | 소수 4자리 |
| 주요 | Heavy Atoms | 중원자 수 | 정수 |
| 보조 | Rings | 고리 수 | 정수 |
| 보조 | H donors | 수소결합 공여체 수 | 정수 |
| 보조 | H acceptors | 수소결합 수용체 수 | 정수 |
| 보조 | TPSA | 위상 극성 표면적 | 소수 2자리 |
| 보조 | cLogP | 계산 LogP | 소수 2자리 |

패널 하단에 계산 엔진 표시("RDKit · 입력 형식")가 나타나며, 정상 계산 시 **실측 왕복 지연시간(⏱ n ms)** 이 함께 표시됩니다. 지연시간은 숨기지 않고 그대로 노출합니다.

**관련 화면/버튼**: 하단 상시 표시 패널(PropertyBar). 별도 버튼 없이 자동 동작.

**관련 API**: `POST /api/v1/chem/properties`

**제약·주의사항**
- 파싱 실패 시 500 오류가 아니라 `ok=false`와 실패 사유가 반환되며, 패널에 "Cannot compute: (사유)"로 표시됩니다. RDKit의 파싱 실패(`None` 반환)는 절대 조용히 무시하지 않습니다.
- 빈 캔버스에서는 "Draw or paste a structure" 안내가 표시됩니다.
- 성능 목표는 붙여넣기→화면 갱신 1초 이내이며, 실측치는 `reports/bench.md`를 참조하십시오(본 문서에는 추정치를 기재하지 않습니다).

---

### F-03. 구조 검색 3종 (Substructure / Exact / Similarity)

| 항목 | 내용 |
|---|---|
| **기능명** | 부분구조·완전일치·유사도 구조 검색 |
| **목적** | 등록 화합물 라이브러리(재단 실측 SDF)에서 구조 기반 검색을 제공. Oracle SE로 이식 가능한 검색 방식(`PortableFPBackend`)으로 동작함을 검증하는 것이 핵심. |
| **사용자 시나리오** | 연구자가 캔버스에 벤젠 고리를 그리고 substructure 검색을 실행하면 해당 골격을 포함한 등록 화합물 목록이 REGID 단위로 나온다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: 캔버스에 그려진 구조(질의 구조) + 검색 모드 선택(`substructure` / `similarity` / `exact`). similarity 모드에서는 Tanimoto 임계값 슬라이더(0.10~1.00, 0.05 단위, 기본 0.50)를 추가로 조절합니다.
2. **처리**: "Search using current structure" 버튼 클릭 → 캔버스의 MOL 블록을 해당 검색 엔드포인트로 전송 → 백엔드가 SMILES로 정규화 후 검색 백엔드에서 2단계 검색을 수행합니다. 기본 백엔드는 `portable_fp`이며, 표준 SQL만 사용하는 fingerprint 스크리닝(1차) 후 RDKit 정밀 매칭(2차)을 거칩니다. 부분구조 스크리닝에는 Pattern Fingerprint, 유사도에는 Morgan fingerprint + popcount 범위 프루닝을 사용합니다.
3. **출력**: 검색 결과가 부모 **REGID 단위로 롤업**되어 목록으로 표시됩니다. 각 결과 행에는 구조 썸네일(F-07), REGID, 분자식, 분자량, (similarity의 경우) Tanimoto 점수가 표시됩니다. 패널에는 사용된 백엔드 이름, 서버측 검색 소요시간(ms), 인덱스 정보(컴포넌트 수·데이터 출처)가 항상 표시됩니다.

**관련 화면/버튼**: 툴바 "Search…" → 우측 "Structure Search" 패널. 모드 선택 세그먼트 버튼(substructure / similarity / exact), "Search using current structure" 버튼, similarity용 "Tanimoto ≥ n.nn" 슬라이더.

**관련 API**: `POST /api/v1/search/substructure`, `POST /api/v1/search/exact`, `POST /api/v1/search/similarity` (보조: `GET /api/v1/health`로 인덱스·백엔드 정보 조회)

**제약·주의사항**
- 검색 인덱스는 **서버 기동 시 1회** 구축됩니다(`CHEM_INDEX_SDF` 환경변수가 가리키는 SDF, 미지정 시 내장 픽스처). 실행 중 화합물 추가/재색인 UI는 PoC 범위 밖입니다.
- 두 검색 백엔드(`PortableFPBackend` / `PgCartridgeBackend`)는 동일 테스트를 통과하고 동일 결과 집합을 반환하도록 유지됩니다. 성능 수치는 Oracle 이식 대상인 `PortableFPBackend` 기준으로만 보고합니다.
- 빈 캔버스로 검색 시 "Draw or paste a query structure first." 안내가 표시됩니다.
- Mixture(다중 컴포넌트) 화합물은 컴포넌트 단위로 색인되며, 결과는 부모 REGID로 묶여 표시됩니다.

---

### F-04. Stoichiometry 자동 계산

| 항목 | 내용 |
|---|---|
| **기능명** | 반응 화학양론(Stoichiometry) 자동 계산 표 |
| **목적** | 기존 ELN의 Reaction Scheme + Stoichiometry 표를 대체. 반응식에서 반응물·생성물을 자동 추출하고 당량·질량·mmol·이론수득량·수율을 서버에서 일관되게 계산. |
| **사용자 시나리오** | 연구자가 캔버스에 "반응물 → 생성물" 반응식을 그리고 표를 불러온 뒤, 한계 반응물의 투입 질량만 입력하면 나머지 행의 질량·mmol·이론수득량이 자동으로 채워진다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: 캔버스에 그린 반응식(반응 화살표 포함). "Load reaction from canvas" 버튼으로 RXN 형식을 읽어옵니다.
2. **처리**: ① `POST /api/v1/chem/reaction`이 반응식을 반응물/생성물 종(species)으로 분해하고 각 종의 분자식·분자량(RDKit)을 반환 → ② 표의 어느 셀이든 수정할 때마다 `POST /api/v1/chem/stoich`가 전체 행을 재계산합니다. 계산은 **방향성**을 가집니다: 각 행은 "주어진 값"(mass / eq / volume)을 선언하고, 나머지는 한계(limiting) 반응물 기준으로 유도됩니다. 예) eq 입력 → 질량·부피 유도, 질량 입력 → eq 유도, 몰농도 입력(용액 시약) → 부피가 입력값이 되고 eq가 유도됩니다. 모든 산술은 백엔드 순수 계산 모듈에서 수행되며 프론트는 표시만 합니다.
3. **출력**: 3개 표 + 반응 조건.
   - **Reactants**: Rxn(로마숫자 ID) / Reactant / MF / FW / Limit?(라디오) / Eq / Mass (g) / mmol / Vol (ml) / Molarity / d(밀도)
   - **Products**: ID / Product / MF / FW / Theo Mass / Actual Mass / Purity / Yield % / Theo mmol / Act mmol — 실제 수득 질량(Actual Mass)을 입력하면 수율이 자동 계산됩니다. Purity는 기록용 입력이며 수율 계산에는 반영되지 않습니다.
   - **Solvents**: Name / Ratio / Volume (ml). "+ Add Blank Solvent"로 행 추가.
   - **Reaction Conditions**: 반응 몰농도(자동 계산), Pressure(기록용 입력), Temperature (°C, 기본 25).

**관련 화면/버튼**: 툴바 "Stoich…" → 우측 "Stoichiometry" 패널, "Load reaction from canvas", 반응물 행의 "Limit?" 라디오, "+ Add Blank Solvent".

**관련 API**: `POST /api/v1/chem/reaction`, `POST /api/v1/chem/stoich`

**제약·주의사항**
- 캔버스에 반응 화살표가 없으면 "Draw a reaction (reactants → products) on the canvas first." 안내가 표시됩니다.
- 한계 반응물은 반드시 질량 입력 기준입니다(eq 기준 한계 설정은 순환 정의라 허용하지 않음). 한계 반응물을 바꾸면 전 행이 서버에서 재계산됩니다.
- Solvents의 Ratio 열, Products의 Purity 열, Reaction Conditions의 Pressure는 **기록용 표시 항목**이며 계산에는 사용되지 않습니다.
- 계산 오류(잘못된 입력 조합 등)는 표 상단에 오류 메시지로 표시됩니다.

---

### F-05. Reagent Inventory 검색·캔버스 삽입

| 항목 | 내용 |
|---|---|
| **기능명** | 시약 재고(Inventory) 검색 팝업 및 캔버스 삽입 |
| **목적** | 기존 ELN의 "Add → Inventory Search" 워크플로 대체. 시약을 이름/CAS/보관위치 또는 구조로 찾아 반응 캔버스에 바로 투입. |
| **사용자 시나리오** | 연구자가 "Reagents…"를 눌러 CAS 번호로 시약을 찾고 Insert를 누르면 해당 시약 구조가 캔버스에 삽입된다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: 두 가지 탭 중 선택.
   - **Simple Search** 탭: Substance name / CAS No / Location 텍스트 필터. 입력 후 200ms 디바운스로 자동 검색됩니다(별도 검색 버튼 없음).
   - **Structure Search** 탭: 캔버스의 현재 구조를 질의로 substructure 또는 exact 모드 선택 후 "Search using canvas structure" 클릭.
2. **처리**: Simple 탭은 `GET /api/v1/inventory/search`, Structure 탭은 `POST /api/v1/inventory/search/structure`를 호출합니다. 구조 검색은 F-03과 동일한 이식 가능 검색 방식을 사용합니다.
3. **출력**: 컨테이너(용기) 단위 결과 표 — Internal ID / Container ID / Location / Name / CAS / Cost / Size(수량+단위) / Supplier 열과 행별 **Insert** 버튼. Insert 클릭 시 시약의 SMILES가 Ketcher `addFragment()`로 캔버스에 추가되고 팝업이 닫히며, 상태바에 "Inserted (시약명) (용기 ID, 위치)." 메시지가 표시됩니다.

**관련 화면/버튼**: 툴바 "Reagents…" → "Inventory Search" 모달. 탭 "Simple Search" / "Structure Search", 각 행의 "Insert" 버튼.

**관련 API**: `GET /api/v1/inventory/search`, `POST /api/v1/inventory/search/structure`

**제약·주의사항**
- PoC의 재고 데이터는 코드에 내장된 **대표 상용 시약 목록(37종: Acetic acid, DMF, THF, TFA 등)** 입니다. 재단의 실제 재고 시스템 연동은 PoC 범위 밖이며, 운영 시 재고 DB에서 적재하는 것을 전제로 합니다.
- 구조 검색 탭에서 캔버스가 비어 있으면 "Draw a structure on the canvas to search by structure." 안내가 표시됩니다.

---

### F-06. SDF import / export

| 항목 | 내용 |
|---|---|
| **기능명** | 표준 화학 파일 형식 열기/저장 및 서버측 SDF 검증·내보내기 |
| **목적** | 기존 시스템(재단 SDF 스키마)과의 데이터 이동 경로 확보. ELN 교환 형식인 MDL SDF를 중심으로 손실 없는 반출입을 검증. |
| **사용자 시나리오** | 연구자가 기존 시스템에서 내려받은 SDF 파일을 "Open…"으로 열면 구조가 캔버스에 로드되고, 작업한 구조를 "Save As"로 SDF로 저장한다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **클라이언트 열기(Open…)**: 파일 선택 → 텍스트로 읽어 Ketcher가 형식을 자동 감지하여 캔버스에 로드. 허용 확장자: `.sdf, .sd, .mol, .rxn, .ket, .smi, .smiles, .txt`.
2. **클라이언트 저장(Save As)**: 캔버스 구조를 선택한 형식으로 직렬화하여 브라우저 다운로드. 지원 형식(메뉴 표기 그대로):

| 메뉴 라벨 | 확장자 | 용도 |
|---|---|---|
| MDL SDfile (*.sdf) | .sdf | ELN 교환 형식(구조+데이터) |
| MDL Molfile V2000 (*.mol) | .mol | 단일 구조 교환 표준 |
| MDL Molfile V3000 (*.mol) | .mol | 대형/질의 구조용 확장 형식 |
| MDL Rxnfile (*.rxn) | .rxn | 반응식 교환 형식 |
| SMILES (*.smi) | .smi | 압축 문자열 표기 |
| Ketcher document (*.ket) | .ket | 에디터 내 무손실 저장(JSON) |

3. **서버측 import 검증**: `POST /api/v1/sdf/import`에 SDF 파일을 업로드하면 백엔드 로더가 파싱하여 적재 가능 건수(imported)·실패 건수(failed)·레코드별 오류 목록(최대 50건)을 반환합니다. **PoC 의미론**: 이 엔드포인트는 "무엇이 적재될지"를 보고하며, 실제 검색 인덱스는 서버 기동 시 `CHEM_INDEX_SDF`로 구축됩니다.
4. **서버측 export**: `POST /api/v1/sdf/export`에 REGID 목록을 전달하면 색인된 화합물을 **재단 SDF 스키마 형식**의 텍스트로 재구성하여 반환합니다.

**관련 화면/버튼**: 툴바 "Open…", "Save As"(드롭다운 메뉴).

**관련 API**: `POST /api/v1/sdf/import`, `POST /api/v1/sdf/export`

**제약·주의사항**
- 텍스트 기반 화학 형식만 취급합니다. ChemDraw 바이너리 `.cdx`는 열지 않습니다(스코프 제외 — F-01 참조).
- SDF 내 `STRUCTUREAGGREGATION` 필드(ChemDraw Base64 바이너리)는 파싱하지 않으며, MOL 블록(V2000)을 정본으로 사용합니다.
- 캔버스가 비어 있는 상태로 저장을 시도하면 "Nothing to export — the canvas is empty." 오류가 표시됩니다.
- SDF 필드값(분자식·분자량)과 RDKit 계산값의 전 레코드 대조 결과는 `reports/parity.md`에 별도 기록됩니다.

---

### F-07. 구조 썸네일 (depict)

| 항목 | 내용 |
|---|---|
| **기능명** | 2D 구조 SVG 렌더링(썸네일) |
| **목적** | 검색 결과 목록에서 REGID·분자식만으로는 화합물을 식별하기 어려우므로, 결과 그리드에 구조 그림을 표시. |
| **사용자 시나리오** | 검색 결과 목록의 각 행 왼쪽에 해당 화합물의 구조 그림이 표시되어 눈으로 바로 확인한다. |

**동작 방식 (입력 → 처리 → 출력)**

1. **입력**: SMILES 문자열과 이미지 크기(`w`, `h` — 기본 140×100px, 허용 범위 32~600px). 검색 결과의 각 hit에 포함된 SMILES로 프론트가 `<img>` 태그의 URL을 구성합니다.
2. **처리**: 백엔드가 RDKit `MolDraw2DSVG`로 2D 좌표를 생성해 SVG를 그립니다. 동일 (SMILES, 크기) 조합은 LRU 캐시(최대 4,096건)로 재사용합니다.
3. **출력**: `image/svg+xml` 응답. 검색 결과 목록(F-03)의 각 행에 지연 로딩(lazy)으로 표시됩니다.

**관련 화면/버튼**: Structure Search 패널의 결과 목록(별도 버튼 없음).

**관련 API**: `GET /api/v1/depict?smiles=...&w=140&h=100`

**제약·주의사항**
- 파싱 불가능한 SMILES는 HTTP 422("bad structure")로 응답합니다.
- 이미지 크기는 32~600px 범위로 제한됩니다.
- 검색 hit의 SMILES는 색인된 컴포넌트 저장소에서 조회되므로, 색인에 없는 구조의 썸네일은 표시되지 않습니다.

---

## 4. 공통 참고 사항

- **오류 처리 원칙**: 화학 파싱 실패는 모든 API에서 HTTP 500이 아닌 `ok=false` + 사유 문자열로 반환되며, UI는 이를 상태바 또는 해당 패널에 표시합니다.
- **성능 표시 원칙**: 물성 계산과 구조 검색은 실측 지연시간(ms)을 화면에 항상 표시합니다. 성능 실측치는 `reports/bench.md`, 데이터 정합 검증은 `reports/parity.md`를 참조하십시오.
- **PoC 범위 제외**(본 문서에 기술하지 않은 이유): Sign & Close / Witness 워크플로, DN 등록, Batch Explorer, 인증·권한, TSA 타임스탬프, `.cdx` 바이너리 파서.
