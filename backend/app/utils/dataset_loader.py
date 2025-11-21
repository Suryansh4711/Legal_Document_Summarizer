import pandas as pd

def load_indian_kanoon(path: str):
    df = pd.read_csv(path)
    df.dropna(subset=["judgement_text"], inplace=True)
    texts = df["judgement_text"].tolist()
    return texts
