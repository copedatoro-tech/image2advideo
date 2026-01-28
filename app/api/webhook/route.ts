import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await req.text(); // ✅ înlocuiește buffer din micro
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) throw new Error("Missing Stripe signature or secret");

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;
    const customerEmail = session.customer_details?.email || "fără email";

    console.log("✅ Plata completă:", sessionId, customerEmail);

    // TODO: aici vom porni generarea video-ului

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ ignored: true });
}
