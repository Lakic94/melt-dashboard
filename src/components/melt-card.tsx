import { cn } from "@/lib/utils";

interface MeltCardProps {
  pageNumber: number;
  footerLeft: string;
  footerRight: string;
  children: React.ReactNode;
  className?: string;
}

export function MeltCard({
  pageNumber,
  footerLeft,
  footerRight,
  children,
  className,
}: MeltCardProps) {
  const pageLabel = `/ P.${String(pageNumber).padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "bg-[#020623] rounded-2xl overflow-hidden max-w-[1920px] min-h-[600px] lg:min-h-[800px] xl:min-h-[950px] mx-auto relative flex flex-col",
        className
      )}
    >
      {/* Stars background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/images/background_stars.png')",
          backgroundSize: "300px 200px",
          backgroundPosition: "top left",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-[60px]">
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
        className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
      >
        {/* Top horizontal line — aligns with top of panels */}
        <div className="absolute top-[60px] left-0 right-0 border-t border-dashed border-[#c7eff9]/20" />
        {/* Bottom horizontal line — aligns with bottom of panels */}
        <div className="absolute bottom-[60px] left-0 right-0 border-t border-dashed border-[#c7eff9]/20" />
        {/* Left vertical line */}
        <div className="absolute left-[20px] top-0 bottom-0 border-l border-dashed border-[#c7eff9]/20" />
        {/* Right vertical line */}
        <div className="absolute right-[20px] top-0 bottom-0 border-l border-dashed border-[#c7eff9]/20" />
        {/* Plus icons at intersections — centered exactly on crossing points */}
        <span className="absolute top-[60px] left-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute top-[60px] right-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute bottom-[60px] left-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
        <span className="absolute bottom-[60px] right-[20px] flex h-0 w-0 items-center justify-center text-[#c7eff9]/70 text-xl font-mono font-thin leading-none select-none">
          +
        </span>
      </div>

      {/* Content area */}
      <div className="relative px-8 flex-1 min-h-0">{children}</div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-[60px]">
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
