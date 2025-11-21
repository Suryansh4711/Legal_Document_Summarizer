// components/UploadForm.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { uploadDocument } from "../services/api";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return alert("Choose a PDF file first");
    setLoading(true);

    try {
      const data = await uploadDocument(file);
      localStorage.setItem("documentText", data.text);
      localStorage.setItem("paragraphs", JSON.stringify(data.paragraphs || []));
      // move to summary page
      window.location.href = "/summary";
    } catch (err) {
      console.error(err);
      alert("Upload failed. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card p-6 rounded-md shadow-sm border-border">
      <label className="block mb-2 font-medium">Choose PDF</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-4"
      />
      <div className="flex items-center gap-3">
        <button onClick={upload} className="bg-primary text-primary-foreground px-4 py-2 rounded-md" disabled={loading}>
          {loading ? "Uploading..." : "Upload & Process"}
        </button>
        <button
          onClick={() => {
            setFile(null);
            localStorage.removeItem("documentText");
            localStorage.removeItem("paragraphs");
          }}
          className="px-3 py-2 border border-border rounded-md"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
}
