// components/EvidenceViewer.tsx
import { motion } from "framer-motion";

export default function EvidenceViewer({ mapping }: { mapping: Record<string, string> | null }) {
  if (!mapping) return null;
  return (
    <div className="mt-4 space-y-4">
      {Object.entries(mapping).map(([sent, para], i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-4 rounded-md border-border shadow-sm">
          <p className="font-medium">Summary: <span className="font-normal">{sent}</span></p>
          <div className="mt-2 p-3 bg-background rounded">{para}</div>
        </motion.div>
      ))}
    </div>
  );
}
