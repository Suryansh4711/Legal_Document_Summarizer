import pandas as pd
import numpy as np
from pathlib import Path
import hnswlib
from sentence_transformers import SentenceTransformer
import pickle


BASE = Path(__file__).resolve().parents[2] / "data"
PARAS = BASE / "paragraphs.csv"
INDEX_PATH = BASE / "hnsw_index.bin"
META_PATH = BASE / "hnsw_meta.pkl"


def build():
    print("Loading paragraphs CSV...")
    df = pd.read_csv(PARAS)
    texts = df["paragraph"].astype(str).tolist()

    print("Encoding with SBERT (MiniLM)...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = model.encode(texts, convert_to_numpy=True, batch_size=32, show_progress_bar=True)

    dim = embeddings.shape[1]

    print("Building HNSW index...")
    index = hnswlib.Index(space="cosine", dim=dim)
    index.init_index(max_elements=len(embeddings), ef_construction=200, M=16)

    index.add_items(embeddings, np.arange(len(embeddings)))
    index.set_ef(64)

    print("Saving index...")
    index.save_index(str(INDEX_PATH))

    with open(META_PATH, "wb") as f:
        pickle.dump({"df": df}, f)

    print("HNSW index built and saved.")


if __name__ == "__main__":
    build()
