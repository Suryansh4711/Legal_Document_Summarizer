import os
import pdfplumber
import pandas as pd
from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parents[2] / "data"
RAW_DIR = BASE_DIR / "demo"
OUT_CSV = BASE_DIR / "processed_judgments.csv"

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def extract_text(path):
    try:
        with pdfplumber.open(path) as pdf:
            pages = [p.extract_text() for p in pdf.pages]
        pages = [p for p in pages if p]
        return "\n".join(pages)
    except:
        return ""

def process_demo():
    rows = []
    pdfs = [f for f in os.listdir(RAW_DIR) if f.lower().endswith(".pdf")]

    print(f"Found {len(pdfs)} PDF files")

    for pdf in pdfs:
        pdf_path = RAW_DIR / pdf
        text = extract_text(pdf_path)
        text = clean_text(text)

        if len(text) < 200:  
            continue

        rows.append({
            "file": pdf,
            "text": text
        })

    df = pd.DataFrame(rows)
    df.to_csv(OUT_CSV, index=False)
    print(f"Saved {OUT_CSV}")
    print(f"Documents processed: {len(df)}")

if __name__ == "__main__":
    process_demo()
