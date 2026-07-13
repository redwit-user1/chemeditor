# 운영자 가이드 (ADMIN_GUIDE)

- **대상 독자**: 서버 관리자 (VPS·컨테이너 운영 담당)
- **최종수정일**: 2026-07-13
- **범위**: 배포 이후의 **일상 운영**. 최초 배포 절차는 [docs/DEPLOY.md](../DEPLOY.md)를 참조하십시오. 이 문서는 상태 확인, 데이터 적재, 장애 대응, 업데이트에 집중합니다.

---

## 1. 시스템 구성 요약

```
사용자 브라우저
   │  https://<Vercel 배포 URL>            (프론트: React + Vite 정적 빌드)
   ▼
Vercel  ──(rewrites: /api/:path* 서버사이드 프록시)──▶
   │
   ▼
https://chemeditor.srv1711580.hstgr.cloud   (Hostinger VPS)
   │  Traefik (호스트 네트워크, Let's Encrypt TLS 종단)
   ▼
backend 컨테이너 (FastAPI + RDKit, 컨테이너 내부 포트 8000)
```

| 구성 요소 | 위치 | 비고 |
|---|---|---|
| 프론트 | Vercel (`<Vercel 배포 URL>`) | 정적 SPA. `frontend/vercel.json`의 rewrites가 `/api/:path*`를 백엔드로 프록시하므로 CORS·mixed-content 문제가 없습니다 |
| 백엔드 | VPS, `docker-compose.vps.yml`의 `backend` 서비스 | 호스트 포트를 **직접 열지 않습니다**(`expose: 8000`만 선언). Traefik이 Docker 라벨을 읽어 라우팅합니다 |
| TLS | Hostinger 내장 Traefik | 라우팅 규칙 `Host(chemeditor.srv1711580.hstgr.cloud)`, 인증서 리졸버 `letsencrypt` |
| 데이터 | VPS의 `./data` → 컨테이너 `/app/data` (**읽기 전용** 마운트) | SDF 파일 보관 위치 |
| 검색 인덱스 | 백엔드 프로세스 **인메모리** (기동 시 1회 구축) | 별도 DB 없음. 재기동하면 SDF에서 다시 구축됩니다 |

주요 환경변수 (`docker-compose.vps.yml`에서 전달):

| 변수 | 기본값 | 의미 |
|---|---|---|
| `CHEM_INDEX_SDF` | (빈 값) | 인덱싱할 SDF 파일 또는 디렉터리 경로(컨테이너 내부 경로). 비어 있으면 번들 픽스처(`backend/tests/fixtures/sample_foundation.sdf`) 사용 |
| `CHEM_SEARCH_BACKEND` | `portable_fp` | 검색 백엔드. `pg_cartridge` 선택 시 `PG_DSN` 필수 (운영 VPS에서는 기본값 유지 권장) |

---

## 2. 일상 운영

아래 명령은 모두 **VPS의 레포 클론 디렉터리**(예: `~/chemeditor`)에서 실행합니다.

### 2.1 상태 확인

```bash
# 백엔드 헬스체크 (Traefik 경유, 실제 사용자 경로와 동일)
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health
```

정상 응답 예:

```json
{"status":"ok","index_size":7,"index_source":"bundled fixture","search_backend":"portable_fp"}
```

핵심 기능(물성 계산)까지 확인하려면:

```bash
curl -s -X POST https://chemeditor.srv1711580.hstgr.cloud/api/v1/chem/properties \
  -H "Content-Type: application/json" \
  -d '{"structure":"c1ccccc1"}'
# 기대: "ok":true, "formula":"C6H6", "mol_weight":78.114 를 포함한 JSON
```

컨테이너 상태:

```bash
docker compose -f docker-compose.vps.yml ps
```

### 2.2 로그 보기

```bash
# 실시간 추적
docker compose -f docker-compose.vps.yml logs -f backend

# 최근 200줄만
docker compose -f docker-compose.vps.yml logs --tail=200 backend
```

### 2.3 재기동

```bash
# 단순 재시작 (이미지 재빌드 없음)
docker compose -f docker-compose.vps.yml restart backend

# 설정/환경변수 변경 반영
docker compose -f docker-compose.vps.yml up -d backend
```

### 2.4 VPS 재부팅 후 자동 복구 확인

