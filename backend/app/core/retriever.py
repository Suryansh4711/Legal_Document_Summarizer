import hnswlib
import numpy as np
from pathlib import Path
import pickle
from sentence_transformers import SentenceTransformer
from app.core.config import settings


class HNSWRetriever:
    def __init__(self):
        self.index_path = Path(settings.DATA_DIR / "hnsw_index.bin")
        self.meta_path = Path(settings.DATA_DIR / "hnsw_meta.pkl")

        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        if self.index_path.exists() and self.meta_path.exists():
            self._load()
        else:
            raise FileNotFoundError("HNSW index or metadata missing. Please build embeddings first.")

    def _load(self):
        # Load metadata (paragraph dataframe)
        with open(self.meta_path, "rb") as f:
            meta = pickle.load(f)
        self.df = meta["df"]

        # Load HNSW index
        dim = 384  # all-MiniLM-L6-v2 embedding dimension
        self.index = hnswlib.Index(space="cosine", dim=dim)
        self.index.load_index(str(self.index_path))

        self.index.set_ef(64)

    def query(self, text, top_k=3):
        # Embed query
        q_emb = self.model.encode([text], convert_to_numpy=True)

        # Search
        labels, distances = self.index.knn_query(q_emb, k=top_k)

        results = []
        for idx, dist in zip(labels[0], distances[0]):
            row = self.df.iloc[int(idx)]
            results.append({
                "score": float(1 - dist),    # cosine distance → similarity
                "paragraph": row["paragraph"],
                "file": row["file"]
            })
        return results


# Create global retriever instance
try:
    retriever = HNSWRetriever()
except FileNotFoundError:
    retriever = None
