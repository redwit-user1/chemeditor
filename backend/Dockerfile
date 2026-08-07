# Backend: FastAPI + RDKit
FROM python:3.11-slim

# RDKit's manylinux wheel needs a few shared libraries at runtime. The Draw
# module (rdMolDraw2D, used by /api/v1/depict) additionally links the full X11
# client chain — ldd lists libX11/libxcb/libXau/libXdmcp/libexpat — which the
# slim base image does not guarantee, so install it explicitly rather than
# relying on transitive apt dependencies.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libxrender1 libxext6 libx11-6 libxcb1 libxau6 libxdmcp6 libexpat1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
# Index source can be overridden with CHEM_INDEX_SDF (file or directory).
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
