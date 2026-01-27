import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // sau versiunea ta curentă
});

export async function POST(req: Request) {
  try {
    const { price, duration, style } = await req.json();

    // IMPORTANT: Stripe primește prețul în bani (subdiviziuni), deci înmulțim cu 100
    // Dacă prețul calculat în interfață este 129 RON, aici va deveni 12900 unități
    const unitAmount = price * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: `Video Ad - ${duration}s, Stil ${style}`,
              description: "Producție video profesională Image2Ad",
            },
            unit_amount: unitAmount, // Aici punem prețul total trimis din interfață
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Eroare Stripe:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}