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
        Tag === "h1" && "text-5xl md:text-7xl lg:text-8xl leading-[1.1]",
        Tag === "h2" && "text-3xl md:text-5xl lg:text-6xl leading-[1.15]",
        Tag === "h3" && "text-2xl md:text-3xl leading-[1.2]",
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
