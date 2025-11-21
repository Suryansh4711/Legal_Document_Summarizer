from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL = "allenai/led-base-16384"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL)

def summarize_text(text: str, level: str = "short"):
    if level == "micro":
        max_len, min_len = 80, 40
    elif level == "short":
        max_len, min_len = 180, 80
    else:
        max_len, min_len = 350, 150

    inputs = tokenizer(text, truncation=True, padding="longest", max_length=4096, return_tensors="pt")
    outputs = model.generate(
        inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=max_len,
        min_length=min_len,
        num_beams=4,
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
