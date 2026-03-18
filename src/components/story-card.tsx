import { MeltCard } from "@/components/melt-card";

export function StoryCard() {
  return (
    <MeltCard
      pageNumber={5}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
      backgroundImage="/images/story-bg.png"
    >
      <div className="flex flex-col lg:flex-row items-start justify-between flex-1 min-h-0 pt-4 lg:pt-[60px] px-0 lg:px-10">
        {/* Left column — heading + intro */}
        <div className="w-full lg:w-[42%] shrink-0 space-y-4 lg:space-y-8">
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
            This Story Will Be{" "}
            <span className="italic">Seen by Millions</span>
          </h2>

          {/* Intro paragraph */}
          <p className="font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-white/70">
            We&apos;ve partnered with{" "}
            <strong className="text-white">PolarX</strong>. The expedition
            company behind the Polar Xplorer — Our plan is to co-produce a
            compelling documentary of the Maiden Voyage, built for{" "}
            <strong className="text-white">global distribution.</strong>
          </p>
        </div>

        {/* Right column — distribution list + closing */}
        <div className="w-full lg:w-[53%] font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] text-white/70 space-y-6 mt-8 lg:mt-0">
          <p>The distribution plan:</p>

          <ul className="space-y-3 list-disc pl-7">
            <li>
              <strong className="text-white">Streaming platforms</strong> —
              Netflix, Prime Video, Apple TV+, and others acquiring this kind of
              content right now
            </li>
            <li>
              <strong className="text-white">Film festivals</strong> —
              Telluride, Tribeca, SXSW, Hot Docs, Banff Mountain Film Festival
            </li>
            <li>
              <strong className="text-white">Broadcast networks</strong> —
              National Geographic, BBC, Discovery
            </li>
            <li>
              <strong className="text-white">
                Luxury resort in-room screens
              </strong>{" "}
              — the finest properties in the world that carry MELTwater Reserve
              will feature this story on their guest screens, showcasing where
              the water came from, who collected it, and what it funds
            </li>
            <li>
              <strong className="text-white">
                PolarX and MELT channels
              </strong>{" "}
              — our combined platforms, social media, and networks
            </li>
            <li>
              <strong className="text-white">
                The Networks of our Carriers
              </strong>
              , our World class Camera and Crew Members all play a role in
              helping this movement grow into what its meant to be.
            </li>
          </ul>

          <p>
            Conscious consumerism, wellness, and expedition documentaries are
            among the fastest-growing segments in streaming. Platforms are
            actively looking for exactly this: stories tied to climate, purpose,
            and authentic human experience.
          </p>

          <p className="text-lg tracking-[-0.72px]">
            As a Carrier, you&apos;re not a spectator. You&apos;re in this film.
            Your presence, your story, your experience on the glacier — it
            becomes part of a documentary distributed globally. Your support and
            your generosity will be recognized by many, and will live on in
            history forever.
          </p>
        </div>
      </div>
    </MeltCard>
  );
}
