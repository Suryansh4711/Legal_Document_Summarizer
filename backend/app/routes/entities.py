from fastapi import APIRouter
from app.models.ner import extract_entities

router = APIRouter(prefix="/entities")

@router.post("")
async def entities(payload: dict):
    text = payload["text"]
    result = extract_entities(text)
    return {"entities": result}
