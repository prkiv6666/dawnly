export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-12 w-12 animate-soft-pulse rounded-full bg-sunrise shadow-glow" />
        <p className="text-sm text-charcoal-soft">Warming up…</p>
      </div>
    </div>
  );
}
