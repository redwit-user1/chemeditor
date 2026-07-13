# SPEC — KMEDIhub ELN PoC

기술 명세. 무엇을 만들지, 어떤 계약으로 만들지.

---

## 0. 배경 요약

| 항목 | 값 |
|---|---|
| 고객 | KMEDIhub 신약개발지원센터 |
| 대체 대상 | PerkinElmer Signals ELN + CBOE (`http://192.168.1.27/COEManager`) |
| 사용자 규모 | 300~400명 (KMEDIhub 통합 기준) |
| 운영 DB | Oracle Standard Edition |
| 데이터 규모 | 화합물 라이브러리 5,342건 / 노트 구조검색 결과 ~170건 |
| 마이그레이션 | **미수행** (무결성 증빙 문제) — 기존 서버 읽기전용 보존 |

**PoC 목적:** ChemDraw SDK 없이 구현 가능함을 실측으로 증명.

---

## 1. 아키텍처

```
┌─ web (React + TS + Vite) ─────────────────────┐
│  KetcherPanel      — 구조 에디터              │
│  PropertyPanel     — 실시간 물성 (MW/Formula) │
│  StoichTable       — 반응 계량 자동계산       │
│  StructureSearch   — 구조 검색 UI             │
│  InventoryDialog   — 시약 검색 팝업           │
└────────────────┬──────────────────────────────┘
                 │ REST /api/v1
┌────────────────▼──────────────────────────────┐
│  api (FastAPI)                                │
│   ├ chem/       계산·정규화·변환              │
│   ├ search/     ChemSearchBackend (인터페이스) │
│   │    ├ PgCartridgeBackend   (기준선)        │
│   │    └ PortableFPBackend    (Oracle 이식용) │
│   ├ inventory/  시약                          │
│   └ sdf/        import / export               │
└────────────────┬──────────────────────────────┘
                 │
        ┌────────▼────────┐
        │ PostgreSQL 16   │  PoC
        │ + RDKit Cartridge│
        └─────────────────┘
                 ▲
                 │ PortableFPBackend는 이 경계를
                 │ Oracle SE로 갈아끼울 수 있어야 함
```

### 디렉토리

```
.
├─ CLAUDE.md
├─ Makefile
├─ docker-compose.yml
├─ docs/
│   ├─ SPEC.md
│   ├─ TASKS.md
│   └─ DECISIONS.md
├─ data/                      # 재단 실측 SDF (read-only)
├─ reports/                   # 산출물 (generated)
│   ├─ feasibility.md
│   ├─ bench.md
│   └─ parity.md
├─ api/
│   ├─ src/eln/
│   │   ├─ chem/
│   │   │   ├─ properties.py      # MW, Formula, ExactMass
│   │   │   ├─ standardize.py     # 염 제거, 호변이성
│   │   │   ├─ convert.py         # MOL ↔ SMILES ↔ InChI
│   │   │   ├─ fingerprint.py     # Morgan FP
│   │   │   └─ stoich.py          # 계량 계산
│   │   ├─ search/
│   │   │   ├─ base.py            # ChemSearchBackend (ABC)
│   │   │   ├─ pg_cartridge.py
│   │   │   └─ portable_fp.py
│   │   ├─ sdf/
│   │   │   ├─ reader.py
│   │   │   └─ writer.py
│   │   ├─ models.py
│   │   └─ api.py
│   ├─ tests/
│   └─ bench/
└─ web/
    ├─ src/
    └─ tests/
```

---

## 2. 도메인 모델

### 2.1 Compound (화합물 라이브러리)

```python
class Compound:
    reg_id: int              # VW_MIXTURE_REGNUMBER.REGID
    mixture_id: int          # VW_MIXTURE_REGNUMBER.MIXTUREID
    mol_formula: str         # 원본 SDF 값 (검증 대조용)
    mol_weight: float        # 원본 SDF 값 (검증 대조용)
    components: list[Component]

class Component:
    ordinal: int             # SDF 필드의 (n)
    reg_id: int              # MIXTURES.REGID (n)
    molblock: str            # ★ 정본
    mol_formula: str         # 원본
    mol_weight: float        # 원본
    raw_cdx: str | None      # STRUCTUREAGGREGATION Base64 — 보존만, 파싱 금지

    # 파생 (RDKit 계산)
    canonical_smiles: str
    inchikey: str
    computed_formula: str
    computed_mw: float
    computed_exact_mw: float
    morgan_fp: bytes         # 2048bit, radius=2
```

