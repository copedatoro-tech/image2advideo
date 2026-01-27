import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import type Stripe from "stripe";

// oprește body parser (OBLIGATORIU pt webhook)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook verification failed", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // ✅ PLATĂ CONFIRMATĂ
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("✅ Payment completed:", session.id);

    const metadata = session.metadata || {};

    const videoDuration = metadata.videoDuration;
    const videoStyle = metadata.videoStyle;
    const aiEnabled = metadata.aiEnabled === "true";

    // ⏳ expirare 72h
    const expiresAt = Date.now() + 72 * 60 * 60 * 1000;

    // 🎥 nume video demo (temporar)
    const videoName = "demo.mp4";

    const token = `${videoName}__${expiresAt}`;

    // 🔜 AICI APELI render-ul tău real
    // await startVideoRender({ videoDuration, videoStyle, aiEnabled, token });

    console.log("🎬 Video job created:", {
      videoDuration,
      videoStyle,
      aiEnabled,
      token,
    });
  }

  return NextResponse.json({ received: true });
}
