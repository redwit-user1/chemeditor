# PRD: KMEDIhub 통합 전자연구노트(ELN) + 화합물·시약 관리 플랫폼

| 항목 | 내용 |
|---|---|
| 문서 버전 | v0.1 (Draft) |
| 작성일 | 2026-07-10 |
| 고객 | 대구경북첨단의료산업진흥재단(KMEDIhub) / 신약개발지원센터 |
| 배경 | PerkinElmer Signals ELN(구 E-Notebook) + CBOE 서비스 중단 |
| 우선 목표 | **"구현 가능 여부" 회신** → 프로토타입 → 2차 미팅 |
| 규모 가정 | 동시 사용자 300~400명 (KMEDIhub 통합 기준) |
| DB | Oracle Standard Edition |
| 인증 | GTSA 지원 / TSA 솔루션 + KISA 모듈 연계 |

---

## 1. 배경 및 문제 정의

### 1.1 현황
- 신약개발지원센터는 PerkinElmer **E-Notebook**(전자연구노트) + **CBOE(ChemBioOffice Enterprise)** 를 사내 서버(`http://192.168.1.27/COEManager`)로 운영 중.
- PerkinElmer 국내 서비스 중단으로 **대체 솔루션 도입 필수**.
- 기존 라이선스 비용: 연 2,000만~4,000만원 이상.

### 1.2 핵심 페인 포인트

| # | 문제 | 출처 |
|---|---|---|
| P1 | 화학구조식을 노트에 그대로 붙여넣고, **붙여넣는 즉시 하단에서 분자량/분자식 자동 계산**되는 기능이 없으면 대체 불가 | 미팅록 (메인 기능) |
| P2 | 시약 관리가 **구글시트 수기 관리** → 재고 관리 불가 | 김진아 선임 |
| P3 | **MSDS / CAS 번호가 전부 외부(외부망)** 에 있어 내부망에서 조회 불가 | 김진아 선임 |
| P4 | 시약 구매 시스템(MIS)과 실무 시약 데이터가 **불일치** | 기타사항 |
| P5 | 화합물 라이브러리(CBOE)가 ELN과 **분리 운영**되어 이중 입력 발생 | 가이드라인 PDF |
| P6 | 서면 노트 선호 부서 존재 → 진입장벽 낮은 UX 필요 | 미팅록 |

### 1.3 결론(미팅 합의)
> 전자연구노트 시스템 **내장이든 모듈이든**, ① 시약 관리 데이터 연계·관리 기능, ② 화합물 라이브러리 데이터 연계·관리 기능이 반드시 있어야 함.
> 분자구조식은 **ChemDraw 정식 구매 후 API 연계** 방향. 단, PerkinElmer에 적용된 기능이 ChemDraw SDK에서도 제공되는지 검토 필요.

---

## 2. 제품 목표 및 성공 지표

### 2.1 목표
1. PerkinElmer E-Notebook + CBOE + 구글시트 시약 관리를 **단일 플랫폼으로 통합**한다.
2. 신약개발지원센터 → **KMEDIhub 전 센터 확장**을 전제로 설계한다.
3. 연구노트 **법적 무결성**(전자연구노트 관리지침, TSA/타임스탬프)을 확보한다.

### 2.2 성공 지표 (KPI)

| 지표 | 목표 |
|---|---|
| 합성 노트 1건 작성 시간 | 기존 대비 ≤ 100% (증가 없음) |
| 구조식 입력 → 물성 자동계산 지연 | ≤ 1초 |
| 시약 재고 정확도 | ≥ 95% (현재 측정 불가) |
| Sign & Close 완료율 | ≥ 90% (반려 후 재제출 포함) |
| 서면 노트 대비 전환율(1년) | ≥ 70% |

### 2.3 Non-goals (범위 제외)
- **기존 PerkinElmer 데이터 마이그레이션** — 연구노트 무결성 증빙 문제로 **미수행 권장**. 기존 데이터는 기존 서버 보존 + 읽기전용 조회 제공.
- MIS(구매/검수) 시스템 개조 — 별도 협의 대상(전산팀·검수실).
- 하드웨어 조달 — 공공기관 특성상 **HW/SW 분리 발주** 필요, 본 PRD는 SW 범위.

