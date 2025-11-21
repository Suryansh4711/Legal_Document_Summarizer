export const API_URL = "http://localhost:8000";

export async function uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    
    if (!res.ok) {
        throw new Error("Upload failed");
    }
    
    return res.json();
}

export async function summarize(text: string) {
    const res = await fetch(`${API_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level: "short" })
    });
    return res.json();
}

export async function extractEntities(text: string) {
    const res = await fetch(`${API_URL}/entities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    return res.json();
}

export async function getEvidence(sentences: string[]) {
    const res = await fetch(`${API_URL}/evidence/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary_sentences: sentences, top_k: 3 })
    });
    return res.json();
}
