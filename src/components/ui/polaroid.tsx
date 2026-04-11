import { cn } from "@/lib/utils";

/* --- PolaroidCard ---
   Scrapbook-style wrapper: white border, slight rotation, drop shadow.
   Pass `rotation` to control the tilt angle. */

interface PolaroidCardProps {
  children: React.ReactNode;
  rotation?: number;
  className?: string;
}

export function PolaroidCard({
  children,
  rotation = -2,
  className,
}: PolaroidCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-2 pb-10 shadow-xl transition-transform hover:scale-[1.02]",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
