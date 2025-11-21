def chunk_text(text, max_length=600):
    paragraphs = [p.strip() for p in text.split("\n") if len(p.strip()) > 10]
    return paragraphs
