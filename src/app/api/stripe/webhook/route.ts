import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { purchases } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      if (!userId) break;

      // Get line items to find the product
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productItem = lineItems.data[0];

      await db.insert(purchases).values({
        id: nanoid(),
        userId,
        stripeCheckoutSessionId: session.id,
        stripeSubscriptionId: null,
        priceId: productItem?.price?.id || "unknown",
        productName: productItem?.description || "MELT Product",
        status: session.payment_status === "paid" ? "completed" : "pending",
        amount: session.amount_total,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      break;
    }

    case "payment_intent.payment_failed": {
      console.log("Payment failed:", event.data.object.id);
      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
