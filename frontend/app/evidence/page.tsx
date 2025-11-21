// app/evidence/page.tsx
"use client";
import { useState } from "react";
import EvidenceViewer from "../../components/EvidenceViewer";

export default function EvidencePage() {
  const [mapping, setMapping] = useState<Record<string, string> | null>(null);

  async function generate() {
    const summary = localStorage.getItem("summary");
    const paragraphs = JSON.parse(localStorage.getItem("paragraphs") || "[]");
    if (!summary) return alert("Generate summary first");

    const sentences = summary
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 3);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/evidence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary_sentences: sentences, paragraphs }),
    });

    const j = await res.json();
    setMapping(j.evidence);
    localStorage.setItem("evidence", JSON.stringify(j.evidence));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Evidence Highlighter</h1>

      <div className="flex gap-4">
        <button onClick={generate} className="bg-rose-600 text-white px-4 py-2 rounded-md">
          Generate Evidence
        </button>
      </div>

      {mapping && <EvidenceViewer mapping={mapping} />}
    </div>
  );
}
