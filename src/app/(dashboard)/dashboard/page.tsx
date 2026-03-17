"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InvitationCard } from "@/components/invitation-card";
import { FiveSeatsCard } from "@/components/five-seats-card";
import { LeverCard } from "@/components/lever-card";
import { VoyageCard } from "@/components/voyage-card";
import { StoryCard } from "@/components/story-card";
import { PresenceCard } from "@/components/presence-card";
import { RequirementsCard } from "@/components/requirements-card";
import { BecomeCard } from "@/components/become-card";
import { RealCard } from "@/components/real-card";

function DashboardContent() {
  const searchParams = useSearchParams();
  const checkoutSuccess = searchParams.get("checkout") === "success";

  return (
    <div className="space-y-6">
      {checkoutSuccess && (
        <div className="rounded-md bg-melt-icefield-blue/30 border border-melt-impact-blue/20 p-4 text-sm text-melt-glacial-ink">
          Your purchase was successful! Thank you for joining MELT.
        </div>
      )}

      <InvitationCard />
      <FiveSeatsCard />
      <LeverCard />
      <VoyageCard />
      <StoryCard />
      <PresenceCard />
      <RequirementsCard />
      <BecomeCard />
      <RealCard />
    </div>
  );
}

export default function InvitationTab() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
