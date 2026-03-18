import { MeltCard } from "@/components/melt-card";

export function FiveSeatsCard() {
  return (
    <MeltCard
      pageNumber={2}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Top/left panel — ticket style */}
        <div className="w-full shrink-0 lg:w-[37%] lg:py-3">
          <div className="bg-[#C7EFF9] h-full flex flex-col items-center justify-center gap-4 pt-9 pb-9 px-7 lg:justify-between lg:gap-0 lg:py-10 lg:px-6 xl:py-20 xl:px-10 relative overflow-hidden">
            {/* Mobile notches — left & right sides (40x40) */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            {/* Desktop notches — top & bottom */}
            <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />
            <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />

            {/* Top — label + heading */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  className="shrink-0"
                >
                  <path d="M4.5 0L8.39711 6H0.602886L4.5 0Z" fill="#E15D25" />
                </svg>
                <span className="font-mono text-xs text-[#E15D25] uppercase tracking-[-0.12px] font-medium">
                  Carrier Invitation
                </span>
              </div>
              <div className="mt-3">
                <h2 className="font-sans text-[40px] lg:text-5xl xl:text-7xl text-[#020623] leading-[1.05] tracking-[-1.2px] lg:tracking-[-0.05em] capitalize">
                  Five Seats
                  <br />
                  <span className="italic">One Mission</span>
                </h2>
                <p className="mt-4 font-[family-name:var(--font-gt-era)] text-[#020623]/80 tracking-[-0.32px] text-base leading-[1.6] xl:text-lg">
                  Maiden Voyage&ensp;&middot;&ensp;Svalbard,
                  Norway&ensp;&middot;&ensp;July 2026
                </p>
              </div>
            </div>

            {/* Divider line — gradient fades at top and bottom */}
            <div
              className="w-px h-16 lg:h-20 xl:h-28"
              style={{
                background:
                  "linear-gradient(180deg, #020623 0%, rgba(2, 6, 35, 0.00) 100%)",
              }}
            />

            {/* Bottom — inviter info */}
            <div className="text-center">
              <p className="font-mono text-xs text-[#020623]/50 uppercase tracking-[-0.12px]">
                &#x2015; A personal invitation from &#x2015;
              </p>
              <div className="mt-2">
                <p className="font-[family-name:var(--font-gt-era)] font-medium text-[22px] sm:text-[28px] text-[#020623] tracking-[-0.88px] leading-[1.6]">
                  Zacharriah Schoose
                </p>
                <p className="font-[family-name:var(--font-gt-era)] text-base text-[rgba(2,6,35,0.5)] tracking-[-0.32px] leading-[1.6]">
                  Founder, MELT Brands&ensp;&middot;&ensp;Executive Director,
                  MELT Global
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom/right panel — full-bleed glacier photo */}
        <div className="h-[317px] shrink-0 lg:h-auto lg:shrink lg:flex-1 lg:py-3 lg:pr-0">
          <div className="h-full relative overflow-hidden">
            <img
              src="/images/five-seats-glacier.jpg"
              alt="Aerial view of Arctic glacier meeting the ocean"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
