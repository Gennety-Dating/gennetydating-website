interface LlmDumpBlockProps {
  psychologicalSummary: string | null;
  negativeConstraints: string | null;
  partnerPreferences: string | null;
}

export function LlmDumpBlock({
  psychologicalSummary,
  negativeConstraints,
  partnerPreferences,
}: LlmDumpBlockProps) {
  if (!psychologicalSummary && !negativeConstraints && !partnerPreferences) {
    return (
      <p className="text-sm text-white/30 italic">No AI analysis generated yet.</p>
    );
  }

  return (
    <div className="space-y-4">
      {psychologicalSummary && (
        <div className="relative rounded-lg border border-fuchsia-500/40 bg-fuchsia-950/20 p-4">
          {/* Badge */}
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/50 bg-fuchsia-500/10 px-2.5 py-0.5 text-xs font-medium text-fuchsia-400">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            AI Psychological Summary
          </span>
          {/* Glow border accent */}
          <div
            className="absolute left-0 top-0 h-full w-[3px] rounded-l-lg"
            style={{ background: "linear-gradient(180deg, #FF00FF 0%, #a855f7 100%)" }}
          />
          <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-white/90">
            {psychologicalSummary}
          </p>
        </div>
      )}

      {partnerPreferences && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
            Partner Preferences
          </p>
          <p className="text-sm leading-relaxed text-white/80">{partnerPreferences}</p>
        </div>
      )}

      {negativeConstraints && (
        <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400/70">
            Negative Constraints
          </p>
          <p className="text-sm leading-relaxed text-white/80">{negativeConstraints}</p>
        </div>
      )}
    </div>
  );
}
