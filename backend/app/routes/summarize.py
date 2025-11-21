from fastapi import APIRouter
from app.models.summarizer import summarize_text

router = APIRouter(prefix="/summarize")

@router.post("")
async def summarize(payload: dict):
    text = payload["text"]
    level = payload.get("level", "short")
    summary = summarize_text(text, level)
    return {"summary": summary}
