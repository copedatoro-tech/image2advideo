import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ paid: false });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json({
      paid: session.payment_status === "paid",
    });
  } catch (err) {
    console.error("Stripe verify error:", err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
