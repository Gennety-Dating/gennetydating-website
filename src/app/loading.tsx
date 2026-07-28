export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight text-white" aria-busy="true" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-magenta border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Loading...</span>
      </div>
    </div>
  );
}
