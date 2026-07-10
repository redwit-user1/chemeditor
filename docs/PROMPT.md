# Claude Code 프롬프트 모음

---

## 1. 킥오프 (첫 실행)

리포지토리 루트에 `CLAUDE.md`, `docs/SPEC.md`, `docs/TASKS.md` 를 넣고 Claude Code를 켠 뒤:

```
CLAUDE.md, docs/SPEC.md, docs/TASKS.md 를 읽어라.

이 프로젝트는 KMEDIhub 신약개발지원센터의 전자연구노트 대체 시스템
기술 실현가능성 PoC다. PerkinElmer ChemDraw SDK 없이, 오픈소스 스택
(Ketcher + RDKit)만으로 동등 기능이 구현 가능한지를 실측으로 증명하는 것이
유일한 목적이다.

핵심 제약 두 가지를 먼저 이해했는지 확인하고 싶다:

  (1) 운영 DB는 Oracle Standard Edition이고, RDKit PostgreSQL Cartridge를
      쓸 수 없다. 그래서 모든 화학 검색은 ChemSearchBackend 인터페이스 뒤에
      두고, PgCartridgeBackend(정답지)와 PortableFPBackend(Oracle 이식 대상)
      두 구현이 동일한 결과 집합을 반환해야 한다.

  (2) 회신서에 쓸 성능 수치는 PortableFPBackend 실측치뿐이다.
      Cartridge 수치는 참고용이다.

읽고 나서, 구현을 시작하기 전에 다음을 답해라:

  - 이 PoC가 실패했다고 판정되는 조건은 정확히 무엇인가?
  - SPEC에서 모호하거나 서로 충돌하는 지점이 있는가?
  - M3의 "동치성 테스트"가 왜 게이트인지 네 말로 설명해봐라.
  - 시작 전에 나에게 물어야 할 것이 있는가?

답을 듣기 전까지 코드를 쓰지 마라.
```

---

## 2. 마일스톤 실행 (M0 이후 매번)

```
docs/TASKS.md 의 M{N} 을 수행하라.

규칙:
  - TDD. 테스트를 먼저 쓴다.
  - 커밋은 작게. 한 커밋 = 한 논리 변경.
  - 체크박스는 테스트 통과 + 커밋 후에만 채운다.
  - M{N} 이 끝나면 멈추고 보고하라. M{N+1} 로 넘어가지 마라.

보고에 포함할 것:
  - 완료한 체크박스
  - 통과/실패한 테스트 수
  - 예상과 달랐던 것
  - 다음 마일스톤 진입 전 내 판단이 필요한 지점
```

---

## 3. M1 (화학 계산) 전용

```
docs/TASKS.md M1 을 수행하라.

chem/stoich.py 는 순수 함수다. RDKit을 import하지 마라.

필수 테스트 케이스는 재단의 실제 합성 노트 스크린샷에서 읽어온 값이다.
반올림 자리수까지 맞춰라. 값을 맞추려고 계산식을 바꾸지 말고,
계산식이 맞는데 값이 안 나오면 그 사실을 나에게 보고하라.

  pyrocatechol     C6H6O2  FW 110.112  0.5 g   → 4.54 mmol, eq 1.000, [limiting]
  acetic anhydride C4H6O3  FW 102.089  0.464 g → 4.54 mmol, eq 1.000,
                                                  d 1.082 g/ml, vol 0.428 ml
  product          C8H8O3  FW 152.149  theo 0.691 g, actual 0.2558 g,
                                        yield 37.0%, theo_mol 4.54, actual_mol 1.681
  solvent          Acetonitrile 5 ml
  → reaction molarity 0.908 M, temperature 80 °C

chem/properties.py 에서 Chem.MolFromMolBlock 이 None을 반환하면
반드시 예외를 던져라. 조용히 None을 리턴하거나 sanitize=False로
자동 폴백하는 코드는 데이터를 오염시킨다. 폴백은 호출자가 명시적으로
요청할 때만, 그리고 결과에 sanitized=False 를 달아라.
```

