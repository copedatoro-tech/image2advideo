import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!secretKey || !baseUrl) {
    console.error("Stripe env missing");
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2023-10-16",
  });

  try {
    const body = await req.json();
    const price = body.price;

    // 🔐 VALIDARE HARD (anti-bug / anti-fraud)
    if (!price || typeof price !== "number" || price < 29) {
      return new NextResponse("Invalid price", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Image2AdVideo",
              description: "Video promo generat din imagini",
            },
            unit_amount: price * 100, // RON → bani
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/result?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new NextResponse("Stripe error", { status: 500 });
  }
}