**Mixture 취급:** 컴포넌트 단위로 인덱싱하고 검색한다. 결과는 부모 `reg_id`로 롤업하여 중복 제거한다. 한 mixture의 서로 다른 컴포넌트가 매치되어도 결과는 1건이다.

### 2.2 Reagent (시약)

구글시트 + 내부망 Inventory Enterprise 스크린샷 기반.

```python
class Reagent:            # 물질 마스터
    id: int
    substance_name: str
    cas_no: str | None
    mol_formula: str | None
    mol_weight: float | None
    molblock: str | None
    morgan_fp: bytes | None

class Container:          # 재고 단위
    id: int
    reagent_id: int
    container_id: str     # 바코드 (예: C33000884, C11000832)
    internal_id: int      # 예: 483
    location: str         # 예: "KIM JINA", "Stock Room 3 7F N"
    amount: float
    unit: str             # ml, g, mg
    supplier: str | None  # Aldrich, ChemScene, BLDpharm, Angene, TCI...
    catalog_no: str | None
    cost: float | None
    lot_no: str | None
    received_at: date | None
    expires_at: date | None
    owner: str | None     # 실사용자
```

### 2.3 Reaction / Stoichiometry

합성 노트 스크린샷 기준. 컬럼 순서까지 맞춘다.

```python
class ReactionRow:
    rxn_id: str           # I, II, III (로마숫자)
    role: Literal["reactant", "product", "solvent"]
    name: str             # pyrocatechol, acetic anhydride
    molblock: str
    mol_formula: str      # C6H6O2
    formula_weight: float # 110.112
    is_limiting: bool
    eq: float
    sample_mass: float | None    # g
    moles: float | None          # mmol
    volume: float | None         # ml
    molarity: float | None
    density: float | None        # g/ml
    # product 전용
    theo_mass: float | None
    actual_mass: float | None
    purity: float | None
    yield_pct: float | None
    theo_mol: float | None
    actual_mol: float | None
```

---

## 3. 화학 계산 계약

### 3.1 물성 (`chem/properties.py`)

```python
def compute_properties(molblock: str) -> Properties:
    """MOL → 물성. 실패 시 ParseError, 조용히 None 반환 금지."""
```

| 필드 | RDKit 호출 |
|---|---|
| `formula` | `rdMolDescriptors.CalcMolFormula(mol)` |
| `mol_weight` | `Descriptors.MolWt(mol)` |
| `exact_mass` | `Descriptors.ExactMolWt(mol)` |
| `heavy_atoms` | `mol.GetNumHeavyAtoms()` |

**sanitize 실패 처리:** `Chem.MolFromMolBlock(mb, sanitize=True)`가 `None`이면 예외를 던진다. `sanitize=False` 폴백은 **명시적 플래그가 있을 때만** 허용하고, 이 경우 결과에 `sanitized=False` 를 표시한다. 조용한 폴백은 데이터를 오염시킨다.

### 3.2 Stoichiometry (`chem/stoich.py`)

순수 함수. RDKit 불필요. 완전 테스트 대상.

```
mmol      = mass_g / FW * 1000
eq        = mmol / limiting_mmol
volume_ml = mass_g / density        (density 있을 때)
mmol      = volume_ml * molarity    (용액일 때)
theo_mol  = limiting_mmol * (product_coeff / limiting_coeff)
theo_mass = theo_mol * product_FW / 1000
yield_pct = actual_mol / theo_mol * 100
```

**검증 케이스** — 합성 노트 스크린샷 실측값:
```
pyrocatechol     C6H6O2   FW 110.112  0.5 g    → 4.54 mmol  eq 1.000  [limiting]
acetic anhydride C4H6O3   FW 102.089  0.464 g  → 4.54 mmol  eq 1.000  d 1.082 g/ml  vol 0.428 ml
product          C8H8O3   FW 152.149  theo 0.691 g  actual 0.2558 g  yield 37.0 %  theo_mol 4.54  actual_mol 1.681
solvent          Acetonitrile 5 ml
reaction molarity 0.908 M   temperature 80 °C
```