`backend` 서비스에 `restart: unless-stopped`가 걸려 있어 재부팅 시 Docker가 자동으로 컨테이너를 다시 띄웁니다. 재부팅 후에는 다음을 확인하십시오.

```bash
# 1) 컨테이너가 올라왔는지
docker compose -f docker-compose.vps.yml ps

# 2) Traefik(호스트에 상주)이 살아 있는지
docker ps | grep -i traefik

# 3) 외부 경로로 헬스 응답이 오는지 (인증서 포함 확인)
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health
```

주의: `docker compose stop`으로 **수동 정지**한 컨테이너는 재부팅 후에도 되살아나지 않습니다(`unless-stopped`의 의미). 정지했다면 `up -d`로 직접 올려야 합니다.

---

## 3. 데이터 관리

### 3.1 인덱스 구축 방식 (동작 원리)

- 검색 인덱스는 백엔드 **기동 시 1회** 구축됩니다 (`backend/app/search/service.py::build_index`).
- 소스 우선순위:
  1. `CHEM_INDEX_SDF` 환경변수 — **파일** 또는 **디렉터리** 경로(디렉터리면 `*.sdf`, `*.sd` 전부 로드)
  2. 지정이 없거나 경로가 유효하지 않으면 → 번들 픽스처(`sample_foundation.sdf`), 헬스 응답에 `"index_source": "bundled fixture"`로 표시
- `POST /api/v1/sdf/import`는 업로드 SDF의 **파싱 검증만** 수행합니다. 라이브 인덱스에는 반영되지 않으므로, 인덱스 갱신은 반드시 아래 절차(환경변수 + 재기동)로 합니다.

### 3.2 실측 SDF 적재

SDF 파일을 VPS의 레포 `data/` 디렉터리에 올린 뒤(컨테이너에는 `/app/data`로 보입니다):

```bash
# .env 파일에 기록해 두면 이후 재기동에도 유지됩니다
echo 'CHEM_INDEX_SDF=/app/data/실제파일.sdf' >> .env
docker compose -f docker-compose.vps.yml up -d backend

# 반영 확인: index_source가 해당 경로, index_size가 기대 건수인지
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health
```

디렉터리 전체를 인덱싱하려면 `CHEM_INDEX_SDF=/app/data`로 지정합니다.

### 3.3 데모용 합성 데이터 생성 (`backend/scripts/seed_demo.py`)

`/app/data`는 **읽기 전용 마운트**이므로 컨테이너 안에서 곧바로 `/app/data`에 쓸 수 없습니다. 컨테이너 내부의 쓰기 가능한 경로에 생성한 뒤 호스트로 복사합니다.

```bash
# 1) 컨테이너 안에서 합성 SDF 생성 (예: 1200건)
docker compose -f docker-compose.vps.yml exec backend \
  python -m scripts.seed_demo 1200 /tmp/demo_synthetic.sdf

# 2) 호스트의 data/ 로 복사
docker compose -f docker-compose.vps.yml cp backend:/tmp/demo_synthetic.sdf ./data/demo_synthetic.sdf

# 3) 인덱스 소스로 지정하고 재기동
echo 'CHEM_INDEX_SDF=/app/data/demo_synthetic.sdf' >> .env
docker compose -f docker-compose.vps.yml up -d backend
```

### 3.4 인덱스 재구축

인덱스는 인메모리이므로 별도의 재구축 명령이 없습니다. **재기동이 곧 재구축**입니다.

```bash
docker compose -f docker-compose.vps.yml restart backend
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health   # index_size 확인
```

SDF 파일을 교체·추가했을 때도 동일하게 재기동하면 됩니다.

---

## 4. 장애 대응 시나리오

### 4.1 백엔드 502 / 타임아웃 (프론트에서 API 전부 실패)

```bash
# 1) 컨테이너 기동 여부
docker compose -f docker-compose.vps.yml ps

# 2) 크래시/재시작 루프라면 로그에서 원인 확인
docker compose -f docker-compose.vps.yml logs --tail=200 backend

# 3) 재기동
docker compose -f docker-compose.vps.yml up -d backend

# 4) Traefik 경유 없이 컨테이너에 직접 확인 (VPS 내부에서)
docker compose -f docker-compose.vps.yml exec backend \
  python -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/api/v1/health').read().decode())"
```

