import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  const stripe = new Stripe(secretKey);

  try {
    const body = await req.json();
    const { price } = body;

    if (!price || price <= 0) {
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
              name: "Image2AdVideo – Video promoțional",
            },
            unit_amount: price * 100, // Stripe lucrează în bani * 100
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return new NextResponse("Stripe error", { status: 500 });
  }
}
