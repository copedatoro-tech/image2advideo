import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY missing");
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  const stripe = new Stripe(secretKey);

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return new NextResponse("Missing sessionId", { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paid: session.payment_status === "paid",
    });
  } catch (err) {
    console.error("Stripe verify error:", err);
    return new NextResponse("Stripe error", { status: 500 });
  }
}
