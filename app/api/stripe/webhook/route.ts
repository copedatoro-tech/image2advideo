import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("❌ Webhook invalid:", err.message);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  console.log("✅ Stripe event primit:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("💰 PLATĂ CONFIRMATĂ");
    console.log("Session ID:", session.id);
    console.log("Payment status:", session.payment_status);
    console.log("Email:", session.customer_details?.email);
  }

  return NextResponse.json({ received: true });
}
