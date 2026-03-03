import { NextRequest, NextResponse } from "next/server";
import { verifyInviteToken } from "@/lib/auth/invite-token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /signup — require valid invite token
  if (pathname === "/signup") {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const result = await verifyInviteToken(token);
    if (!result.valid) {
      const url = new URL("/login", req.url);
      url.searchParams.set("error", "invite_expired");
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Protect /dashboard/* — require auth session
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie =
      req.cookies.get("better-auth.session_token") ||
      req.cookies.get("__Secure-better-auth.session_token");
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/dashboard/:path*"],
};