---

## 3. 사용자 및 시나리오

### 3.1 페르소나

| 페르소나 | 역할 | 주요 니즈 |
|---|---|---|
| **연구원 (의약화학부)** | 합성 실험 수행, 노트 작성 | 구조식 그리기·붙여넣기, Stoichiometry 자동계산, 시약 검색 |
| **검토자 / 팀장 (Witness)** | 노트 서명 검토·승인·반려 | 대기 목록, 이력 추적, 반려 사유 입력 |
| **시약 관리 담당** | 시약 입고·위치·재고 관리 | 바코드/스캔 등록, 위치별 조회, MSDS 링크 |
| **DN 담당자** | 화합물 등록번호(DN) 최종 승인 | Temp Batch 검토, DN 번호 부여 |
| **정보전산팀** | 시스템 운영·보안 | 내부망 격리, Oracle 운영, 감사로그 |

### 3.2 핵심 시나리오 (기존 PerkinElmer 워크플로 기반)

```
[연구원]
  1. Notebook 생성 → 이름 변경 (이니셜-00x)
  2. Discovery Chemistry → Reaction Section 생성
  3. Experiment Title 탭 필수 입력
     : Project Number(KND-XXXXX), Experiment Title(Synthesis of ___),
       User Full Name(영문), Project Name, Key words, Location(Daegu, NDDC Medchem), E-mail
  4. Reaction 탭 → Add → Local Reagent / Inventory Search
     → Substance Name · CAS No. · 구조 검색으로 reactant/reagent 추가
  5. Stoichiometry 자동 계산 (MW, eq, mmol, mass, volume)
  6. Add Solvents (목록 외 → Add Blank Solvent)
  7. 합성법 서술 (영문, JMC 포맷 / 실패 반응은 국문 허용)
     : Rf (Hex:EA / 2:1_0.3), LCMS Rt (5% Method_2.5min)
  8. Batch Explorer → View Synthetic Path (전체 반응 경로 확인)
  9. 첨부: Excel / Word / PDF (LC-MS, NMR, HPLC)
     : 파일명 규칙 = 이니셜-001-01 (예: KDR-025-01 NMR)
 10. Create Sample → Amount, Units, Purity, Phys State 입력
 11. Registration → Quick Temporary Reg. → 화합물 라이브러리로 전송
 12. Sample 탭 Note 칸에 DN 번호 기재 → Sign & Close

[화합물 라이브러리]
 13. Search Temp → Retrieve All → Review Record → Edit
 14. Project No. 기입 (Prefix "DN" 확인) → Temp Batch
 15. Registrar, Creator, DMSO stock(50mM/10mM), Appearance,
     Purity Comments(HPLC), Batch Comments(예: TFA salt),
     Project Number, NMR/LC-MS/HPLC 체크 → Save
 16. DN 담당자 확인 → DN 번호 등록 완료

[Witness]
 17. Home > Waiting Documents → 더블클릭 → Report 확인
 18. Comment 입력 + Reviewed 체크 + 비밀번호 입력 → Witness / Reject
```

---

## 4. 기능 요구사항

### 4.1 모듈 구성

| 모듈 | 코드 | 설명 |
|---|---|---|
| M1 | ELN Core | 노트북/실험/섹션, 편집, 첨부, 버전 |
| M2 | Chemistry Engine | 구조식 에디터, 구조 검색, 물성 계산, Reaction/Stoichiometry |
| M3 | Compound Registry | 화합물 라이브러리(구 CBOE), DN 등록, Batch 관리 |
| M4 | Reagent Inventory | 시약 관리, 재고, 위치, MSDS/CAS 연계 |
| M5 | Workflow & e-Sign | Sign & Close, Witness, Reject, Cancel, Re-Open |
| M6 | Integrity & Audit | TSA 타임스탬프, 감사로그, 무결성 검증 |
| M7 | Admin & Integration | 사용자/권한, MIS 연계, 리포트 |

