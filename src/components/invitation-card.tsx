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
        {/* Top/left panel — ticket style */}
        <div className="w-full shrink-0 lg:w-[37%] lg:py-3">
          <div className="bg-[#C7EFF9] h-full flex flex-col items-center justify-center gap-4 pt-9 pb-9 px-7 lg:justify-between lg:gap-0 lg:py-10 lg:px-6 xl:py-20 xl:px-10 relative overflow-hidden">
            {/* Mobile notches — left & right sides (40x40) */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#020623] lg:hidden" />
            {/* Desktop notches — top & bottom */}
            <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />
            <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-[#020623]" />

            {/* Top — label + heading */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  className="shrink-0"
                >
                  <path d="M4.5 0L8.39711 6H0.602886L4.5 0Z" fill="#E15D25" />
                </svg>
                <span className="font-mono text-xs text-[#E15D25] uppercase tracking-[-0.12px] font-medium">
                  friend&apos;s Invitation
                </span>
              </div>
              <div className="mt-3">
                <h2 className="font-sans text-[40px] lg:text-5xl xl:text-7xl text-[#020623] leading-[1.05] tracking-[-1.2px] lg:tracking-[-0.05em]">
                  Someone you{" "}
                  <span className="italic">should meet</span>
                </h2>
                <p className="mt-4 font-[family-name:var(--font-gt-era)] text-[#020623]/80 tracking-[-0.32px] text-base leading-[1.6] xl:text-lg">
                  Maiden Voyage&ensp;&middot;&ensp;Svalbard,
                  Norway&ensp;&middot;&ensp;July 2026
                </p>
              </div>
            </div>

            {/* Divider line — gradient */}
            <div
              className="w-px h-16 lg:h-20 xl:h-28"
              style={{
                background:
                  "linear-gradient(180deg, #020623 0%, rgba(2, 6, 35, 0.00) 100%)",
              }}
            />

            {/* Bottom — inviter info */}
            <div className="text-center">
              <p className="font-mono text-xs text-[#020623]/50 uppercase tracking-[-0.12px]">
                &#x2015; A personal invitation from &#x2015;
              </p>
              <div className="mt-2">
                <p className="font-[family-name:var(--font-gt-era)] font-medium text-[22px] sm:text-[28px] text-[#020623] tracking-[-0.88px] leading-[1.6]">
                  Zacharriah Schoose
                </p>
                <p className="font-[family-name:var(--font-gt-era)] text-base text-[rgba(2,6,35,0.5)] tracking-[-0.32px] leading-[1.6]">
                  Founder, MELT Brands&ensp;&middot;&ensp;Executive Director,
                  MELT Global
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom/right panel — on mobile: glacier photo + teal letter stacked; on desktop: teal panel with photo inside */}
        <div className="flex-1 flex flex-col lg:py-3 lg:pr-0">
          {/* Glacier photo — mobile: fixed height; desktop: inside teal panel */}
          <div className="h-[224px] shrink-0 lg:hidden">
            <img
              src="/images/invitation-glacier.jpg"
              alt="Arctic glacier"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Teal letter section */}
          <div className="bg-[#117896] flex-1 relative">
            {/* Desktop glacier photo */}
            <div className="hidden xl:block xl:absolute xl:top-10 xl:left-10 xl:w-56 xl:h-64 overflow-hidden">
              <img
                src="/images/invitation-glacier.jpg"
                alt="Arctic glacier"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Letter body */}
            <div className="p-4 py-10 lg:px-6 lg:py-8 xl:ml-[40%] lg:pr-10 xl:pr-14 space-y-4 lg:space-y-5 font-[family-name:var(--font-gt-era)] text-base lg:text-lg tracking-[-0.32px] lg:tracking-[-0.72px] leading-[1.6] lg:leading-relaxed">
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
            </div>

            {/* Closing quote */}
            <div className="px-4 pb-10 lg:px-6 xl:ml-[40%] lg:pr-10 xl:pr-14">
              <p className="font-[family-name:var(--font-gt-era)] text-2xl lg:text-[32px] text-[#c7eff9] tracking-[-0.72px] lg:tracking-[-1.6px] leading-[1.3]">
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
