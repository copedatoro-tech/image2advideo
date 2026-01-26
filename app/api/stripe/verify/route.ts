import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { paid: false },
      { status: 400 }
    );
  }

  try {
    const session =
      await stripe.checkout.sessions.retrieve(
        sessionId
      );

    if (session.payment_status === "paid") {
      return NextResponse.json({ paid: true });
    }

    return NextResponse.json({ paid: false });
  } catch (error) {
    return NextResponse.json(
      { paid: false },
      { status: 500 }
    );
  }
}
