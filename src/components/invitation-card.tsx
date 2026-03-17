"use client";

import { useSession } from "@/lib/auth/auth-client";
import { MeltCard } from "@/components/melt-card";

export function InvitationCard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Friend";

  return (
    <MeltCard
      pageNumber={1}
      footerLeft="/ Jan 10,2026"
      footerRight="/ VOL 1.0"
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left panel wrapper — padding reveals dark bg around card */}
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
                  friend&apos;s Invitation
                </span>
              </div>
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-7xl text-[#020623] leading-[0.95] tracking-[-0.05em]">
                  Someone you{" "}
                  <span className="italic">should meet</span>
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

        {/* Right panel — ocean blue letter, flush against left panel */}
        <div className="flex-1 py-3 pr-0">
          <div className="bg-[#117896] h-full relative">
            {/* Glacier photo */}
            <div className="relative xl:absolute xl:top-10 xl:left-10 w-full xl:w-56 h-56 xl:h-64 overflow-hidden">
              <img
                src="/images/invitation-glacier.jpg"
                alt="Arctic glacier"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Letter body */}
            <div className="px-6 py-8 xl:ml-[40%] lg:py-10 lg:pr-10 xl:pr-14 space-y-5 font-[family-name:var(--font-gt-era)] text-lg tracking-[-0.72px] leading-relaxed">
              <p className="text-[#c7eff9]">Hey {userName},</p>

              <p className="text-[#c7eff9]/80">
                This showed up in my inbox and I thought of you.
              </p>

              <p className="text-[#c7eff9]/80">
                He built a water company called{" "}
                <strong className="text-[#c7eff9]">MELT</strong>, which funds
                clean water for people who don&apos;t have it. This July,
                they&apos;re launching their{" "}
                <strong className="text-[#c7eff9]">Maiden Voyage</strong>: an
                expedition to the Arctic to collect glacial water from Svalbard,
                Norway.{" "}
                <strong className="text-[#c7eff9]">
                  Five seats. Eight days
                </strong>
                . Not a luxury trip — a{" "}
                <strong className="text-[#c7eff9]">
                  real expedition dedicated to impact.
                </strong>
              </p>

              <p className="text-[#c7eff9]/80">
                The whole expedition is being{" "}
                <strong className="text-[#c7eff9]">
                  filmed as a documentary
                </strong>{" "}
                — co-produced with PolarX and headed for streaming platforms,
                film festivals, and{" "}
                <strong className="text-[#c7eff9]">
                  broadcast networks worldwide.
                </strong>{" "}
                Carriers are featured in the film. Their contributions fund
                Arctic conservation and help{" "}
                <strong className="text-[#c7eff9]">
                  build clean water infrastructure for thousands.
                </strong>
              </p>

              <div className="text-[#c7eff9]/80">
                <p>
                  He&apos;s looking for a small group of people whose presence
                  means something.
                </p>
                <p className="font-bold text-[#c7eff9]">You came to mind.</p>
              </div>

              <p className="text-[#c7eff9]/80">
                If you&apos;re curious:{" "}
                <a
                  href="https://calendly.com/z-meltbrands/melt-intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline"
                >
                  Schedule a Call &rarr;
                </a>
              </p>

              <p className="text-[#c7eff9]/80">
                I&apos;ve attached AI&apos;s take on the voyage and a short
                documentary about how he got here. Worth a look.
              </p>

              <p className="text-[#c7eff9] text-xl sm:text-2xl xl:text-[32px] tracking-[-1.6px] leading-snug pt-4">
                &ldquo; If this calls you, you&apos;ll know.&ensp;Trust
                it. &rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </MeltCard>
  );
}
