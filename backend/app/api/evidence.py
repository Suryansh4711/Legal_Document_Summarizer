from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

try:
    from app.core.retriever import retriever
except Exception:
    retriever = None


router = APIRouter()


class EvidenceRequest(BaseModel):
    summary_sentences: List[str]
    top_k: int = 3


@router.post("/")
def evidence(req: EvidenceRequest):
    if retriever is None:
        raise HTTPException(status_code=503, detail="Retriever not initialized. Please build embeddings first.")
    
    mapping = {}
    for s in req.summary_sentences:
        results = retriever.query(s, top_k=req.top_k)
        mapping[s] = results
    return {"evidence": mapping}