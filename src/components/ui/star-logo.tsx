import { cn } from "@/lib/utils";

interface StarLogoProps {
  className?: string;
}

export function StarLogo({ className }: StarLogoProps) {
  return (
    <div className={cn("animate-pulse-glow", className)}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 5-point star with rounded corners */}
        <path
          d="M24 2 L29.3 16.7 L44.9 17.2 L32.6 26.8 L36.9 41.8 L24 33 L11.1 41.8 L15.4 26.8 L3.1 17.2 L18.7 16.7 Z"
          fill="#FF00FF"
          stroke="#FF00FF"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Inner smaller star for depth */}
        <path
          d="M24 10 L27.5 19.1 L37.3 19.7 L29.7 25.9 L32.2 35.3 L24 30 L15.8 35.3 L18.3 25.9 L10.7 19.7 L20.5 19.1 Z"
          fill="#FF55FF"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
