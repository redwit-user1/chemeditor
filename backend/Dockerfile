# Backend: FastAPI + RDKit
FROM python:3.11-slim

# RDKit's manylinux wheel needs a few shared libraries at runtime.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libxrender1 libxext6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
# Index source can be overridden with CHEM_INDEX_SDF (file or directory).
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