---

### 4.2 M1. ELN Core

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M1-01 | Notebook 생성, 노트북당 최대 **99 페이지(Experiment)** 제한 | P0 |
| M1-02 | Experiment 유형 선택 (부서/팀별 템플릿: Discovery Chemistry, Analysis 등) | P0 |
| M1-03 | Section 기반 편집 (Title / Reaction / Preparation / Sample / Attachment) | P0 |
| M1-04 | **Title Section 자동 채움** — User Profile 기본정보 → 자동 기입 | P1 |
| M1-05 | 필수 필드 미입력 시 Sign & Close 차단 (Project No., Title, Full Name, Project Name) | P0 |
| M1-06 | **Add / Delete Property** — 우클릭으로 사용자 정의 필드 추가 | P1 |
| M1-07 | 첨부파일: Excel, Word, PDF, 이미지. 파일명 규칙 검증(`이니셜-000-00`) | P0 |
| M1-08 | 첨부 PDF 인라인 뷰어 (LC-MS/NMR/HPLC 스펙트럼) | P1 |
| M1-09 | 홈 대시보드 3분할: **작성중 / Witness 대기 / Sign&Close 진행중** | P0 |
| M1-10 | Open vs Re-Open 편집 정책 차등 적용 (4.6 참조) | P0 |
| M1-11 | 자동 저장 및 오프라인 임시저장 | P2 |

---

### 4.3 M2. Chemistry Engine ★ 최우선 리스크 영역

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M2-01 | **구조식 에디터 임베드** — 노트 본문에 구조식 그리기/붙여넣기 | **P0** |
| M2-02 | **붙여넣는 즉시 하단에 물성 자동 계산** (Mol Formula, Mol Wt, Exact Mass) — *미팅 지목 "메인 기능"* | **P0** |
| M2-03 | 클립보드 상호운용: ChemDraw(.cdx / .cdxml), MOL, SMILES, InChI 붙여넣기 지원 | **P0** |
| M2-04 | **구조 기반 검색** — Substructure / Exact / Similarity 검색 | **P0** |
| M2-05 | Reaction Scheme 작성 (Reactant + Reagent + Solvent → Product) | P0 |
| M2-06 | **Stoichiometry 테이블 자동 계산** — MW, mmol, eq, mass, volume, 이론수율 | P0 |
| M2-07 | Add Solvents / **Add Blank Solvent** (목록 외 직접 입력) | P1 |
| M2-08 | **Batch Explorer / View Synthetic Path** — 반응 경로 트리 시각화 | P1 |
| M2-09 | SDF Import / Export (V2000, 다중 레코드, 데이터 필드 포함) | P0 |
| M2-10 | 구조 정규화(Standardizer): 염 제거, 호변이성질체, 입체화학 처리 | P1 |
| M2-11 | Insert → Reactant / Reagent / Solvent 우클릭 컨텍스트 메뉴 | P2 |

#### ⚠ M2 기술 검토 필수 항목 (미팅 액션 아이템)
1. **ChemDraw JS SDK** 라이선스로 M2-01~M2-03 구현 가능한가?
   - PerkinElmer(현 Revvity) ChemDraw JS는 브라우저 임베드 지원. **웹 라이선스 별도 구매 필요.**
   - 서비스 중단 대상이 ELN인지 ChemDraw 자체인지 확인 필요 → **ChemDraw 라이선스 지속 가능성 확인 필수.**
2. **대안 스택** (ChemDraw 확보 실패 시 백업 플랜)

| 기능 | ChemDraw 대안 |
|---|---|
| 구조 에디터 | Ketcher (Apache 2.0), MarvinJS (상용), JSME |
| 물성 계산 | RDKit (BSD), CDK, Indigo |
| 구조 검색(substructure) | RDKit + PostgreSQL Cartridge / **Oracle 사용 시 Java 기반 인덱스 별도 구현 필요** |
| 반응 처리 | RDKit ChemicalReaction |
| .cdx 파일 파싱 | Indigo / OpenBabel (호환성 검증 필요) |

