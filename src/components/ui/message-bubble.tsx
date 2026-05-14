import { cn } from "@/lib/utils";

/* --- MessageBubble ---
   Pure minimalist glassmorphic message container geometry.
   Renders cleanly as a rounded rectangle without intrusive side tails. */

interface MessageBubbleProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "dark";
  tail?: "left" | "right" | "none"; // Kept for API compatibility
  className?: string;
}

export function MessageBubble({
  children,
  variant = "default",
  className,
}: MessageBubbleProps) {
  // Нативные фоновые классы
  const baseBg = variant === "blue" 
    ? "bg-[#007AFF]/90 text-white" 
    : variant === "dark" 
    ? "bg-white/10 text-white" 
    : "glass text-white";

  const hasBorder = variant === "blue" || variant === "dark";

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <div
        className={cn(
          "relative z-10 rounded-2xl px-5 py-3.5 text-sm leading-relaxed backdrop-blur-xl shadow-lg transition-all duration-300",
          baseBg,
          hasBorder && "border border-white/10"
        )}
      >
        {children}
      </div>
    </div>
  );
}
