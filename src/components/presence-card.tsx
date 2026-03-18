import { MeltCard } from "@/components/melt-card";

export function PresenceCard() {
  return (
    <MeltCard
      pageNumber={6}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Mobile: masked image on top */}
        <div className="flex items-center justify-center pt-4 pb-8 lg:hidden">
          <div
            className="relative w-[306px] h-[324px]"
            style={{
              maskImage: "url('/images/presence-mask.svg')",
              WebkitMaskImage: "url('/images/presence-mask.svg')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <img
              src="/images/presence-child.png"
              alt="Young boy joyfully catching clean water"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Left panel — Presence content */}
        <div className="w-full lg:w-1/2 shrink-0 flex flex-col justify-between lg:py-10">
          {/* Top section */}
          <div className="space-y-6 lg:space-y-10">
            <div className="space-y-4 lg:space-y-6 px-0 lg:px-10">
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
              <h2 className="font-sans text-[40px] lg:text-5xl xl:text-7xl 2xl:text-[80px] text-[#c7eff9] leading-[1.05] tracking-[-1.2px] lg:tracking-[-0.05em]">
                What Your Presence{" "}
                <span className="italic">Makes Possible</span>
              </h2>

              {/* Intro text */}
              <p className="font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-[#c7eff9]/70">
                Every Carrier&apos;s contribution flows through MELT Global, our
                501(c)(3) nonprofit, in two directions:
              </p>
            </div>

            {/* Sections with dashed dividers */}
            <div className="space-y-6">
              {/* Top divider */}
              <div className="border-t border-dashed border-[#c7eff9]/20" />

              {/* Arctic Conservation */}
              <div className="space-y-2 px-0 lg:px-10">
                <p className="font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-[1.6] font-bold text-[#c68346]">
                  ARCTIC CONSERVATION
                </p>
                <p className="font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-[#c7eff9]/70">
                  A significant portion goes directly to Arctic conservation
                  through Handelens Milj&oslash;fond and Salt &mdash;
                  organizations doing critical ecosystem protection, ocean
                  cleanup, and environmental stewardship in the very waters
                  we&apos;re sailing.
                </p>
              </div>

              {/* Middle divider */}
              <div className="border-t border-dashed border-[#c7eff9]/20" />

              {/* The Mission */}
              <div className="space-y-2 px-0 lg:px-10">
                <p className="font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-[1.6] font-bold text-[#c68346]">
                  THE MISSION
                </p>
                <p className="font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-[#c7eff9]/70">
                  The rest funds clean water infrastructure &mdash; wells,
                  filtration systems, pipelines &mdash; for communities that
                  have never had safe water. GPS-verified. Filmed. Documented.
                </p>
              </div>

              {/* Bottom divider */}
              <div className="border-t border-dashed border-[#c7eff9]/20" />
            </div>
          </div>

          {/* Bottom callout with orange left border */}
          <div className="flex gap-3 lg:gap-6 items-stretch lg:pr-10 mt-10 mb-10">
            <div className="w-[3px] shrink-0 bg-[#E96A35] rounded-full" />
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-[#c7eff9]/70">
                When we sell the water we collect, MELT Reserve continues
                funding clean water infrastructure for thousands of people
                who&apos;ve never had it. Each expedition provides clean water
                access for thousands &mdash; and as the brand grows, that number
                only goes up because we pass the growth back to the mission.
              </p>
              <p className="font-sans text-xl text-[#c7eff9] tracking-[-0.4px] leading-[1.4]">
                It&apos;s a perpetual flywheel. The expedition funds the Arctic.
                The water funds humanity. And it runs every year.
              </p>
            </div>
          </div>
        </div>

        {/* Vertical dashed divider — desktop only */}
        <div className="hidden lg:block w-px border-l border-dashed border-[#c7eff9]/20 shrink-0" />

        {/* Right panel — Masked image — desktop only */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-10">
          <div
            className="relative w-full max-w-[700px] aspect-[822/957]"
            style={{
              maskImage: "url('/images/presence-mask.svg')",
              WebkitMaskImage: "url('/images/presence-mask.svg')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <img
              src="/images/presence-child.png"
              alt="Young boy joyfully catching clean water"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
