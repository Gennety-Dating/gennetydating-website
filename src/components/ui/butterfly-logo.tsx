import { cn } from "@/lib/utils";

interface ButterflyLogoProps {
  className?: string;
  size?: number;
  variant?: "gradient-bg" | "gradient-butterfly" | "glassmorphic" | "dark" | "classic";
  animated?: boolean;
}

export function ButterflyLogo({
  className,
  size = 112,
  variant = "gradient-bg",
  animated = true,
}: ButterflyLogoProps) {
  // SVG gradients definitions
  const svgGradients = (
    <defs>
      <linearGradient id="butterfly-insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B253B" />
        <stop offset="35%" stopColor="#C82356" />
        <stop offset="70%" stopColor="#FF00FF" />
        <stop offset="100%" stopColor="#4C0070" />
      </linearGradient>
      <radialGradient id="butterfly-radial-glow" cx="30%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#FF00FF" />
        <stop offset="30%" stopColor="#C82356" />
        <stop offset="70%" stopColor="#8B253B" />
        <stop offset="100%" stopColor="#3B0B1E" />
      </radialGradient>
    </defs>
  );

  let containerClasses = "";
  let containerStyle: React.CSSProperties = { width: size, height: size };
  let pathFill = "#8B253B";

  // Build variants
  switch (variant) {
    case "gradient-bg":
      // App icon style: burgundy/magenta gradient background, white butterfly
      containerClasses = "shadow-[0_12px_40px_rgba(139,37,59,0.45),0_4px_12px_rgba(255,0,255,0.2)] transition-all duration-500";
      containerStyle = {
        ...containerStyle,
        background: "radial-gradient(circle at 30% 107%, #FF00FF 0%, #C82356 30%, #8B253B 75%, #3B0B1E 100%)",
      };
      pathFill = "#FFFFFF";
      break;

    case "gradient-butterfly":
      // Clean white container, burgundy/magenta gradient butterfly
      containerClasses = "bg-white border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]";
      pathFill = "url(#butterfly-radial-glow)";
      break;

    case "glassmorphic":
      // Transparent frosted glass container, glowing burgundy/magenta gradient butterfly
      containerClasses = "bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(139,37,59,0.2)]";
      pathFill = "url(#butterfly-insta-grad)";
      break;

    case "dark":
      // Dark mode container, glowing burgundy/magenta gradient butterfly
      containerClasses = "bg-[#0c0c0c] border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.85)]";
      pathFill = "url(#butterfly-radial-glow)";
      break;

    case "classic":
    default:
      // Original burgundy butterfly, white container
      containerClasses = "bg-white border border-[#8B253B]/10 shadow-[0_4px_20px_rgba(139,37,59,0.15)]";
      pathFill = "#8B253B";
      break;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-3xl hover:scale-105 hover:rotate-2 transition-all duration-300 ease-out select-none",
        containerClasses,
        className
      )}
      style={containerStyle}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-[66%] h-[66%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
      >
        {svgGradients}
        <path
          d="M 50 35 
             C 20 0, -10 30, 15 55 
             C -5 75, 25 100, 48 65 
             L 52 65 
             C 75 100, 105 75, 85 55 
             C 110 30, 80 0, 50 35 
             Z"
          fill={pathFill}
        />
      </svg>
    </div>
  );
}