- 4)가 성공하는데 외부 curl이 실패하면 → **Traefik 쪽 문제**(4.2 참조).
- 기동 직후 잠시 응답이 없을 수 있습니다. 대용량 SDF를 지정한 경우 기동 시 인덱스 구축에 시간이 걸립니다 — 로그가 계속 진행 중이면 기다립니다.
- 재시작 루프의 흔한 원인: `CHEM_SEARCH_BACKEND=pg_cartridge`인데 `PG_DSN`이 없는 경우(기동 시 `RuntimeError`). `.env`를 확인하고 기본값 `portable_fp`로 되돌립니다.

### 4.2 인증서 문제 (브라우저 TLS 경고, curl 인증서 오류)

TLS는 애플리케이션이 아니라 **Hostinger 내장 Traefik**이 담당합니다.

```bash
# 1) 인증서 상태 확인
curl -vI https://chemeditor.srv1711580.hstgr.cloud/api/v1/health 2>&1 | grep -iE "SSL|certificate|expire"

# 2) Traefik 컨테이너 상태·로그
docker ps | grep -i traefik
docker logs --tail=200 $(docker ps -q --filter name=traefik)

# 3) 라벨이 올바르게 붙어 있는지 (rule / certresolver / port)
docker inspect $(docker compose -f docker-compose.vps.yml ps -q backend) \
  --format '{{json .Config.Labels}}' | tr ',' '\n' | grep traefik
```

점검 포인트:
- 라우팅 규칙은 `Host(chemeditor.srv1711580.hstgr.cloud)`, 리졸버 이름은 `letsencrypt`, 서비스 포트는 `8000`이어야 합니다 (`docker-compose.vps.yml`의 labels).
- 최초 발급(HTTP-01)에는 30초~1분이 걸립니다. 컨테이너를 방금 올렸다면 잠시 후 재시도합니다.
- 호스트명을 바꾼 경우 `docker-compose.vps.yml`의 `Host(...)` 라벨과 `frontend/vercel.json`의 destination을 **함께** 수정해야 합니다.

### 4.3 물성 계산만 실패 (검색은 정상)

`POST /api/v1/chem/properties`는 파싱 실패 시 500이 아니라 `ok:false` + `error` 사유를 반환하도록 설계되어 있습니다.

```bash
# 알려진 정상 입력으로 API 자체를 판별
curl -s -X POST https://chemeditor.srv1711580.hstgr.cloud/api/v1/chem/properties \
  -H "Content-Type: application/json" \
  -d '{"structure":"c1ccccc1"}'
```

- 위 요청이 `"ok":true`면 API는 정상 → 특정 **입력 구조의 문제**입니다. 응답의 `error` 필드(파싱/sanitize 실패 사유)를 사용자에게 전달합니다.
- `"ok":false`가 벤젠(`c1ccccc1`)에서도 나오거나 HTTP 오류면 백엔드 로그를 확인합니다:

```bash
docker compose -f docker-compose.vps.yml logs --tail=200 backend
```

### 4.4 검색만 실패 또는 결과 0건 (물성 계산은 정상)

```bash
# 1) 인덱스 상태부터 확인
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health
```

- `index_size`가 0이거나 예상보다 작으면 → SDF 로드 실패. `index_source`가 `"bundled fixture"`로 나오면 `CHEM_INDEX_SDF`가 비었거나 **경로가 유효하지 않아** 픽스처로 폴백된 것입니다. `.env`의 경로(컨테이너 내부 기준 `/app/data/...`)와 파일 존재를 확인하고 재기동합니다.
- 검색 API가 오류를 내는 경우, 응답 자체에 원인이 들어 있습니다(`ok:false` + `error`):

```bash
curl -s -X POST https://chemeditor.srv1711580.hstgr.cloud/api/v1/search/substructure \
  -H "Content-Type: application/json" \
  -d '{"structure":"c1ccccc1","limit":10}'
```

- 질의 구조가 파싱 불가면 오류가 아니라 `ok:true, count:0`으로 반환됩니다. "결과가 없다"는 신고는 먼저 질의 구조가 유효한지 확인합니다.

---

## 5. 백업·업데이트 절차

### 5.1 백업

백엔드는 무상태(인메모리 인덱스)이므로 백업 대상은 두 가지뿐입니다.

```bash
# 1) 데이터 (SDF 원본) — 유일한 운영 데이터
tar czf ~/chemeditor-data-$(date +%Y%m%d).tar.gz data/

# 2) 로컬 설정 (.env — CHEM_INDEX_SDF 등)
cp .env ~/chemeditor-env-$(date +%Y%m%d).bak 2>/dev/null || true
```

