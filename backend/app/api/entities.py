from fastapi import APIRouter
from pydantic import BaseModel
from app.core.ner import extract_entities


router = APIRouter()


class EntitiesRequest(BaseModel):
    text: str


@router.post("/")
def entities(req: EntitiesRequest):
    ents = extract_entities(req.text)
    return {"entities": ents}