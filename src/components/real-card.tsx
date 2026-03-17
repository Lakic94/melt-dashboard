import { MeltCard } from "@/components/melt-card";

export function RealCard() {
  return (
    <MeltCard
      pageNumber={9}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-1 min-h-0 relative">
        {/* Inner teal panel */}
        <div className="bg-[#117896] w-full relative overflow-hidden">
          {/* Left ticket notch */}
          <div className="hidden lg:block absolute left-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623] z-10" />
          {/* Right ticket notch */}
          <div className="hidden lg:block absolute right-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#020623] z-10" />

          {/* Heading — overlaps image, positioned top-left */}
          <div className="absolute top-0 left-0 p-10 z-20 w-[320px]">
            <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] text-[#fffaf5] leading-[0.95] tracking-[-0.05em]">
              The Real{" "}
              <span className="italic block mt-1">Invitation</span>
            </h2>
          </div>

          {/* Center — Photo, absolutely positioned full height */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-[calc(33%-100px)] w-[32%] z-0">
            <img
              src="/images/real-person.png"
              alt="Person in red MELT Brands jacket facing the Arctic ocean"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Mobile photo */}
          <div className="lg:hidden w-full h-[400px] relative mt-[180px]">
            <img
              src="/images/real-person.png"
              alt="Person in red MELT Brands jacket facing the Arctic ocean"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right — Text content, uses margin-left to position, stays in flow to drive height */}
          <div className="relative lg:ml-[58%] p-10 lg:pl-16 flex flex-col gap-8 z-10">
            <div className="space-y-6 font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-[1.6] text-white/70">
              <p>
                The people receiving this have already done extraordinary things.
                Your brand, your generosity, your network. You&apos;ve already
                helped shape the world in ways most people will never understand.
                That&apos;s exactly why I&apos;m reaching out.
              </p>
              <p>This is your next move.</p>
              <p>
                Not because you need one. But because this is one of those rare
                moments where everything aligns. Purpose, adventure, legacy, and
                impact that compounds long after the expedition ends. The kind of
                thing you look back on and think, that mattered.
              </p>
              <p>
                And if the timing isn&apos;t right for you, or this isn&apos;t
                your chapter, I&apos;d be grateful if you&apos;d pass this along
                to someone in your world who&apos;s ready for it. Someone hungry.
                Someone building. The kind of person you&apos;d bet on. The right
                people tend to find these things when they&apos;re meant to.
              </p>
              <p>
                If something in here resonates, I&apos;d love to talk about what
                we&apos;re building and whether it&apos;s the right fit.
              </p>
            </div>

            {/* More text */}
            <div className="space-y-6 font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-[1.6] text-white/70">
              <p>
                I&apos;ve attached AI&apos;s take on the expedition and a short
                documentary about how I got here. (It&apos;s crazy. I&apos;m the
                first to admit it.)
              </p>
              <p>
                Take a look when you have a few minutes.
                <br />
                This one means a lot to me. Thank you for reading this far.
              </p>
            </div>

            {/* Closing statement */}
            <p className="font-[family-name:var(--font-gt-era)] text-[32px] tracking-[-1.6px] leading-[1.3] text-[#fffaf5]">
              If this calls you, you&apos;ll know.&nbsp; Trust it.
            </p>
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
