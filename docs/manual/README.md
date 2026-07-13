# KMEDIhub ELN PoC — 매뉴얼 문서 세트 안내

- **문서 목적**: `docs/manual/` 에 있는 4개 문서의 구성과 읽는 순서를 안내합니다.
- **대상 독자**: 이 PoC를 처음 접하는 모든 독자 (재단 의사결정자, 연구원, 운영 담당자)
- **최종수정일**: 2026-07-13

---

## 1. 문서 세트 소개

이 디렉터리는 KMEDIhub 전자연구노트(ELN) 대체 PoC의 **사용·운영 문서 세트**입니다. 모든 내용은 코드베이스에서 직접 확인한 사실만 기술하며, 기술 명세·요구사항·성능 실측은 별도 문서(`docs/SPEC.md`, `docs/PRD.md`, `reports/`)를 정본으로 합니다.

| 문서 | 내용 | 주 독자 |
|---|---|---|
| [FEATURES.md](FEATURES.md) | 기능 정의서 — 구현된 7개 기능(F-01~F-07)의 목적·동작 방식·API·제약을 정의 | 재단 의사결정자, PM |
| [USER_MANUAL.md](USER_MANUAL.md) | 사용자 매뉴얼 — 접속부터 화면별 조작까지 실제 버튼 이름 그대로 안내 | 일반 사용자 (연구원, 연구지원 인력) |
| [GLOSSARY_FAQ.md](GLOSSARY_FAQ.md) | 용어집 & FAQ — 화면·API에 등장하는 용어 해설과 자주 묻는 질문 15개 | 화학·IT 비전공 실무자 |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | 운영자 가이드 — 상태 확인, 데이터 적재, 장애 대응, 백업·업데이트 | 서버 관리자 |

---

## 2. 독자별 읽는 순서

| 독자 | 먼저 읽을 문서 | 그 다음 | 참고 |
|---|---|---|---|
| **재단 의사결정자 / PM** | [FEATURES.md](FEATURES.md) | [GLOSSARY_FAQ.md](GLOSSARY_FAQ.md)의 FAQ | 성능·정합 실측치는 `reports/feasibility.md`, `reports/bench.md`, `reports/parity.md` |
| **처음 사용하는 연구원** | [USER_MANUAL.md](USER_MANUAL.md)의 "5분 퀵스타트" | 모르는 용어가 나오면 [GLOSSARY_FAQ.md](GLOSSARY_FAQ.md) | 문제가 생기면 USER_MANUAL 5장 "문제 해결" |
| **행정·구매 등 비전공 실무자** | [GLOSSARY_FAQ.md](GLOSSARY_FAQ.md) | [USER_MANUAL.md](USER_MANUAL.md) | — |
| **서버 관리자** | [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | 최초 배포는 [docs/DEPLOY.md](../DEPLOY.md) | 기능 배경이 필요하면 [FEATURES.md](FEATURES.md) |

---

## 3. 관련 문서 (이 디렉터리 밖)

| 문서 | 내용 |
|---|---|
| [../SPEC.md](../SPEC.md) | 기술 명세 |
| [../PRD.md](../PRD.md) | 요구사항 정의 |
| [../DECISIONS.md](../DECISIONS.md) | 기술 의사결정 기록 |
| [../DEPLOY.md](../DEPLOY.md) | 최초 배포 절차 (Vercel 프론트 + VPS 백엔드) |
| `../../reports/` | 실측 산출물 — 구현 가능 여부 회신(`feasibility.md`), 성능(`bench.md`), 데이터 정합(`parity.md`) |
