export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-magenta border-t-transparent" />
        <span className="text-sm text-gray-400 select-none">Loading…</span>
      </div>
    </div>
  );
}