---

## 4. M3 (검색 백엔드) 전용 — 가장 중요

```
docs/TASKS.md M3 을 수행하라. 이것이 이 PoC의 핵심이다.

PortableFPBackend 는 Oracle Standard Edition으로 그대로 이식될 코드다.
따라서 SQL에 다음을 절대 쓰지 마라:

  금지: bit_count(), % 연산자, @> 연산자, ARRAY,
        RDKit 타입(mol, bfp, sfp), Postgres 전용 함수 일체

  허용: SELECT / WHERE / JOIN / IN, 표준 집계,
        비트 AND (Postgres &, Oracle BITAND),
        사전계산된 정수 popcount 컬럼

설계:
  - Morgan FP 2048bit → fp_00..fp_31 (64bit × 32) 컬럼으로 분해
  - fp_popcount, heavy_atom_count 컬럼 + 인덱스
  - 스크리닝: 워드마다 (fp_i & :q_i) = :q_i.
    쿼리 비트가 0인 워드는 조건에서 빼서 조건 수를 줄여라.
  - heavy_atom_count >= :q_heavy 를 먼저 걸어 후보를 줄여라
  - 정밀 매칭은 앱에서 RDKit HasSubstructMatch
  - similarity: Tanimoto 상한 가지치기.
    |B| 가 [t*|A|, |A|/t] 밖이면 threshold를 넘을 수 없다 → SQL에서 제외

동치성 테스트가 게이트다:
  - 30개 쿼리에 대해 두 백엔드의 substructure 결과 reg_id 집합이 완전히 같아야 한다
  - 부분집합이 아니라 완전 일치다
  - 스크리닝 재현율은 100%여야 한다. false negative 하나가 PoC 전제를 무너뜨린다
  - 정밀도가 낮은 건(후보 과다) 괜찮다. 그건 성능 문제이지 정합성 문제가 아니다

30개 중 하나라도 실패하면 M4로 넘어가지 마라. 실패를 보고하라.
"거의 다 맞으니 넘어가자"는 판단을 스스로 내리지 마라.
```

---

## 5. M4 (벤치마크) 전용

```
docs/TASKS.md M4 를 수행하라.

측정 규칙:
  - 워밍업 10회 후 100회 반복
  - p50 / p95 / p99 를 낸다. 평균만 내지 마라
  - 스크리닝 통과 후보 수도 함께 기록하라 (정밀도 진단용)
  - 규모: 5,342건(실측) / 50,000 / 500,000 (합성 증식)
  - 벤치마크는 프로덕션 API 코드 경로를 그대로 타야 한다.
    별도의 빠른 경로를 만들지 마라

reports/bench.md 에 표로 남겨라.

목표는 substructure p95 ≤ 3초 (PortableFPBackend, 5,342건 기준)다.

목표에 미달하면 미달로 적어라. 다음 중 어떤 것도 하지 마라:
  - 목표치를 조정한다
  - Cartridge 수치를 대신 적는다
  - 유리한 쿼리만 골라 표에 넣는다
  - 캐시가 데워진 상태의 수치만 기록한다

미달이면 원인을 진단하고(스크리닝 정밀도, 워드 조건 과다, 인덱스 미사용 등)
개선안을 병기하라. 미달 자체는 실패가 아니다. 숨기는 것이 실패다.
```

---

## 6. M7 (회신서) 전용

