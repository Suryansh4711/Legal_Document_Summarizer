// components/Providers.tsx
"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // next-themes will add/remove the "dark" class on <html> automatically
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
