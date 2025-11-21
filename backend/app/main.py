from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.summarize import router as summarize_router
from app.routes.entities import router as entities_router
from app.routes.evidence import router as evidence_router

app = FastAPI(title="Legal AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(summarize_router)
app.include_router(entities_router)
app.include_router(evidence_router)

@app.get("/health")
def health():
    return {"status": "ok"}
