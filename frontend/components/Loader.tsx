// components/Loader.tsx
export default function Loader({ size = 6 }: { size?: number }) {
  return (
    <div className={`w-${size} h-${size} rounded-full animate-pulse bg-muted`} />
  );
}