3. **Oracle SE 제약** — RDKit PostgreSQL Cartridge 사용 불가.
   → 화합물 구조 검색용 **별도 검색 인덱스 서버(예: 별도 Postgres/Elasticsearch + fingerprint)** 아키텍처 검토 필요. 이는 **분리 발주 시 SW 구성에 영향**.

---

### 4.4 M3. Compound Registry (화합물 라이브러리)

기존 CBOE 스크린샷 및 SDF 다운로드 파일 분석 기반.

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M3-01 | 화합물 검색 UI: **Chemical Structure 검색창 + Registry Number / Formula / Mol Weight 필드 검색** | P0 |
| M3-02 | 검색 결과: 구조 이미지 썸네일 + Reg No. + Mol Formula + Mol Wt 리스트/그리드 뷰 | P0 |
| M3-03 | **SDF 다운로드** — 다음 필드 스키마 보존 | P0 |
| M3-04 | ELN → Registry **Quick Temporary Registration** (임시 등록) | P0 |
| M3-05 | Search Temp → Retrieve All → Review Record → Edit 워크플로 | P0 |
| M3-06 | DN 번호 채번 (Prefix `DN` 강제), 담당자 최종 승인 후 확정 | P0 |
| M3-07 | Batch 관리 — 기존 DN에 신규 Batch 추가, `Registry Comments`에 기존 DN 번호 필수 기재 | P0 |
| M3-08 | Batch 속성: Registrar, Creator, DMSO Stock(50mM/10mM), Appearance, Purity Comments(HPLC), Batch Comments(예: TFA salt), Project Number, NMR/LC-MS/HPLC 체크박스 | P0 |
| M3-09 | Submit New Component (신규 성분 등록: 구조 그리기 + 노트번호 + MW + Formula) | P1 |
| M3-10 | Mixture / Multi-component 구조 지원 (SDF에 `MIXTURES` 다중 컴포넌트 존재 확인됨) | P1 |

#### SDF 스키마 (기존 시스템 실측)
```
> <VW_MIXTURE_REGNUMBER.REGID>        # 등록번호 (예: 3709)
> <VW_MIXTURE_REGNUMBER.MIXTUREID>    # 혼합물 ID (예: 2125)
> <VW_MIXTURE_REGNUMBER.Mol Wt>       # 예: 440.587005615234
> <VW_MIXTURE_REGNUMBER.Mol Formula>  # 예: C29H32N2O2
> <MIXTURES.REGID> (n)                # 컴포넌트별 반복 (n=1..3)
> <MIXTURES.Mol Wt> (n)
> <MIXTURES.Mol Formula> (n)
> <MIXTURES.STRUCTUREAGGREGATION> (n) # Base64 인코딩 ChemDraw 12.0 바이너리
> <VW_MIXTURE_STRUCTURE.STRUCTURE> (n)
```
> **주의:** `STRUCTUREAGGREGATION` 필드는 **ChemDraw 12.0 네이티브 바이너리(Base64)**. 신규 시스템은 최소 **MOL/V2000 블록**을 정본으로 저장하고, ChemDraw 바이너리는 참조용 보조 필드로만 유지 권장.

---

### 4.5 M4. Reagent Inventory (시약 관리) ★ 신규 요구

