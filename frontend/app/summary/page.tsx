"use client";
import { useState } from "react";
import SummaryControls from "../../components/SummaryControls";

export default function SummaryPage() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Summaries</h1>
      <SummaryControls onSummary={(s) => setSummary(s)} />
      {summary && (
        <div className="mt-6 bg-card text-card-foreground p-4 rounded-md shadow-sm border-border">
          <h3 className="font-medium mb-2">Summary</h3>
          <pre className="whitespace-pre-wrap">{summary}</pre>
        </div>
      )}
    </div>
  );
}
