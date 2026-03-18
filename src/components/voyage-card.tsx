import { MeltCard } from "@/components/melt-card";

export function VoyageCard() {
  return (
    <MeltCard
      pageNumber={4}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Top/left panel — ship photo with side notches */}
        <div className="w-full shrink-0 lg:w-1/2 lg:py-3 lg:pl-3">
          <div className="h-[317px] lg:h-full relative overflow-hidden">
            <img
              src="/images/voyage-ship.jpg"
              alt="Expedition vessel in Arctic ice waters"
              className="object-cover w-full h-full"
            />
            {/* Mobile notches — right side only (left is clipped by card edge) */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            {/* Desktop notches */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623]" />
            <div className="hidden lg:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623]" />
          </div>
        </div>

        {/* Bottom/right panel — dark text content */}
        <div className="flex-1 lg:py-3 lg:pr-0">
          <div className="bg-transparent lg:bg-[#020623] h-full flex flex-col justify-start pt-8 pb-10 px-4 lg:pt-[60px] lg:pb-[40px] lg:px-12 xl:px-[120px]">
            {/* Label */}
            <div className="flex items-center gap-3 mb-4 lg:gap-4 lg:mb-6">
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
            <h2 className="font-sans text-[40px] lg:text-5xl xl:text-7xl 2xl:text-[80px] text-[#c7eff9] leading-[1.05] tracking-[-1.2px] lg:tracking-[-0.05em] mb-8">
              We&apos;re launching our{" "}
              <span className="italic">Maiden Voyage.</span>
            </h2>

            {/* Body copy */}
            <div className="space-y-4 lg:space-y-6 font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] lg:leading-relaxed pt-0 lg:pt-8">
              <p className="text-[#c7eff9]/70">
                This July, we&apos;re launching our Maiden Voyage — an
                expedition to the Arctic to collect glacial meltwater from a
                waterfall cascading directly into the sea off Svalbard, Norway,{" "}
                <strong className="text-[#c7eff9]">
                  one of the most remote places on Earth
                </strong>
                . No pumps or hoses, just meeting the water the moment it&apos;s
                ready.
              </p>

              <p className="text-[#c7eff9]/70">
                This water becomes MELT Reserve: The most purposeful water on
                earth.
              </p>

              <p className="text-[#c68346] font-bold">
                Five seats. Eight days. A real expedition, not a luxury cruise.
              </p>

              <p className="text-[#c7eff9]/70">
                Cold oceans. Arctic light, long quiet days of reflection and
                introspection and bonding with nature and aligned souls. Beauty
                that&apos;s unexplainable with words.{" "}
                <strong className="text-[#c7eff9]">
                  Standing at the edge of the world
                </strong>
                , collecting water that will change lives of people you will
                never meet.
              </p>

              <p className="text-[#c7eff9]/70">
                <strong className="text-[#c7eff9]">
                  This trip changes how you see the planet, business, and your
                  place in it
                </strong>
                . It saves animals, helps the environment, and gives people
                clean water for decades. (Yes, we somehow fit all of that into
                one expedition.)
              </p>

              <p className="text-[#c7eff9]/70">
                My time in the Arctic has changed me forever. I want to share
                that with the right people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
