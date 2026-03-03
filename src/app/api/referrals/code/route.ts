import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, session.user.id),
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const referralLink = `${process.env.WEBFLOW_ORIGIN}/reserve?ref=${profile.referralCode}`;

  return NextResponse.json({
    referralCode: profile.referralCode,
    referralLink,
  });
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await req.json();
  const trimmed = typeof code === "string" ? code.trim() : "";

  if (!trimmed || trimmed.length < 2 || trimmed.length > 30) {
    return NextResponse.json(
      { error: "Code must be between 2 and 30 characters" },
      { status: 400 },
    );
  }

  // Check if code is already taken by another user
  const existing = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.referralCode, trimmed),
  });

  if (existing && existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "This referral code is already taken" },
      { status: 409 },
    );
  }

  // If it's the same as their current code, just return it
  if (existing && existing.userId === session.user.id) {
    return NextResponse.json({
      referralCode: trimmed,
      referralLink: `${process.env.WEBFLOW_ORIGIN}/reserve?ref=${trimmed}`,
    });
  }

  await db
    .update(userProfiles)
    .set({ referralCode: trimmed })
    .where(eq(userProfiles.userId, session.user.id));

  return NextResponse.json({
    referralCode: trimmed,
    referralLink: `${process.env.WEBFLOW_ORIGIN}/reserve?ref=${trimmed}`,
  });
}
