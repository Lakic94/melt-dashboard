import { MeltCard } from "@/components/melt-card";

const features = [
  {
    icon: "/images/icon-documentary.svg",
    title: "Featured in the documentary",
    description:
      "— your story, your experience, your presence woven into a film distributed globally across streaming platforms, broadcast networks, and the world's finest luxury properties",
  },
  {
    icon: "/images/icon-lineage.svg",
    title: "Your name in the lineage",
    description:
      "— permanently associated with the founding expedition and MELT Reserve",
  },
  {
    icon: "/images/icon-spark.svg",
    title: "Founder-level Spark code",
    description:
      "— your personal code in MELT's Impact Attribution Engine. Everyone who joins through you, and everyone who joins through them, traces back to your tree. Forever.",
  },
  {
    icon: "/images/icon-experience.svg",
    title: "An experience that changes you",
    description:
      "— standing at 79°N, collecting glacial meltwater, knowing it will fund clean water for thousands of people you'll never meet",
  },
  {
    icon: "/images/icon-annual.svg",
    title: "Part of something annual",
    description:
      "— this expedition returns every year, and founding Carriers have a standing invitation to rejoin or refer a Carrier of their choosing each subsequent mission further deepens the community we're building.",
  },
];

export function BecomeCard() {
  return (
    <MeltCard
      pageNumber={8}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Top section — mobile: image then heading stacked; desktop: side by side */}
        <div className="flex flex-col lg:flex-row flex-none lg:flex-1 lg:min-h-0">
          {/* Ship image — mobile on top */}
          <div className="w-full shrink-0 lg:hidden">
            <div className="h-[317px] relative overflow-hidden">
              <img
                src="/images/become-ship.jpg"
                alt="The Polar Xplorer vessel in Arctic waters"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Mobile notches — left & right sides (40x40) */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623]" />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623]" />
            </div>
          </div>

          {/* Heading section */}
          <div className="w-full lg:w-1/3 shrink-0 flex flex-col justify-start pt-8 lg:p-10">
            <div className="space-y-4 lg:space-y-6">
              {/* Label */}
              <div className="flex items-center gap-3 lg:gap-4">
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  className="shrink-0"
                >
                  <path d="M4.5 0L8.39711 6H0.602886L4.5 0Z" fill="#E96A35" />
                </svg>
                <span className="font-mono text-xs lg:text-sm text-[#E96A35] uppercase tracking-[-0.12px] font-medium">
                  The Expedition
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-sans text-[40px] lg:text-7xl xl:text-[80px] text-[#c7eff9] leading-[1.05] tracking-[-1.2px] lg:tracking-[-0.05em]">
                What You{" "}
                <span className="italic lg:block">Become</span>
              </h2>
            </div>
          </div>

          {/* Vertical dashed divider — desktop only */}
          <div className="hidden lg:block w-px border-l border-dashed border-[#c7eff9]/20 shrink-0" />

          {/* Right column — ship image — desktop only */}
          <div className="hidden lg:block flex-1 relative p-2">
            <div className="relative w-full h-full min-h-[500px] overflow-hidden">
              <img
                src="/images/become-ship.jpg"
                alt="The Polar Xplorer vessel in Arctic waters"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Desktop ticket notches */}
            <div className="absolute left-[-22px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623] z-10" />
            <div className="absolute right-[-22px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623] z-10" />
          </div>
        </div>

        {/* Features section — mobile: stacked list with dividers; desktop: 5-column grid */}

        {/* Mobile features list */}
        <div className="lg:hidden">
          {features.map((feature, index) => (
            <div key={feature.title}>
              <div className="border-t border-dashed border-[#c7eff9]/20" />
              <div className="flex flex-col gap-10 py-10">
                {/* Icon */}
                <img
                  src={feature.icon}
                  alt=""
                  className="w-10 h-10"
                />
                {/* Text */}
                <div className="space-y-2">
                  <p className="font-[family-name:var(--font-gt-era)] text-[22px] tracking-[-0.88px] leading-[1.6] font-medium text-[#c7eff9]">
                    {feature.title}
                  </p>
                  <p className="font-[family-name:var(--font-gt-era)] text-base tracking-[-0.32px] leading-[1.6] text-[#c7eff9]/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop features grid */}
        <div className="hidden lg:block">
          {/* Horizontal dashed divider */}
          <div className="border-t border-dashed border-[#c7eff9]/20" />

          <div className="grid grid-cols-5 px-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex">
                <div className="flex-1 flex flex-col gap-20 py-10 px-4">
                  {/* Icon */}
                  <img
                    src={feature.icon}
                    alt=""
                    className="w-10 h-10"
                  />
                  {/* Text */}
                  <div className="space-y-2">
                    <p className="font-[family-name:var(--font-gt-era)] text-[22px] tracking-[-0.88px] leading-[1.6] font-medium text-[#c7eff9]">
                      {feature.title}
                    </p>
                    <p className="font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-[1.6] text-[#c7eff9]/70">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Vertical dashed divider between columns (not after last) */}
                {index < features.length - 1 && (
                  <div className="w-px border-l border-dashed border-[#c7eff9]/20 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
