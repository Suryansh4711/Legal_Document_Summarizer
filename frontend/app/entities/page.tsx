// app/entities/page.tsx
"use client";
import { useState } from "react";
import EntityList from "../../components/EntityList";

export default function EntitiesPage() {
  const [entities, setEntities] = useState<Record<string, string[]> | null>(null);

  async function runExtract() {
    const text = localStorage.getItem("documentText");
    if (!text) return alert("Upload a document first");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/entities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const j = await res.json();
    setEntities(j.entities);
    localStorage.setItem("entities", JSON.stringify(j.entities));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Entities & Clauses</h1>

      <div className="flex items-center gap-4">
        <button onClick={runExtract} className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Extract Entities
        </button>
      </div>

      {entities && <EntityList entities={entities} />}
    </div>
  );
}
