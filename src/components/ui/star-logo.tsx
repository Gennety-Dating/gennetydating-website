import { cn } from "@/lib/utils";

interface StarLogoProps {
  className?: string;
}

export function StarLogo({ className }: StarLogoProps) {
  return (
    <div className={cn("animate-pulse-glow", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/star-mascot.png"
        alt="Gennety mascot"
        width={112}
        height={112}
        className="w-[112px] h-[112px] object-contain"
      />
    </div>
  );
}
