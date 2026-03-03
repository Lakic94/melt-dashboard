"use client";

import { Suspense } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function InvitationContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const checkoutSuccess = searchParams.get("checkout") === "success";

  return (
    <div className="space-y-6">
      {checkoutSuccess && (
        <div className="rounded-md bg-melt-icefield-blue/30 border border-melt-impact-blue/20 p-4 text-sm text-melt-glacial-ink">
          Your purchase was successful! Thank you for joining MELT.
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to MELT</CardTitle>
          <CardDescription>
            You&apos;re in, {session?.user?.name || "friend"}! Here&apos;s your exclusive invitation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-melt-icefield-blue bg-gradient-to-br from-melt-icefield-blue/20 to-melt-impact-blue/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-melt-impact-blue/10">
              <svg
                className="h-10 w-10 text-melt-impact-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-melt-glacial-ink">You&apos;re Invited</h3>
            <p className="text-sm text-muted-foreground">
              As a MELT member, you have access to our exclusive products
              and can invite others through your personal referral code.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next Step</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Head to the <strong>Buy Product</strong> tab to browse MELT products.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Share the Love</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visit the <strong>Referrals</strong> tab to get your unique referral code and
              grow your network.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InvitationTab() {
  return (
    <Suspense>
      <InvitationContent />
    </Suspense>
  );
}