이 케이스가 통과하지 않으면 stoich 모듈은 완성이 아니다. 반올림 자리수까지 맞춘다.

### 3.3 정규화 (`chem/standardize.py`)

```python
def standardize(mol) -> Mol:
    # RDKit MolStandardize
    # 1. Cleanup (원자가, 방향족성)
    # 2. FragmentParent (염 제거) — 옵션
    # 3. Uncharger
    # 4. TautomerCanonicalizer — 옵션 (느림, 검색 인덱싱 시에만)
```

**주의:** 염 제거는 MW를 바꾼다. 원본 SDF와 대조할 때는 **정규화 전 값**을 쓴다. 검색 인덱싱에만 정규화를 적용한다. 이 둘을 섞으면 parity 리포트가 거짓말을 한다.

### 3.4 Fingerprint (`chem/fingerprint.py`)

```python
MORGAN_RADIUS = 2
MORGAN_NBITS  = 2048

def morgan_fp(mol) -> bytes:      # 256 bytes
def tanimoto(a: bytes, b: bytes) -> float
def popcount(fp: bytes) -> int
```

FP는 `bytes`로 직렬화한다. Postgres `BYTEA`, Oracle `RAW(2000)` / `BLOB` 양쪽 호환.

---

## 4. 검색 백엔드 계약 ★ 핵심

### 4.1 인터페이스 (`search/base.py`)

```python
class ChemSearchBackend(ABC):
    @abstractmethod
    def substructure(self, query_molblock: str, limit: int = 200) -> list[SearchHit]: ...

    @abstractmethod
    def exact(self, query_molblock: str) -> list[SearchHit]: ...

    @abstractmethod
    def similarity(self, query_molblock: str, threshold: float = 0.7,
                   limit: int = 200) -> list[SearchHit]: ...

class SearchHit:
    reg_id: int          # 부모 REGID (롤업 후)
    component_ids: list[int]
    score: float | None  # similarity만
```

### 4.2 `PgCartridgeBackend` — 기준선

```sql
-- substructure
SELECT reg_id FROM components WHERE m @> mol_from_molblock(:q);
-- similarity
SET rdkit.tanimoto_threshold = 0.7;
SELECT reg_id, tanimoto_sml(fp, morganbv_fp(mol_from_molblock(:q))) AS score
FROM components WHERE fp % morganbv_fp(mol_from_molblock(:q));
```

정확도의 **정답지(ground truth)** 로만 쓴다. 성능 수치를 회신서에 옮기지 않는다.

### 4.3 `PortableFPBackend` — Oracle 이식 대상

2단계:

```
[1] 스크리닝 (SQL)
    쿼리 FP의 켜진 비트 집합을 후보가 모두 포함해야 substructure 매치 가능.
    → 표준 SQL로 popcount(query_fp AND candidate_fp) = popcount(query_fp)
    Postgres:  get_bit / 사전계산 서브블록
    Oracle:    UTL_RAW.BIT_AND + 사전계산 popcount 컬럼

[2] 정밀 매칭 (앱, RDKit)
    후보에 대해 mol.HasSubstructMatch(query) 로 확정
```

**금지:** Postgres 전용 문법. `bit_count()`, `%` 연산자, `@>` 연산자, `ARRAY`, RDKit 타입(`mol`, `bfp`, `sfp`).

**허용:** `SELECT`, `WHERE`, `JOIN`, `IN`, 표준 집계, 정수 popcount 컬럼.

**팁 — popcount 스크리닝을 SQL로 옮기는 방법:**
FP 2048bit를 32개의 64bit 정수 컬럼(`fp_00`..`fp_31`)으로 분해 저장.
substructure 후보 조건은 각 워드마다 `(fp_i & :q_i) = :q_i`. 비트 AND는 Oracle `BITAND`, Postgres `&` 둘 다 표준적으로 존재.
쿼리 FP에서 비트가 하나도 없는 워드는 조건에서 제외 → 조건 수 감소.

추가로 `heavy_atom_count >= :q_heavy` 필터를 먼저 걸면 후보가 크게 준다.