현재: 내부망 PerkinElmer 시약관리 + 외부망 구글시트 **이원화**.

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M4-01 | 시약 마스터: Substance Name, CAS No., Mol Formula, MW, 구조 | P0 |
| M4-02 | 재고 항목: Container ID(바코드), **Location**(건물-실-냉장고-선반), 수량, 단위, 순도, Vendor, Catalog No., Lot No., 입고일, 유효기간, 담당자 | P0 |
| M4-03 | **Location 기반 검색** (기존 스크린샷의 핵심 사용 패턴) | P0 |
| M4-04 | **바코드 스캔 입고/출고/실사** (현재 "시약을 스캔해서 목록화" 진행 중) | P0 |
| M4-05 | 구조/CAS 기반 시약 검색 → **ELN Reaction 탭에서 직접 Inventory Search** 호출 | **P0** |
| M4-06 | 노트에서 시약 사용량 기재 시 **재고 자동 차감(옵션)** | P1 |
| M4-07 | 재고 부족 알림, 유효기간 만료 알림 | P1 |
| M4-08 | 구글시트 일괄 Import (CSV/XLSX) — 초기 전환용 | P0 |

#### M4-09. MSDS / CAS 외부 데이터 연계 (★ 핵심 미해결 이슈)
> "MSDS / CAS 번호가 다 외부에 있는데, 외부망을 쓸 수 있게 하거나 내부망에서 관리할 수 있는 방법을 찾아주었으면 좋겠음"

**제안 3안 — 2차 미팅 시 전산팀과 결정 필요**

| 안 | 방식 | 장점 | 단점 |
|---|---|---|---|
| **A. 내부 캐시 DB** | 외부 CAS/MSDS를 주기적으로 배치 수집 → 내부망 DB 적재 | 망분리 준수, 조회 빠름 | 라이선스/저작권 검토 필수, 최신성 지연 |
| **B. 단방향 프록시(DMZ)** | DMZ에 조회 전용 프록시, 화이트리스트 도메인만 | 실시간성 | 보안 승인 난이도 높음 |
| **C. 벤더 MSDS 파일 첨부** | 구매 시 벤더 제공 MSDS PDF를 컨테이너에 첨부 | 구현 단순, 법적 안전 | 수기 업로드 부담 |

**권장:** C(즉시) + A(단계적). B는 정보전산팀 보안 정책 확인 후.

#### M4-10. MIS 연계
> "시약을 구매하면 연계가 되면 좋겠음" / "실무 시약 데이터와 전산 관리 시약 데이터가 다름"

- **선결 과제:** 전산팀 + 검수실 + 실무(신약개발지원센터) 3자 데이터 스키마 정합화 워크숍.
- 인터페이스: MIS 구매완료 → 시약 마스터 자동 생성 + 입고 대기 상태 (배치 or REST).
- **본 PRD 범위: 인터페이스 규격 정의까지. 실 연계는 별도 협의(Phase 2).**

---

### 4.6 M5. Workflow & e-Signature

기존 Sign & Close 상태 전이를 **1:1로 재현**한다.

