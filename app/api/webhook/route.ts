import { NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await buffer(req.body);
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) throw new Error("Missing Stripe signature or secret");

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🔥 Ascultăm doar evenimentul de plată completă
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;
    const customerEmail = session.customer_details?.email || "fără email";

    console.log("✅ Plata completă:", sessionId, customerEmail);

    // 🔥 Aici vom porni generarea video-ului
    // TODO: trimite imaginile + opțiunile către video-engine

    // Exemplu temporar:
    // await generateVideo({ sessionId, images, duration, style, aiEnabled });

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ ignored: true });
}
