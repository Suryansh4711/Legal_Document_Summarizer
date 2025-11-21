from fastapi import APIRouter
from app.models.matcher import match_evidence

router = APIRouter(prefix="/evidence")

@router.post("")
async def evidence(payload: dict):
    summary_sentences = payload["summary_sentences"]
    paragraphs = payload["paragraphs"]
    result = match_evidence(summary_sentences, paragraphs)
    return {"evidence": result}
