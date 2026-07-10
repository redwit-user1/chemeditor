# CLAUDE.md

## 프로젝트

**KMEDIhub ELN PoC** — 대구경북첨단의료산업진흥재단(KMEDIhub) 신약개발지원센터 전자연구노트 대체 시스템의 기술 실현가능성 검증 프로토타입.

PerkinElmer Signals ELN + CBOE 서비스 중단에 따른 대체. **ChemDraw SDK를 쓰지 않고** 오픈소스 화학정보학 스택으로 동등 기능을 구현할 수 있음을 증명하는 것이 이 코드베이스의 유일한 목적이다.

## 이 PoC가 증명해야 하는 단 하나

> 구조식을 붙여넣는 즉시, 하단에서 분자식·분자량이 자동 계산된다.

재단이 "메인 기능"으로 지목한 것. 나머지는 이걸 둘러싼 맥락이다.

## 기술 스택 (확정)

| 레이어 | 선택 | 이유 |
|---|---|---|
| 구조 에디터 | **Ketcher** (Apache 2.0) | ChemDraw 대체, 브라우저 임베드 |
| 화학 계산 | **RDKit** (BSD, Python) | MW/Formula/ExactMass, 정규화, FP |
| 백엔드 | **FastAPI** (Python 3.11+) | RDKit 네이티브 바인딩 |
| 프론트 | **React + TypeScript + Vite** | — |
| PoC DB | **PostgreSQL 16 + RDKit Cartridge** | 개발 편의 |
| 운영 DB (목표) | **Oracle SE** | 재단 요건 |
| 컨테이너 | Docker Compose | — |

### DB에 관한 절대 규칙

PoC는 Postgres+Cartridge로 빠르게 간다. **하지만 운영은 Oracle SE이고 Cartridge를 못 쓴다.**

따라서 **모든 화학 검색은 `ChemSearchBackend` 인터페이스 뒤에 숨긴다.** 구현체 2개를 반드시 유지한다:

- `PgCartridgeBackend` — 개발/벤치마크 기준선
- `PortableFPBackend` — fingerprint 비트를 일반 컬럼에 저장, SQL popcount 스크리닝 → 앱 레이어 RDKit 정밀 매칭. **이것이 Oracle SE로 이식될 실제 구현이다.**

두 백엔드는 **동일한 테스트 스위트를 통과해야 하고, 동일한 결과 집합을 반환해야 한다.** 이 동치성이 깨지면 Oracle 이식 가능성 주장이 무너진다. 이건 PoC의 존재 이유와 직결된다.

`PortableFPBackend`에는 Postgres 전용 문법을 쓰지 않는다. `bit_count`, `ARRAY`, `@>`, `%` 연산자 금지. 표준 SQL + `RAW`/`BLOB` 호환 타입만.

## 스코프

### 만든다 (P0)
1. Ketcher 임베드, 그리기 + 붙여넣기
2. 실시간 물성 패널 — MolFormula, MolWt, ExactMolWt
3. Reaction Scheme + Stoichiometry 자동 계산 테이블
4. Substructure / Exact / Similarity 검색 (양쪽 백엔드)
5. Reagent Inventory 검색 팝업 (CAS/이름/구조 → Reaction 탭 삽입)
6. SDF import/export

### 안 만든다
- Sign & Close, Witness 워크플로 (명세로 대체)
- DN 등록, Batch Explorer
- 인증/권한, TSA 타임스탬프
- **`.cdx` 바이너리 파서** — ChemDraw는 클립보드에 `text/plain`으로 SMILES/MOL도 올린다. paste 이벤트에서 그걸 잡는다. 바이너리 파싱 불필요.

## 데이터

`data/` 에 재단 실측 SDF가 있다. 스키마:

```
> <VW_MIXTURE_REGNUMBER.REGID>          # 3709
> <VW_MIXTURE_REGNUMBER.MIXTUREID>      # 2125
> <VW_MIXTURE_REGNUMBER.Mol Wt>         # 440.587005615234
> <VW_MIXTURE_REGNUMBER.Mol Formula>    # C29H32N2O2
> <MIXTURES.REGID> (n)                  # 컴포넌트별 반복, n=1..3
> <MIXTURES.Mol Wt> (n)
> <MIXTURES.Mol Formula> (n)
> <MIXTURES.STRUCTUREAGGREGATION> (n)   # ChemDraw 12.0 Base64 바이너리 — 무시
> <VW_MIXTURE_STRUCTURE.STRUCTURE> (n)
```

`STRUCTUREAGGREGATION`은 **읽지 않는다.** MOL 블록(V2000)을 정본으로 삼는다. Base64 원문은 `raw_cdx` 컬럼에 보존만 하고 파싱 시도 금지.

Mixture는 다중 컴포넌트를 가진다. 컴포넌트 단위로 인덱싱하고, 검색 결과는 부모 REGID로 롤업한다.

## 검증 규칙 (타협 불가)

RDKit이 계산한 `MolWt` / `MolFormula`가 기존 시스템의 SDF 필드값과 일치하는지 **전 레코드 대조**한다. 불일치는 조용히 넘기지 않는다. 불일치 목록과 사유(염 처리, 호변이성, 원자가 오류)를 `reports/parity.md`에 남긴다.

MolWt 허용 오차: **±0.01**. MolFormula: **완전 일치**. 이 기준을 낮추자는 제안은 거절한다 — 재단 데이터와 우리 계산이 다르다는 건 그 자체가 발견해야 할 사실이다.

## 성능 목표

| 항목 | 목표 | 측정 |
|---|---|---|
| 물성 계산 (paste → 화면 갱신) | ≤ 1초 | E2E |
| Substructure 검색 (5,342건) | ≤ 3초 p95 | `PortableFPBackend` 기준 |
| Similarity 검색 | ≤ 3초 p95 | 동일 |

**`PortableFPBackend` 기준으로 측정한다.** Cartridge 수치는 참고용일 뿐, 회신서에 쓸 숫자가 아니다.

## 개발 원칙

- **TDD.** 화학 계산 로직은 특히. 테스트 없이 짜지 않는다.
- 커밋은 작게. 한 커밋 = 한 논리 변경.
- RDKit이 `None`을 반환하는 경우(파싱 실패)를 절대 무시하지 않는다. sanitize 실패는 로깅하고 카운트한다.
- 성능 수치는 **실측만** 기록한다. 추정치를 표에 넣지 않는다.
- 벤치마크는 워밍업 후 최소 100회 반복, p50/p95/p99를 낸다.

## 명령

```bash
make dev        # docker compose up
make test       # pytest + vitest
make bench      # 벤치마크 → reports/bench.md
make parity     # SDF 대조 검증 → reports/parity.md
make load-sdf   # data/*.sdf → DB 적재
```

## 산출물

이 PoC의 최종 결과물은 코드가 아니라 **회신서**다.

- `reports/feasibility.md` — 재단 제출용 구현 가능 여부 회신
- `reports/bench.md` — 실측 성능
- `reports/parity.md` — 데이터 정합 검증
- 데모 가능한 로컬 앱

숫자가 목표에 못 미치면 **미달로 적는다.** 통과하도록 목표를 조정하지 않는다.
