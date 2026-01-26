import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      duration,
      format,
      style,
    } = body;

    // PREȚ DE BAZĂ
    let total = 19;

    // DURATĂ
    if (duration === "30s") total += 10;
    if (duration === "60s") total += 20;

    // FORMAT
    if (format === "9:16") total += 5;
    if (format === "1:1") total += 3;

    // STIL
    if (style === "premium") total += 7;

    // CONVERSIE RON → BANI MICI
    const amount = total * 100;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Image to Video AI",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Stripe checkout error" },
      { status: 500 }
    );
  }
}