Similarity는 Tanimoto 상한 가지치기:
```
popcount(A ∩ B) <= min(|A|, |B|)
Tanimoto <= min(|A|,|B|) / max(|A|,|B|)
→ |B| 가 [t*|A|, |A|/t] 범위 밖이면 threshold t를 넘을 수 없음 → SQL에서 제외
```
`fp_popcount` 컬럼에 인덱스를 걸고 범위 조건으로 자른다.

### 4.4 동치성 테스트 (타협 불가)

```python
@pytest.mark.parametrize("q", QUERY_SET)   # 최소 30개 쿼리
def test_backends_agree(q):
    a = set(h.reg_id for h in pg.substructure(q))
    b = set(h.reg_id for h in fp.substructure(q))
    assert a == b
```

**결과 집합이 완전히 같아야 한다.** 부분집합이 아니다. 스크리닝이 후보를 놓치면(false negative) PoC의 전제가 무너진다. 스크리닝은 **재현율 100%** 여야 하고, 정밀도만 앱 레이어가 보완한다.

similarity는 `threshold` 경계에서 부동소수 오차가 나므로 `score` 비교는 `abs(a-b) < 1e-6`.

---

## 5. API

`/api/v1`

| Method | Path | Body / Query | Response |
|---|---|---|---|
| POST | `/chem/properties` | `{molblock}` | `{formula, mol_weight, exact_mass, heavy_atoms, sanitized}` |
| POST | `/chem/convert` | `{input, from_, to}` | `{output}` |
| POST | `/chem/stoich` | `{rows[], limiting_rxn_id}` | `{rows[]}` |
| POST | `/search/substructure` | `{molblock, limit}` | `{hits[], elapsed_ms, backend}` |
| POST | `/search/exact` | `{molblock}` | `{hits[], elapsed_ms, backend}` |
| POST | `/search/similarity` | `{molblock, threshold, limit}` | `{hits[], elapsed_ms, backend}` |
| GET | `/compounds/{reg_id}` | — | `Compound` |
| GET | `/inventory/search` | `?name=&cas=&location=` | `{containers[]}` |
| POST | `/inventory/search/structure` | `{molblock, mode}` | `{containers[]}` |
| POST | `/sdf/import` | multipart | `{imported, failed, errors[]}` |
| POST | `/sdf/export` | `{reg_ids[]}` | `text/plain` SDF |

모든 검색 응답에 `elapsed_ms`, `backend` 를 포함한다. 벤치마크가 프로덕션 코드 경로를 그대로 타야 한다.

백엔드 선택: 환경변수 `CHEM_SEARCH_BACKEND=pg_cartridge|portable_fp` (기본 `portable_fp`).

---

## 6. 프론트엔드

### 6.1 KetcherPanel

```
ketcher-react + ketcher-standalone
```

- `onChange` (debounce 150ms) → `getMolfile()` → `POST /chem/properties` → PropertyPanel 갱신
- **paste 이벤트 처리**
  ```
  ClipboardEvent.clipboardData
    ├ 'text/plain'  ← ChemDraw는 여기에 SMILES 또는 MOL을 넣는다. ★ 이걸 쓴다.
    ├ 'chemical/x-mdl-molfile'
    └ 'image/png'   ← 무시
  ```
  `.cdx` 바이너리는 다루지 않는다.
- Reaction mode 지원 (`+`, `→` 화살표)

### 6.2 PropertyPanel

Ketcher 캔버스 **바로 아래** 고정. 이게 데모의 핵심 순간이다.

```
┌──────────────────────────────┐
│  Mol Formula   C29H32N2O2    │
│  Mol Weight    440.59        │
│  Exact Mass    440.2464      │
│  Heavy Atoms   33            │
│  ⏱ 42 ms                     │
└──────────────────────────────┘
```

응답 지연을 화면에 표시한다. 숨기지 않는다.

### 6.3 StoichTable

합성 노트 스크린샷 컬럼 그대로:

```
Reactants & Products
Rxn ID │ Reactant │ MF │ FM │ Limit? │ Eq │ Sample Mass │ Moles │ Vol │ Molarity │ d
Rxn ID │ Product ID │ Product │ MF │ FM │ Theo Mass │ Actual Mass │ Purity │ Yield │ Theo Mol │ Actual Mol

Solvents:  Name │ Ratio │ Volume
Reaction Conditions:  Molarity │ Pressure │ Temperature
```

`Limit?` 체크박스 변경 → 전 행 eq 재계산.