코드는 git 원격 저장소가 원본이므로 별도 백업이 필요 없습니다. 복구는 클론 → `data/`·`.env` 복원 → `up -d --build` 순서입니다.

### 5.2 백엔드 업데이트

```bash
cd ~/chemeditor          # 레포 클론 위치
git pull
docker compose -f docker-compose.vps.yml up -d --build

# 확인
curl -s https://chemeditor.srv1711580.hstgr.cloud/api/v1/health
```

빌드 중에도 기존 컨테이너는 계속 서비스되며, 빌드 완료 시점에 교체됩니다(짧은 순단 가능).

문제가 생기면 롤백:

```bash
git log --oneline -5                 # 직전 정상 커밋 확인
git checkout <정상 커밋 해시>
docker compose -f docker-compose.vps.yml up -d --build
```

### 5.3 프론트 업데이트

프론트는 Vercel이 담당합니다. 연결된 브랜치에 push하면 Vercel이 자동으로 빌드·배포합니다(프로젝트 Root Directory = `frontend`). 세부 설정은 [docs/DEPLOY.md](../DEPLOY.md) 2절을 참조하십시오.

---

## 6. 보안 주의 (PoC 한계)

- **이 시스템에는 인증·권한이 없습니다.** PoC 스코프에서 의도적으로 제외된 항목이며, 백엔드 API는 URL을 아는 누구나 호출할 수 있습니다.
- CORS가 `allow_origins=["*"]`로 열려 있습니다 (개발 편의 목적, `backend/app/main.py`).
- 완화 조치는 이미 일부 적용되어 있습니다: VPS 구성은 호스트 포트를 직접 열지 않고 Traefik 뒤에만 둡니다.
- 운영자 권고 사항:
  - 데모 기간에만 서비스를 올려 두고, 사용하지 않을 때는 내립니다: `docker compose -f docker-compose.vps.yml down`
  - VPS 방화벽(ufw 등)으로 접근 IP를 제한하거나, Traefik/Caddy 레벨에서 basic auth를 추가합니다 ([docs/DEPLOY.md](../DEPLOY.md)의 권고 참조).
  - **실측 재단 데이터가 담긴 SDF를 적재한 상태로 무제한 공개하지 않습니다.** 검색·export API를 통해 구조 데이터가 노출될 수 있습니다.

---

## 7. 모니터링 포인트

### 7.1 헬스 엔드포인트

- 경로: `GET /api/v1/health` (레거시 별칭 `GET /api/health`)
- 주기적 감시에 이 엔드포인트 하나면 충분합니다. 응답 필드 의미 (`backend/app/main.py` 기준):

| 필드 | 의미 | 감시 기준 |
|---|---|---|
| `status` | 앱 프로세스가 요청을 처리 중이면 항상 `"ok"` | 응답 자체가 없거나 HTTP 오류면 장애 (4.1 절차) |
| `index_size` | 기동 시 인덱싱된 **컴포넌트 수** (mixture는 컴포넌트 단위로 인덱싱됨) | 기대 건수와 다르면 SDF 로드 문제 (4.4 절차) |
| `index_source` | 인덱스 소스. `CHEM_INDEX_SDF` 값 또는 폴백 시 `"bundled fixture"` | 운영 데이터 적재 후 `"bundled fixture"`가 보이면 설정 오류 |
| `search_backend` | 활성 검색 백엔드 이름. 기본 `"portable_fp"` | 의도치 않게 `pg_cartridge` 등으로 바뀌면 설정 확인 |

### 7.2 간단한 외부 감시 예시

```bash
# cron 등에 넣을 수 있는 원라이너: status ok가 아니면 비정상 종료(exit 1)
curl -sf https://chemeditor.srv1711580.hstgr.cloud/api/v1/health | grep -q '"status":"ok"' || echo "ALERT: chemeditor backend unhealthy"
```

### 7.3 성능 이상 감지

- 모든 검색 응답과 물성 계산 응답에는 서버 측 처리 시간 `elapsed_ms`가 포함됩니다. 목표치(물성 계산 ≤ 1초, 검색 p95 ≤ 3초)를 크게 벗어나면 VPS 리소스를 확인합니다:

```bash
docker stats --no-stream
free -h && df -h
```
