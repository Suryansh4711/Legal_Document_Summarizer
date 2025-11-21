"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
    },
  });

  async function handleUpload() {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      localStorage.setItem("documentText", json.text);
      localStorage.setItem("paragraphs", JSON.stringify(json.paragraphs || []));
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading document");
    } finally {
      setUploading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card p-6 rounded-lg shadow-md border-border"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-muted-foreground">
          {isDragActive ? "Drop the file here..." : "Drag & drop a PDF or TXT file, or click to select"}
        </p>
      </div>

      {file && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