#### 상태 전이도
```
Experiment(Open)
      │ Sign & Close
      ▼
Submission #N ──── Witness ────► Experiment(Closed)
      │                                 │
      │ Reject                          │ Re-Open
      ▼                                 ▼
Submission #N(Rejected)          Experiment(Re-Open)
      │ Cancel Submission               │ Sign & Close
      ▼                                 ▼
Experiment(Re-Open, 자동)        Submission #N+1
```

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M5-01 | Sign & Close — 리포트 반영 Section 선택 + Witness 지정 | P0 |
| M5-02 | 서명 시 **Reviewed 체크 + Comment + 사용자 암호 입력** 후 Submit | P0 |
| M5-03 | Witness: Home > Waiting Documents 더블클릭 → 리포트 확인 → Witness / **Reject** | P0 |
| M5-04 | **Cancel Submission** — 서명 대기/Rejected 상태의 제출 취소 → **자동 Re-Open** | P0 |
| M5-05 | **Re-Open** — Closed(Witness 완료) 실험의 재편집 | P0 |
| M5-06 | Re-Open 시 제약: ① 저장 시 **Annotation 강제 입력** ② **Section 삭제 불가**(Re-Open 이후 신규 생성 Section 포함) ③ 변경된 field에 아이콘 표시 | P0 |
| M5-07 | Open 상태: Annotation 선택 입력, Section 추가·삭제 가능 | P0 |
| M5-08 | **View Signed Versions** — Submission 전체 이력 및 진행상황 조회 | P0 |
| M5-09 | Submission 번호 자동 증가(#127 → #128 → #129), Experiment 번호는 유지 | P0 |
| M5-10 | Sign & Close 시 PDF 리포트 자동 생성 및 봉인 | P0 |

---

### 4.7 M6. Integrity & Audit (무결성)

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M6-01 | **TSA 타임스탬프** 부여 (Sign & Close 시점, GTSA 지원) | P0 |
| M6-02 | KISA 모듈 연계 | P0 |
| M6-03 | 전자서명 (인증서 또는 사용자 암호 + 서버 서명) | P0 |
| M6-04 | 감사로그: 생성/수정/삭제/서명/조회, Who-What-When-Why(Annotation) | P0 |
| M6-05 | 무결성 검증 API — 봉인 PDF 해시 + 타임스탬프 토큰 검증 | P0 |
| M6-06 | 로그 위변조 방지 (Append-only, Hash Chain) | P1 |
| M6-07 | 기존 PerkinElmer 데이터 **읽기전용 아카이브 조회** (마이그레이션 대체) | P1 |

---

### 4.8 M7. Admin & Integration

| ID | 요구사항 | 우선순위 |
|---|---|---|
| M7-01 | 사용자/조직/권한 관리 (센터 → 부서 → 팀 계층, KMEDIhub 전 센터 확장 고려) | P0 |
| M7-02 | 부서별 Experiment 템플릿 관리 (의약화학부, 분석부 등) | P0 |
| M7-03 | SSO / LDAP 연동 | P1 |
| M7-04 | 검색: 전문(Full-text) + 구조 + 메타데이터 복합 검색 | P0 |
| M7-05 | 리포트/통계 (프로젝트별 노트 수, 서명 지연 현황) | P2 |
| M7-06 | 내부망 전용 배포 (폐쇄망 설치 패키지) | P0 |

---

## 5. 비기능 요구사항

| 구분 | 요구사항 |
|---|---|
| **성능** | 동시 300~400명. 구조 검색 응답 ≤ 3초(10만 건 기준). 물성 계산 ≤ 1초. |
| **가용성** | 업무시간 99.5%. |
| **DB** | **Oracle Standard Edition**. 파티셔닝/RAC 미사용 전제 설계. |
| **배포** | 온프레미스 내부망(폐쇄망). 인터넷 접근 불가 전제. |
| **보안** | 망분리 준수. 외부 데이터는 M4-09 정책에 따름. |
| **브라우저** | Chrome / Edge 최신. 구조 에디터는 WASM/JS 기반. |
| **국제화** | UI 한국어, 노트 본문 영문 작성(JMC 포맷) 지원. |
| **라이선스** | ChemDraw API 라이선스는 **재단이 별도 예산으로 정식 구매** (미팅 합의). |

---

## 6. UX 참고

- 재단 측이 **LIMS 프로토타입의 특정 필드 구성**을 선호 → 해당 필드 레이아웃을 시약 관리 화면 기준으로 채택.
  - 참조: https://sniff-ranch-89012246.figma.site/
- 서면 노트 선호 부서 존재 → **최소 클릭 원칙**, 구조식 붙여넣기 후 즉시 계산되는 "마법 같은 순간"을 첫 데모의 핵심으로 배치.

---

## 7. 아키텍처 개요 (초안)

```
┌────────────────── 내부망 (폐쇄망) ──────────────────┐
│                                                    │
│  [Web Client]                                      │
│   └ Structure Editor (ChemDraw JS / Ketcher)       │
│                                                    │
│  [App Server]                                      │
│   ├ M1 ELN Core        ├ M5 Workflow/e-Sign        │
│   ├ M3 Registry        ├ M6 Audit                  │
│   └ M4 Inventory       └ M7 Admin                  │
│                                                    │
│  [Chemistry Service]  ← M2                         │
│   └ RDKit / ChemDraw SDK (물성계산, 정규화)         │
│                                                    │
│  [Structure Search Index]  ★ Oracle SE 제약 회피    │
│   └ Fingerprint Index (별도 엔진)                   │
│                                                    │
│  [Oracle SE]  — 노트, 사용자, 재고, 등록정보         │
│  [File Storage] — 첨부, 봉인 PDF                    │
│  [TSA Client] ──────────┐                          │
└─────────────────────────┼──────────────────────────┘
                          ▼
                    [GTSA / KISA]

  [DMZ / 배치] — M4-09 (MSDS/CAS 캐시) ※ 정책 확정 후
  [MIS 연계]   — M4-10 ※ Phase 2
```

---

## 8. 단계별 로드맵

| Phase | 범위 | 산출물 | 시점 |
|---|---|---|---|
| **P0. 실현 가능성 회신** | M2 기술 검토 (ChemDraw SDK 라이선스 / 대안 스택 / Oracle SE 구조검색) | **구현 가능 여부 회신서** | **최우선** |
| **P1. 프로토타입** | 구조식 붙여넣기 → 물성 자동계산, Reaction/Stoichiometry, 시약 검색 화면 | 데모 + 기획서 → **2차 미팅** | P0 이후 |
| **P2. 예산 수립** | M/M 산정 (300~400명 기준, 신규 기능 기준) | 견적서 | ~2026-10 (재단 예산계획 시점) |
| **P3. MVP 개발** | M1 + M2 + M5 + M6 (신약개발지원센터 한정) | 파일럿 오픈 | — |
| **P4. 확장** | M3 Registry + M4 Inventory | 정식 오픈 | — |
| **P5. 통합** | KMEDIhub 전 센터 확장, MIS 연계, MSDS 연계 | — | — |

---

## 9. 미해결 이슈 / 액션 아이템

| # | 이슈 | 담당 | 상태 |
|---|---|---|---|
| A1 | **ChemDraw SDK로 PerkinElmer ELN의 구조식 삽입+즉시 계산 기능이 구현 가능한지 검토** | 개발 | **최우선 / Open** |
| A2 | ChemDraw 라이선스 자체의 국내 지속 공급 가능 여부 확인 | 영업 | Open |
| A3 | Oracle SE 환경에서 substructure 검색 인덱스 아키텍처 확정 | 개발 | Open |
| A4 | MSDS/CAS 외부 데이터 연계 방식(A/B/C안) — 정보전산팀 보안 정책 확인 | 재단 전산팀 | Open |
| A5 | 실무 시약 데이터 ↔ MIS 시약 데이터 스키마 불일치 정합화 | 재단 전산팀 + 검수실 + 실무 | Open (Phase 2) |
| A6 | HW/SW 분리 발주 시 SW 범위 확정 (PDF 변환기, 뷰어, 에디터 라이선스 사용자 수 과금) | 영업 | Open |
| A7 | 유지보수율 15% → 협의 | 영업 | Open |
| A8 | 300~400명 기준 M/M 산정 및 비용 산출 | Ethan | Open |
| A9 | KMEDIhub 통합 범위(타 센터 요구사항) 사전 수집 | 영업 | Open |

---

## 10. 리스크

| 리스크 | 영향 | 완화 |
|---|---|---|
| ChemDraw SDK가 요구 기능 미지원 | **치명적** — 도입 명분 소멸 | 대안 스택(Ketcher+RDKit) PoC 병행, 프로토타입에서 조기 검증 |
| Oracle SE에서 구조 검색 성능 미달 | 높음 | 별도 인덱스 엔진 분리, 초기부터 아키텍처 반영 |
| 망분리로 MSDS/CAS 연계 불가 | 중간 | C안(벤더 MSDS 첨부)으로 최소 기능 확보 |
| 예산 미확보 (현재 확정 예산 없음) | 중간 | 원장님 긍정 의견 확보. 10월 예산계획 전 견적 제출 필수 |
| 서면 노트 선호로 인한 도입 저항 | 중간 | 부서별 템플릿, 최소 클릭 UX, 파일럿 부서 우선 |
