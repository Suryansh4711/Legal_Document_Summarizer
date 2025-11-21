from fastapi import APIRouter, UploadFile
from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.chunker import chunk_text

router = APIRouter()

@router.post("")
async def upload_pdf(file: UploadFile):
    text = extract_text_from_pdf(file.file)
    paragraphs = chunk_text(text)
    return {"text": text, "paragraphs": paragraphs}
