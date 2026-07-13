# 배포 가이드 — Vercel(프론트) + VPS(백엔드)

이 앱은 두 부분이다. Vercel 적합성이 완전히 다르므로 **분리 배포**한다.

| 부분 | 스택 | 배포처 | 이유 |
|---|---|---|---|
| 프론트 | React + Vite (정적 빌드) | **Vercel** | 정적 SPA — Vercel의 본령 |
| 백엔드 | FastAPI + **RDKit**(네이티브) + 인메모리 검색 인덱스 | **VPS (Docker)** | RDKit 크기 + 상태유지형 인덱스는 서버리스에 부적합 |

프론트는 API를 자기 오리진의 `/api/v1/*` 상대경로로 호출한다. Vercel `rewrites`(`frontend/vercel.json`)가 그 호출을 서버사이드에서 VPS 백엔드로 프록시한다 → **CORS 불필요, mixed-content 없음**(백엔드가 HTTP여도 동작).

---

## 1) VPS: 백엔드 기동 (Docker)

```bash
# Docker 설치 (Ubuntu, 1회)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker

# 코드
git clone <레포주소> chemeditor && cd chemeditor
git checkout claude/ketcher-chemical-editor-4srsjz

# 백엔드만 기동 (프론트는 Vercel이 담당)
docker compose up --build -d backend
curl http://localhost:8000/api/v1/health      # {"status":"ok",...}
```

`restart: unless-stopped`가 걸려 있어 재부팅 시 자동 복구된다.

### 실측 SDF 적재 (선택)
재단 SDF를 `data/`에 넣고:
```bash
CHEM_INDEX_SDF=/app/data/실제파일.sdf docker compose up -d backend
```
데모용 synthetic 데이터가 필요하면:
```bash
docker compose exec backend python -m scripts.seed_demo 1200 /app/data/demo_synthetic.sdf
CHEM_INDEX_SDF=/app/data/demo_synthetic.sdf docker compose up -d backend
```

### HTTPS 권장 (Caddy 리버스 프록시)
백엔드를 외부에 직접 노출하기보다 도메인 + 자동 TLS를 씌운다.
`docker-compose.yml`에서 백엔드 포트를 `127.0.0.1:8000:8000`으로 바꿔 직접 노출을 막고:
```
# /etc/caddy/Caddyfile
eln-api.example.com {
    reverse_proxy localhost:8000
}
```
→ 백엔드는 `https://eln-api.example.com` 로 접근.

> ⚠️ 이 PoC는 인증이 없다. 외부 공개 시 Caddy `basic_auth` 또는 방화벽(`ufw`)으로 접근을 제한할 것.

---

## 2) Vercel: 프론트 배포

### a. 백엔드 주소 연결
`frontend/vercel.json`의 destination을 **VPS 백엔드 주소**로 교체:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://eln-api.example.com/api/:path*" }
  ]
}
```

### b. Vercel 프로젝트 생성
- Vercel 대시보드 → **Add New → Project** → 이 레포 import
- **Root Directory: `frontend`** ← 반드시 지정
- Framework Preset: **Vite** (자동 감지)
- Build: `npm run build` · Output: `dist` (기본값)
- Deploy

또는 CLI:
```bash
cd frontend
npx vercel --prod        # 최초 로그인/링크 후 배포
```

### c. 확인
배포 URL 접속 → 구조 붙여넣기 → 하단 물성 자동계산, 검색 동작 확인.
(브라우저 네트워크 탭에서 `/api/v1/chem/properties` 가 200이면 프록시 정상)

---

## 대안: rewrites 대신 직접 호출 (VITE_API_BASE)

백엔드가 이미 `CORS allow_origins=["*"]`라 직접 호출도 된다. `vercel.json` 없이:
- Vercel 프로젝트 **Environment Variables**에 `VITE_API_BASE=https://eln-api.example.com` 추가
- 프론트가 `https://eln-api.example.com/api/v1/*`로 직접 호출

단, 이 경우 **백엔드가 반드시 HTTPS**여야 한다(HTTPS 프론트 → HTTP 백엔드는 브라우저가 차단). rewrites 방식이 이 제약이 없어 더 권장된다.

---

## 요약 체크리스트

- [ ] VPS: `docker compose up -d backend` → `/api/v1/health` 200
- [ ] (권장) VPS 백엔드에 Caddy로 HTTPS 도메인 부여 + 접근 제한
- [ ] `frontend/vercel.json` destination을 백엔드 주소로 교체
- [ ] Vercel 프로젝트 Root Directory = `frontend`로 배포
- [ ] 배포 URL에서 물성계산·검색 동작 확인
