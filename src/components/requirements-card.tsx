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
      <div className="flex flex-1 min-h-0 items-center justify-center py-3">
        {/* Inner panel with SVG background (includes ticket notches) */}
        <div className="w-full max-w-[740px] h-full flex flex-col relative">
          {/* SVG background shape */}
          <img
            src="/images/requirements-bg.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          />

          {/* Main details section */}
          <div className="relative flex-1 flex flex-col items-center gap-6 px-10 py-16">
            {/* Label */}
            <div className="flex items-center justify-center gap-4">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 10"
                fill="none"
                className="shrink-0"
              >
                <path d="M6 0L11.1962 9.75H0.803848L6 0Z" fill="white" />
              </svg>
              <span className="font-mono text-sm text-white uppercase tracking-tight font-medium">
                The Details
              </span>
            </div>

            {/* Detail items */}
            <div className="flex flex-col gap-12 items-center w-full">
              <div className="flex flex-col gap-6 w-full">
                {details.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 text-center w-full">
                    <p className="font-mono text-sm text-[#020623]/50 uppercase tracking-tight font-medium leading-[1.6]">
                      {item.label}
                    </p>
                    <p className="font-sans text-[32px] text-[#020623] leading-[1.2] tracking-[-0.96px]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ship icon */}
              <img
                src="/images/ship-icon.svg"
                alt=""
                className="w-[82px] h-[80px] opacity-80"
              />
            </div>
          </div>

          {/* Bottom section — separated by dashed line */}
          <div className="relative z-10 w-full">
            <div className="border-t border-dashed border-[#020623]/20" />
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-24 items-start justify-center px-6 pt-6 pb-10">
              {bottomDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 items-center text-center w-full sm:w-[248px]"
                >
                  <p className="font-mono text-sm text-[#020623]/50 uppercase tracking-tight font-medium leading-[1.6]">
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
