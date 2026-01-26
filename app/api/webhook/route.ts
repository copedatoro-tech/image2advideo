import { NextResponse } from "next/server";
import Stripe from "stripe";
import Replicate from "replicate";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("✅ PAYMENT CONFIRMED");
    console.log("Session ID:", session.id);
    console.log("Customer email:", session.customer_details?.email);

    // 🔥 PORNIM GENERAREA VIDEO
    const prediction = await replicate.predictions.create({
      version: "cjwbw/image-to-video", // model standard
      input: {
        image: session.metadata?.imageUrl,
        prompt: "Promotional video, cinematic, modern, smooth motion",
        duration: 5,
      },
    });

    console.log("🎬 VIDEO GENERATION STARTED");
    console.log("Prediction ID:", prediction.id);
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ webhook: "alive" });
}
