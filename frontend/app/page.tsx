// app/page.tsx
"use client";
import UploadForm from "../components/UploadForm";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload a Legal Document</h1>
        <p className="text-muted-foreground">PDF → extract → summarize → explore evidence</p>
      </div>

      <UploadForm />
    </div>
  );
}
