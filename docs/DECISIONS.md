# DECISIONS

SPEC §8이 요구하는 결정 기록. 각 항목 5줄 이내.

## 구조 에디터: Ketcher (vs MarvinJS / JSME)

Ketcher: Apache 2.0(라이선스 비용 0), React 컴포넌트 + WASM standalone(폐쇄망 자립),
reaction 모드·RXN 출력 지원. MarvinJS는 상용 라이선스 — PerkinElmer 종속을 벗어나려는
프로젝트가 다른 벤더 종속을 새로 만드는 것은 자기모순. JSME는 reaction 모드와
확장성이 부족. 잔여 리스크는 기능이 아니라 ChemDraw에 익숙한 손의 UX 저항.

## FP 파라미터: Morgan radius=2, 2048bit — 단, similarity 전용

ECFP4 상당(radius=2)은 유사도 검색의 사실상 표준. 2048bit는 5천~50만 규모에서
충돌율/저장량의 무난한 절충. 1024bit(충돌↑)와 4096bit(popcount 창 손익 미미, 저장 2배)
대안 검토 후 기각. **Substructure 스크리닝에는 쓰지 않는다** (아래 항목).

## SPEC §4.3 수정: substructure 스크리닝은 PatternFP (SPEC의 Morgan 지시는 버그)

Morgan/ECFP는 부분구조 포함성(Q⊆T ⇒ bits(Q)⊆bits(T))이 성립하지 않는다 — 원자
환경 해시라 fragment와 embedded fragment의 비트가 다르다. Morgan으로 스크리닝하면
false negative가 생겨 SPEC §4.4의 "재현율 100%" 게이트가 자기 설계를 탈락시킨다.
`Chem.PatternFingerprint`(2048bit, 스크리닝 전용 설계)로 교체했고, 30쿼리 동치성
게이트 30/30 통과가 그 증거다. portable_fp.py 상단에 상세 주석.

## 워드 분할: 64bit × 32 (signed)

SQLite/Oracle 정수는 signed 64bit — `int.from_bytes(..., signed=True)`로 저장하면
two's-complement에서도 `(pat_i & :q) = :q` 포함성 판정이 정확함을 테스트로 고정.
64bit 워드 32개는 조건 수(≤32, 0-워드 생략으로 실제 평균 ~10개)와 컬럼 수의 절충.
16/32bit 분할(조건 수 2~4배)과 BLOB 단일 컬럼(표준 SQL로 비트 AND 불가) 기각.

## 정규화 파이프라인: tautomer는 기본 제외

TautomerEnumerator.Canonicalize는 느리고(레코드당 수십 ms), 검색 인덱싱 시 옵션으로만.
Cleanup→FragmentParent(옵션)→Uncharger 순서 — FragmentParent 후에도 전하가 남으므로
Uncharger가 뒤. **Parity 대조는 정규화 전 값 사용** (염 제거가 MW를 바꾸므로 섞으면
parity 리포트가 거짓말을 한다). standardize.py docstring에 명시.

## Mixture 롤업 정책

컴포넌트 단위 인덱싱, 결과는 부모 reg_id로 롤업(중복 제거). Similarity는 컴포넌트 중
최고 score 유지, 동점은 낮은 comp_index(결정론). 한 mixture의 여러 컴포넌트가
매치되어도 결과는 1건 — CBOE의 사용자 기대와 일치.

## Stoichiometry: 방향성 있는 순수 함수 (RDKit 불사용)

재단 합성노트 검증 케이스는 acetic anhydride를 **eq=1.000 입력**으로 볼 때만 인쇄
자릿수까지 재현된다(mass 0.464 g, vol 0.428 ml는 파생값; mass를 입력으로 보면
eq=1.001). 따라서 행마다 `given ∈ {mass, eq, volume}`을 명시하는 방향성 모델 채택.
계산 내부 반올림 금지, 표시용 `round_display` 분리.

## PgCartridge "정답지"의 실검증 환경 대체

본 PoC 환경에는 Docker/Postgres가 없어 cartridge를 실행할 수 없다. 동치성 게이트의
ground truth는 **브루트포스 RDKit**(모든 레코드에 `HasSubstructMatch`) — cartridge보다
더 순수한 정답지다. `PG_DSN` 설정 시 PgCartridgeBackend가 동일 스위트에 자동 편입된다.

## 몰파일 공백 줄 규칙 (반복 발생 버그 클래스)

V2000 몰블록의 1행은 빈 이름 줄이며 **구조적으로 필요하다**. `strip()`/`trim()` 한 번에
counts 줄이 밀려 파싱이 조용히 실패한다. SDF 리더(임베드 필드), 검색 API(쿼리),
프론트(getMolfile) 세 곳에서 각각 실제로 발생 — 전부 회귀 테스트로 고정했다.
