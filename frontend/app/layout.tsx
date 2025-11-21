// app/layout.tsx
import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Legal AI Assistant",
  description: "Upload legal documents, summarize, extract clauses & evidence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen transition-colors">
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