```
docs/TASKS.md M7 을 수행하라. reports/feasibility.md 를 써라.

독자는 KMEDIhub 정보전산팀장과 원장이다. 기술 결정을 내릴 사람들이다.

SPEC §9 의 6개 질문에 답하되, 모든 수치는 reports/bench.md 와
reports/parity.md 에서 가져와라. 그 두 파일에 없는 숫자는 쓰지 마라.

  1. ChemDraw SDK 없이 붙여넣기 → 즉시 물성 계산이 되는가?  [E2E ms]
  2. Oracle SE 제약 하에서 substructure 검색이 3초 내인가?   [PortableFP p95]
  3. 5,342 → 50,000 → 500,000 확장 시 어디서 깨지는가?      [임계점]
  4. RDKit 계산값이 기존 CBOE 데이터와 일치하는가?           [parity %]
  5. .cdx 파서 없이 ChemDraw 클립보드 붙여넣기가 동작하는가?  [예/아니오 + 근거]
  6. 남는 리스크는 무엇인가?                                 [정성 기술]

6번에 대해: 유일한 실질 리스크는 연구원의 그리기 UX 저항이다.
Ketcher는 기능적으로 충분하지만 ChemDraw에 10년 익은 손과는 다르다.
이건 벤치마크로 측정할 수 없다. 측정할 수 없다는 사실을 그대로 써라.
"교육으로 해결 가능합니다" 같은 근거 없는 낙관을 쓰지 마라.

추가로 반드시 언급할 것:
  재단이 지금 겪는 문제는 PerkinElmer 라이선스 종속으로 인한 서비스 중단이다.
  그 해결책으로 다시 Revvity(구 PerkinElmer)의 ChemDraw SDK에 종속되는 것은
  같은 리스크의 재발이다. 이 논점을 명시하라. 단, 우리가 대안을 팔고 있다는
  이해상충을 감추지 말고, 판단 근거를 투명하게 제시하라.

미달 항목이 있으면 미달로 적어라. 이 문서에서 "가능합니다"라고 쓰고 싶은
유혹이 가장 클 것이다. 근거가 없으면 쓰지 마라.
```

---

## 7. 상황별 짧은 프롬프트

### 막혔을 때
```
지금 무엇이 막혔는지 설명하고, 시도한 것과 그 결과를 나열하라.
추측으로 코드를 고치지 말고, 가설을 하나 세우고 그것만 검증하라.
세 번 고쳐도 안 되면 멈추고 아키텍처를 의심하라.
```

### 동치성 테스트 실패 시
```
실패한 쿼리와, 두 백엔드가 반환한 reg_id 집합의 차집합을 보여줘라.
PgCartridge에만 있고 PortableFP에 없는 것(false negative)이 있는가?
있다면 그것이 스크리닝 로직의 결함이다. 정밀 매칭 이전에서 잘렸다는 뜻이다.
어느 워드 조건에서 잘렸는지 추적하라.

반대 방향(PortableFP에만 있음)이라면 정밀 매칭이 덜 엄격한 것이다.
```

### parity 불일치가 나올 때
```
불일치를 사유별로 분류하라:
  - 원자량 테이블 차이 (Δ가 소수 3자리 이하)
  - 염 포함 여부 (Formula에 HCl, TFA 등)
  - 원본 데이터의 원자가 오류
  - 파싱 실패

허용오차를 늘려서 통과시키지 마라. 불일치 자체가 재단에 보고할 발견이다.
```

### 리뷰 요청
```
방금 작업한 것을 리뷰하라. 특히:
  - RDKit이 None을 반환할 수 있는 지점에서 처리가 되어 있는가
  - PortableFPBackend에 Postgres 전용 문법이 섞이지 않았는가
  - 테스트가 구현을 따라 쓰여진 것은 아닌가 (테스트가 먼저였는가)
  - 성능 수치 중 추정치가 섞이지 않았는가
```

---

## 8. 리포 초기 파일 배치

```
프로젝트루트/
├─ CLAUDE.md          ← 제공
├─ PROMPT.md          ← 이 파일 (Claude Code는 읽지 않아도 됨)
├─ docs/
│   ├─ SPEC.md        ← 제공
│   ├─ TASKS.md       ← 제공
│   └─ DECISIONS.md   ← 빈 파일로 생성, M7에서 채움
├─ data/
│   └─ 화합물_라이브러리_시스템_검색결과_다운파일.sdf
└─ reports/           ← 빈 디렉토리
```

`data/` 의 SDF 파일명은 ASCII로 바꾸는 편이 낫다: `compound_library_export.sdf`
