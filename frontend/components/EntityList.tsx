// components/EntityList.tsx
export default function EntityList({ entities }: { entities: Record<string, string[]> }) {
  if (!entities) return null;
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(entities).map((k) => (
        <div key={k} className="bg-card p-4 rounded-md shadow-sm border-border">
          <h4 className="font-semibold mb-2">{k}</h4>
          <ul className="list-disc pl-5">
            {Array.from(new Set(entities[k])).map((v: string, i) => (
              <li key={i} className="text-sm text-muted-foreground">{v}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
