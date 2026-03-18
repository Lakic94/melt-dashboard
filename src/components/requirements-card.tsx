import { MeltCard } from "@/components/melt-card";

const details = [
  { label: "When", value: "July 2026" },
  { label: "Where", value: "Svalbard, Norway (via Longyearbyen)" },
  {
    label: "Duration",
    value:
      "8-day expedition aboard the Polar Xplorer to Brassvellbreen glacier (79°N)",
  },
  {
    label: "Vessel",
    value: (
      <>
        The Polar Xplorer
        <br />
        PolarX expedition vessel
      </>
    ),
  },
  { label: "Accommodations", value: "The Funken Lodge, Longyearbyen" },
];

const bottomDetails = [
  {
    label: "Physical Requirements",
    value:
      "Good health, moderate fitness, ability to handle cold and remote conditions",
  },
  { label: "Contribution", value: "By personal conversation" },
];

export function RequirementsCard() {
  return (
    <MeltCard
      pageNumber={7}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-1 min-h-0 items-center justify-center py-0 lg:py-3">
        {/* Inner panel */}
        <div className="w-full max-w-[740px] h-full flex flex-col relative bg-[#E76027] overflow-hidden">
          {/* Mobile notches — left & right sides (40x40) */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] z-10 lg:hidden" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] z-10 lg:hidden" />
          {/* Desktop notches — top & bottom */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#020623] z-10" />
          <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-[#020623] z-10" />

          {/* Main details section */}
          <div className="relative flex-1 flex flex-col items-center gap-6 px-4 py-6 lg:px-10 lg:py-16">
            {/* Label */}
            <div className="flex items-center justify-center gap-3 lg:gap-4">
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                className="shrink-0"
              >
                <path d="M4.5 0L8.39711 6H0.602886L4.5 0Z" fill="white" />
              </svg>
              <span className="font-mono text-xs lg:text-sm text-white uppercase tracking-[-0.12px] font-medium">
                The Details
              </span>
            </div>

            {/* Detail items */}
            <div className="flex flex-col gap-8 lg:gap-12 items-center w-full">
              <div className="flex flex-col gap-6 w-full">
                {details.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 text-center w-full">
                    <p className="font-mono text-xs lg:text-sm text-[#020623]/50 uppercase tracking-[-0.12px] font-medium leading-[1.6]">
                      {item.label}
                    </p>
                    <p className="font-sans text-2xl lg:text-[32px] text-[#020623] leading-[1.2] tracking-[-0.48px] lg:tracking-[-0.96px]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ship icon */}
              <img
                src="/images/ship-icon.svg"
                alt=""
                className="w-[61px] h-[60px] lg:w-[82px] lg:h-[80px] opacity-80"
              />
            </div>
          </div>

          {/* Bottom section — separated by dashed line */}
          <div className="relative z-10 w-full">
            <div className="border-t border-dashed border-[#020623]/20" />
            <div className="flex flex-col gap-6 lg:gap-24 lg:flex-row items-center justify-center px-6 pt-8 pb-10">
              {bottomDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 items-center text-center w-[248px]"
                >
                  <p className="font-mono text-sm text-[#020623]/50 uppercase tracking-[-0.14px] font-medium leading-[1.6]">
                    {item.label}
                  </p>
                  <p className="font-sans text-lg text-black tracking-[-0.36px] leading-[1.3]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
