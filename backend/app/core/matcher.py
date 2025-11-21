from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

def match_evidence(summary_sentences, paragraphs):
    para_embeds = model.encode(paragraphs, convert_to_tensor=True)
    mapping = {}

    for sent in summary_sentences:
        sent_emb = model.encode(sent, convert_to_tensor=True)
        scores = util.cos_sim(sent_emb, para_embeds)[0]
        best_idx = int(scores.argmax())
        mapping[sent] = paragraphs[best_idx]

    return mapping
