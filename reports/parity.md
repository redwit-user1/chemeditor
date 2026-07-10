# 데이터 정합 검증 (reports/parity.md)

> ⚠️ **재단 실측 SDF가 저장소에 없어 픽스처(fixture)로 실행됨.**
> 아래 수치는 파이프라인 동작 증명용이다. 실측 SDF를 `data/`에 넣고
> `make parity` 를 다시 돌리면 동일 로직으로 전수 대조가 수행된다.


- 소스: `/home/user/chemeditor/backend/tests/fixtures/sample_foundation.sdf`
- 대조 컴포넌트: **7**
- CTAB 파싱 실패: **0**
- MolFormula 완전 일치: **6/7** (85.7%)
- MolWt ±0.01 일치: **6/7** (85.7%)

## 불일치 목록

| REGID | comp | 종류 | SDF 값 | RDKit 값 | 사유 |
|---|---|---|---|---|---|
| 3005 | 1 | formula | `C2H3O2` | `C2H3NaO2` | multi-fragment (salt / counter-ion handling) |
| 3006 | 1 | weight | `122.5` | `122.123` | Δ=0.3770 > 0.01 (formula divergence (tautomer, charge, or stored-value error)) |

## 판정 규칙

- MolWt 허용 오차 **±0.01**, MolFormula **완전 일치** (CLAUDE.md).
- 불일치는 숨기지 않고 사유와 함께 전량 기록한다. 염/counter-ion, 호변이성,
  원자가 오류가 주요 사유다.