### 6.4 InventoryDialog

Reaction 탭 `Add → Inventory Search`. 기존 워크플로 재현.

- 탭: `Simple Search` (Name / CAS) | `Structure Search` (Exact / Substructure)
- 결과 컬럼: `Internal ID │ Container ID │ Location │ Name │ CAS │ Cost │ Size │ Supplier`
- 행 선택 → Reaction 테이블에 reactant/reagent 로 삽입

---

## 7. 검증

### 7.1 Parity (`make parity` → `reports/parity.md`)

전 5,342 레코드에 대해:

| 검사 | 기준 |
|---|---|
| MolFormula | RDKit 계산 == SDF 원본, **완전 일치** |
| MolWt | `abs(계산 - 원본) <= 0.01` |
| MOL 파싱 | sanitize 성공률 |

리포트 형식:
```markdown
# Parity Report
총 레코드: 5342   컴포넌트: 6110
파싱 성공: 6098 (99.80%)   실패: 12

## Formula 일치:  6081 / 6098 (99.72%)
## MolWt 일치(±0.01): 6075 / 6098 (99.62%)

## 불일치 상세
| reg_id | comp | 원본 Formula | 계산 Formula | 원본 MW | 계산 MW | Δ | 추정 사유 |
|---|---|---|---|---|---|---|---|
| 3709 | 1 | C29H32N2O2 | C29H32N2O2 | 440.5870 | 440.5872 | 0.0002 | 원자량 테이블 차이 |
...

## 사유 분류
- 원자량 테이블 차이: n건
- 염 포함 여부: n건
- 원자가 오류(원본): n건
- 파싱 실패: n건
```

불일치를 숨기거나 허용오차를 늘려서 통과시키지 않는다. **불일치 자체가 재단에 보고할 발견 사항이다.**

### 7.2 Benchmark (`make bench` → `reports/bench.md`)

- 데이터: 실측 5,342건. 추가로 합성 증식 50,000 / 500,000건 시나리오.
- 쿼리: 30개 대표 substructure (benzene, aniline, piperazine, Boc, pyrimidine, biphenyl 등)
- 워밍업 10회 후 **100회 반복**, p50 / p95 / p99
- **`PortableFPBackend` 수치가 정본.** Cartridge는 비교 행으로만.

```markdown
| 쿼리 | 규모 | 백엔드 | 히트 | p50 | p95 | p99 | 후보수(스크리닝) |
|---|---|---|---|---|---|---|---|
| aniline | 5,342 | portable_fp | 170 | 180ms | 340ms | 410ms | 1,204 |
| aniline | 5,342 | pg_cartridge | 170 | 22ms | 45ms | 60ms | — |
```

목표 미달 시 **미달로 적는다.** 그리고 원인(스크리닝 정밀도 낮음, 워드 조건 과다 등)과 개선안을 병기한다.

---

## 8. 문서화 의무

`docs/DECISIONS.md` 에 다음을 기록한다. 각 항목 5줄 이내.

- Ketcher vs MarvinJS vs JSME 선택 근거
- FP 파라미터(radius=2, 2048bit) 선택 근거 및 대안 검토
- 워드 분할 크기(64bit × 32) 선택 근거
- 정규화 파이프라인에 tautomer 포함/제외 결정
- Mixture 롤업 정책

---

## 9. 이 PoC가 답해야 할 질문

회신서(`reports/feasibility.md`)는 정확히 이 질문들에 답한다.

1. ChemDraw SDK 없이 "붙여넣기 → 즉시 물성 계산"이 되는가? **[실측 ms]**
2. Oracle SE 제약(Cartridge 불가) 하에서 substructure 검색이 3초 내에 되는가? **[PortableFP p95]**
3. 5,342건 → 50,000건 → 500,000건 확장 시 어디서 깨지는가? **[임계점]**
4. RDKit 계산값이 기존 CBOE 데이터와 일치하는가? **[parity %]**
5. ChemDraw 클립보드 붙여넣기가 `.cdx` 파서 없이 동작하는가? **[예/아니오 + 근거]**
6. 남는 리스크는 무엇인가? **[UX 저항 — 정량화 불가, 정성 기술]**

각 답에 **실측 근거**를 단다. 근거 없는 "가능합니다"는 이 문서의 목적을 배신한다.
