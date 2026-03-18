import { cn } from "@/lib/utils";

interface MeltCardProps {
  pageNumber: number;
  footerLeft: string;
  footerRight: string;
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}

export function MeltCard({
  pageNumber,
  footerLeft,
  footerRight,
  children,
  className,
  backgroundImage,
}: MeltCardProps) {
  const pageLabel = `/ P.${String(pageNumber).padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "bg-[#020623] rounded-2xl overflow-hidden max-w-[1920px] min-h-[600px] lg:min-h-[800px] xl:min-h-[950px] mx-auto relative flex flex-col",
        className
      )}
    >
      {/* Optional background image with gradient overlay */}
      {backgroundImage && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 60% uniform dark overlay + top-to-bottom gradient fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgb(2,6,35) 0%, rgba(2,6,35,0) 100%), rgba(2,6,35,0.6)",
            }}
          />
        </div>
      )}

      {/* Stars background texture — z-20 above content, screen blend to drop the black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: "url('/images/background_stars.png')",
          backgroundSize: "cover",
          backgroundPosition: "top left",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-10 h-[60px] shrink-0">
        <img
          src="/melt_logo.png"
          alt="MELT"
          className="h-6 w-auto brightness-0 invert"
        />
        <span className="font-mono text-sm text-[#c7eff9]/50 uppercase tracking-tight">
          {pageLabel}
        </span>
      </div>

      {/* Dashed crosshair lines — edge to edge, crossing at panel corners to form + marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      >
        {/* Top horizontal line */}
        <div className="absolute top-[64px] sm:top-[60px] left-0 right-0 border-t border-dashed border-[#c7eff9]/20" />
        {/* Bottom horizontal line */}
        <div className="absolute bottom-[62px] sm:bottom-[60px] left-0 right-0 border-t border-dashed border-[#c7eff9]/20" />
        {/* Left vertical line */}
        <div className="absolute left-[12px] sm:left-[20px] top-0 bottom-0 border-l border-dashed border-[#c7eff9]/20" />
        {/* Right vertical line */}
        <div className="absolute right-[12px] sm:right-[20px] top-0 bottom-0 border-l border-dashed border-[#c7eff9]/20" />
        {/* Plus icons at intersections */}
        <span className="absolute top-[64px] sm:top-[60px] left-[12px] sm:left-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute top-[64px] sm:top-[60px] right-[12px] sm:right-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute bottom-[62px] sm:bottom-[60px] left-[12px] sm:left-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute bottom-[62px] sm:bottom-[60px] right-[12px] sm:right-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
      </div>

      {/* Content area — pt/pb creates gap from dashed lines on mobile */}
      <div className="relative px-8 pt-3 pb-2 lg:pt-0 lg:pb-0 flex-1 min-h-0 flex flex-col">{children}</div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 lg:px-10 h-[60px] shrink-0">
        <span className="font-mono text-sm text-[#c7eff9]/50 uppercase tracking-tight">
          {footerLeft}
        </span>
        <span className="font-mono text-sm text-[#c7eff9]/50 uppercase tracking-tight">
          {footerRight}
        </span>
      </div>
    </div>
  );
}
