from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router
from app.api.entities import router as entities_router
from app.api.evidence import router as evidence_router

app = FastAPI(title="Legal Document Summarizer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Legal Document Summarizer API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "upload": "/upload",
            "summarize": "/summarize",
            "entities": "/entities",
            "evidence": "/evidence"
        }
    }

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(summarize_router, prefix="/summarize", tags=["Summarization"])
app.include_router(entities_router, prefix="/entities", tags=["Entities"])
app.include_router(evidence_router, prefix="/evidence", tags=["Evidence"])
