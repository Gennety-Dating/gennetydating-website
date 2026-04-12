import { cn } from "@/lib/utils";

/* --- Section Heading ---
   Uses the editorial serif font (Playfair Display).
   Pass `highlight` to color a specific word in magenta neon. */

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function Heading({
  children,
  as: Tag = "h2",
  className,
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif lowercase tracking-tight text-white",
        Tag === "h1" && "text-[clamp(2.25rem,7vw,6rem)] leading-[1.1]",
        Tag === "h2" && "text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.15]",
        Tag === "h3" && "text-[clamp(1.25rem,3vw,1.875rem)] leading-[1.2]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* --- Script Highlight ---
   Renders text in the handwritten Caveat font with magenta neon glow.
   Used for emphasizing keywords like "your type", "Real", "Personalized". */

interface ScriptHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function ScriptHighlight({ children, className }: ScriptHighlightProps) {
  return (
    <span
      className={cn(
        "font-script text-magenta neon-text inline-block",
        className
      )}
    >
      {children}
    </span>
  );
}

/* --- Highlight ---
   Simple inline magenta highlight without the script font. */

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("text-magenta neon-text-sm", className)}>
      {children}
    </span>
  );
}
