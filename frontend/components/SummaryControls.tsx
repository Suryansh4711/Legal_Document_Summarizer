// components/SummaryControls.tsx
"use client";
import { useState } from "react";

export default function SummaryControls({ onSummary }: { onSummary: (s: string) => void }) {
  const [level, setLevel] = useState<"micro" | "short" | "detailed">("short");
  const [loading, setLoading] = useState(false);

  async function generate() {
    const text = localStorage.getItem("documentText");
    if (!text) return alert("Upload a document first");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level }),
      });
      if (!res.ok) throw new Error("Summarization failed");
      const j = await res.json();
      onSummary(j.summary);
      localStorage.setItem("summary", j.summary);
    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card p-4 rounded-md shadow-sm border-border flex items-center gap-4">
      <select value={level} onChange={(e) => setLevel(e.target.value as "micro" | "short" | "detailed")} className="border-border rounded px-3 py-2 bg-transparent">
        <option value="micro">Micro</option>
        <option value="short">Short</option>
        <option value="detailed">Detailed</option>
      </select>

      <button onClick={generate} disabled={loading} className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        {loading ? "Generating..." : "Generate Summary"}
      </button>
    </div>
  );
}
