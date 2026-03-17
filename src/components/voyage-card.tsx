import { MeltCard } from "@/components/melt-card";

export function VoyageCard() {
  return (
    <MeltCard
      pageNumber={4}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left panel — ship photo with side notches */}
        <div className="w-full lg:w-1/2 shrink-0 py-3 pl-3">
          <div className="h-full relative overflow-hidden">
            <img
              src="/images/voyage-ship.jpg"
              alt="Expedition vessel in Arctic ice waters"
              className="object-cover w-full h-full"
            />
            {/* Left side notch */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623]" />
            {/* Right side notch */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623]" />
          </div>
        </div>

        {/* Right panel — dark text content */}
        <div className="flex-1 py-3 pr-0">
          <div className="bg-[#020623] h-full flex flex-col justify-start pt-[60px] pb-[40px] px-8 lg:px-12 xl:px-[120px]">
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 10"
                fill="none"
                className="shrink-0"
              >
                <path d="M6 0L11.1962 9.75H0.803848L6 0Z" fill="#E96A35" />
              </svg>
              <span className="font-mono text-sm text-[#E96A35] uppercase tracking-tight font-medium">
                The Expedition
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-7xl 2xl:text-[80px] text-[#c7eff9] leading-[0.95] tracking-[-0.05em] mb-8">
              We&apos;re launching our{" "}
              <span className="italic">Maiden Voyage.</span>
            </h2>

            {/* Body copy */}
            <div className="space-y-6 font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-relaxed pt-8">
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
