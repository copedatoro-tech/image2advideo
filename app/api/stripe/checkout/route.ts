import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { price } = body;

    if (!price || typeof price !== "number") {
      return NextResponse.json(
        { error: "Preț invalid" },
        { status: 400 }
      );
    }

    // 🔥 URL REAL (nu localhost)
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://image2advideo.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Image2AdVideo – Video promo",
            },
            unit_amount: price * 100, // RON → bani
          },
          quantity: 1,
        },
      ],

      success_url: `${baseUrl}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Eroare Stripe" },
      { status: 500 }
    );
  }
}
