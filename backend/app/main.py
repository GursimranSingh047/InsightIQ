from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import upload, ai

app = FastAPI(
    title=settings.app_name,
    description="AI Business Intelligence Platform API",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5177"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api/v1/data", tags=["Data Ingestion"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Services"])

@app.get("/health")
def health_check():
    return {"status": "ok", "environment": settings.environment}
