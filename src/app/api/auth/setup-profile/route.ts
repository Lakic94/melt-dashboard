import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { userProfiles, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if profile already exists
    const existing = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, session.user.id),
    });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    const { referralCode } = await req.json();

    // Resolve referral code to a user ID
    let referredByUserId: string | null = null;
    if (referralCode) {
      const referrer = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.referralCode, referralCode),
      });
      if (referrer) {
        referredByUserId = referrer.userId;
      }
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
      metadata: { userId: session.user.id },
    });

    // Generate unique referral code for this user
    const newReferralCode = nanoid(8);

    await db.insert(userProfiles).values({
      id: nanoid(),
      userId: session.user.id,
      referralCode: newReferralCode,
      referredBy: referredByUserId,
      stripeCustomerId: customer.id,
    });

    return NextResponse.json({ ok: true, referralCode: newReferralCode });
  } catch (error) {
    console.error("Setup profile error:", error);
    return NextResponse.json({ error: "Failed to set up profile" }, { status: 500 });
  }
}
