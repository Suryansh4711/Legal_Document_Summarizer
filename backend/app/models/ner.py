from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch

MODEL = "nlpaueb/legal-bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForTokenClassification.from_pretrained(MODEL)

def extract_entities(text: str):
    tokens = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model(**tokens)
    predictions = torch.argmax(outputs.logits, dim=2)

    results = {}
    for token, pred in zip(tokens.tokens(), predictions[0].tolist()):
        label = model.config.id2label[pred]
        if label != "O":
            results.setdefault(label, []).append(token.replace("##", ""))

    return results
