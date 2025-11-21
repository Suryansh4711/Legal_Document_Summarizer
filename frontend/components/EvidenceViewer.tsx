"use client";
import { motion } from "framer-motion";

export default function EvidenceViewer({ mapping }: { mapping: Record<string, string> | null }) {
  if (!mapping) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 space-y-4"
    >
      {Object.entries(mapping).map(([sentence, evidence], idx) => (
        <div key={idx} className="bg-card p-4 rounded-md shadow-sm border-border">
          <p className="text-sm font-medium mb-2">{sentence}</p>
          <p className="text-xs text-muted-foreground italic">Evidence: {evidence}</p>
        </div>
      ))}
    </motion.div>
  );
}
