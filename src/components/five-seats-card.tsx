import { MeltCard } from "@/components/melt-card";

export function FiveSeatsCard() {
  return (
    <MeltCard
      pageNumber={2}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left panel — ticket style */}
        <div className="w-full lg:w-[37%] shrink-0 py-3">
          <div className="bg-[#C7EFF9] h-full flex flex-col items-center justify-between py-8 px-4 sm:py-10 sm:px-6 xl:py-20 xl:px-10 relative overflow-hidden">
            {/* Top ticket notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />
            {/* Bottom ticket notch */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />

            {/* Top — label + heading */}
            <div className="text-center space-y-5">
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  className="shrink-0"
                >
                  <path d="M6 0L11.1962 9.75H0.803848L6 0Z" fill="#E15D25" />
                </svg>
                <span className="font-mono text-sm text-[#E15D25] uppercase tracking-tight font-medium">
                  Carrier Invitation
                </span>
              </div>
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-[#020623] leading-[0.95] tracking-[-0.05em] capitalize">
                  Five Seats
                  <br />
                  <span className="italic">One Mission</span>
                </h2>
                <p className="mt-4 text-[#020623]/80 tracking-tight text-base xl:text-lg">
                  Maiden Voyage&ensp;&middot;&ensp;Svalbard,
                  Norway&ensp;&middot;&ensp;July 2026
                </p>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-px h-20 xl:h-28 bg-[#020623]/15" />

            {/* Bottom — inviter info */}
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-[#020623]/50 uppercase tracking-tight">
                &#x2015; A personal invitation from &#x2015;
              </p>
              <div>
                <p className="text-xl sm:text-[28px] text-[#020623] tracking-[-1.12px] leading-relaxed">
                  Zacharriah Schoose
                </p>
                <p className="text-lg text-[rgba(2,6,35,0.5)] tracking-[-0.72px]">
                  Founder, MELT Brands&ensp;&middot;&ensp;Executive Director,
                  MELT Global
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — full-bleed glacier photo */}
        <div className="flex-1 py-3 pr-0">
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
