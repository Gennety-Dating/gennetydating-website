import { cn } from "@/lib/utils";

/* --- MessageBubble ---
   Glassmorphic iMessage-style chat bubble.
   Used for testimonials, comparison section, and footer slogan. */

interface MessageBubbleProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "dark";
  tail?: "left" | "right" | "none";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "glass text-white",
  blue: "bg-[#007AFF]/90 backdrop-blur-xl text-white border border-white/10",
  dark: "bg-white/10 backdrop-blur-xl text-white border border-white/10",
};

export function MessageBubble({
  children,
  variant = "default",
  tail = "none",
  className,
}: MessageBubbleProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-2xl px-5 py-3.5 text-sm leading-relaxed",
          variantStyles[variant]
        )}
      >
        {children}
      </div>

      {/* iMessage-style tail */}
      {tail !== "none" && (
        <div
          className={cn(
            "absolute -bottom-1.5 w-4 h-4 rounded-br-xl",
            tail === "left" && "left-4",
            tail === "right" && "right-4",
            variant === "default" && "bg-glass border-b border-r border-glass-border",
            variant === "blue" && "bg-[#007AFF]/90",
            variant === "dark" && "bg-white/10"
          )}
          style={{ transform: tail === "left" ? "skewX(20deg)" : "skewX(-20deg)" }}
        />
      )}
    </div>
  );
}
