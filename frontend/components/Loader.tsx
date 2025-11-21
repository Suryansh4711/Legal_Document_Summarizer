export default function Loader({ size = 6 }: { size?: number }) {
  return (
    <div className={`animate-spin rounded-full border-t-2 border-primary h-${size} w-${size}`} />
  );
}
