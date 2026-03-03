import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { products } from "@/lib/stripe/prices";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // Get or create Stripe customer
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, session.user.id),
    });

    let stripeCustomerId = profile?.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: { userId: session.user.id },
      });
      stripeCustomerId = customer.id;
      if (profile) {
        await db
          .update(userProfiles)
          .set({ stripeCustomerId: customer.id })
          .where(eq(userProfiles.userId, session.user.id));
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      client_reference_id: session.user.id,
      mode: "payment",
      line_items: [
        { price: product.stripePriceId, quantity: 1 },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/buy?checkout=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
