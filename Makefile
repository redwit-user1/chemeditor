# KMEDIhub ELN PoC — developer commands
#
# `make dev` uses Docker Compose (the intended demo path). For environments
# without Docker, `make dev-local` runs the backend and frontend directly.

.PHONY: dev dev-local backend frontend test test-backend test-frontend \
        bench parity load-sdf install-backend install-frontend clean

# ---- Docker (intended) ----
dev:
	docker compose up --build

# ---- Local (no Docker) ----
dev-local:
	@echo "Run these in two terminals:"
	@echo "  make backend    # FastAPI + RDKit on :8000"
	@echo "  make frontend   # Vite dev server on :3000"

backend:
	cd backend && PYTHONPATH=. python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && npm run dev

# ---- Setup ----
install-backend:
	cd backend && python3 -m pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

# ---- Tests ----
test: test-backend test-frontend

test-backend:
	cd backend && PYTHONPATH=. python3 -m pytest

test-frontend:
	cd frontend && npm run typecheck && npm test

# ---- Data / validation / benchmarks ----
load-sdf:
	cd backend && PYTHONPATH=. python3 -m scripts.load_sdf ../data

parity:
	cd backend && PYTHONPATH=. python3 -m scripts.parity ../data ../reports/parity.md

bench:
	cd backend && PYTHONPATH=. python3 -m scripts.bench ../reports/bench.md

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} + 2>/dev/null || true
	rm -rf backend/.pytest_cache backend/*.db backend/*.sqlite3
