import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2] / "data"

def create_paragraphs():
    df = pd.read_csv(BASE_DIR / "processed_judgments.csv")
    rows = []

    for _, row in df.iterrows():
        text = row["text"]
        paras = [p.strip() for p in text.split(". ") if len(p.strip()) > 50]

        for i, p in enumerate(paras):
            rows.append({
                "file": row["file"],
                "paragraph_index": i,
                "paragraph": p
            })

    out = pd.DataFrame(rows)
    out.to_csv(BASE_DIR / "paragraphs.csv", index=False)
    print("Saved paragraphs:", len(out))

if __name__ == "__main__":
    create_paragraphs()
