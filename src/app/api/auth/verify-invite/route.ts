import { NextRequest, NextResponse } from "next/server";
import { createInviteToken } from "@/lib/auth/invite-token";

function corsHeaders(origin: string | null) {
  const allowed = process.env.WEBFLOW_ORIGIN || "";
  // Echo the request origin if it matches the allowed origin, otherwise wildcard
  const allowOrigin =
    origin && allowed && origin.replace(/\/$/, "") === allowed.replace(/\/$/, "")
      ? origin
      : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(null, { headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));
  try {
    const { code } = await req.json();

    if (!code || code !== process.env.INVITE_ACCESS_CODE) {
      return NextResponse.json({ error: "Invalid invite code" }, { status: 403, headers });
    }

    const token = await createInviteToken();
    return NextResponse.json({ token }, { headers });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers });
  }
}
