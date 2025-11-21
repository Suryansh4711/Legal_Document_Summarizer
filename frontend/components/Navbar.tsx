"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-card text-card-foreground border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link href="/" className="font-bold text-lg">
            Legal AI Assistant
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/summary" className="text-sm text-muted-foreground">Summary</Link>
          <Link href="/entities" className="text-sm text-muted-foreground">Entities</Link>
          <Link href="/evidence" className="text-sm text-muted-foreground">Evidence</Link>

          <div>
            {mounted && (
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="px-3 py-2 rounded-md border border-border"
              >
                {resolvedTheme === "dark" ? "🌙" : "☀️"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
