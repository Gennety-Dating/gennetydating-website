import Image from "next/image";
import { cn } from "@/lib/utils";

interface StarLogoProps {
  className?: string;
}

export function StarLogo({ className }: StarLogoProps) {
  return (
    <div className={cn("animate-pulse-glow", className)}>
      <Image
        src="/images/star-mascot.png"
        alt="Gennety mascot"
        width={112}
        height={112}
        className="w-20 h-20 md:w-28 md:h-28 object-contain"
        priority
      />
    </div>
  );
}
