import { NextResponse } from "next/server";
import Stripe from "stripe";

// 🔐 Cheia Stripe din environment
const stripeSecret = process.env.STRIPE_SECRET_KEY;

// Verificare cheie Stripe
if (!stripeSecret) {
  throw new Error("❌ STRIPE_SECRET_KEY lipsă în Vercel");
}

// Inițializare Stripe fără apiVersion (evităm eroarea de compilare)
const stripe = new Stripe(stripeSecret);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { price } = body;

    console.log("🔍 Preț primit:", price);

    // Validare preț
    if (!price || typeof price !== "number") {
      return NextResponse.json(
        { error: "Preț invalid" },
        { status: 400 }
      );
    }

    // URL-ul aplicației tale live
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://image2advideo.vercel.app";

    // Creare sesiune Stripe
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
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    console.log("✅ Stripe session creat:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe checkout error:", err.message);
    return NextResponse.json(
      { error: "Eroare Stripe" },
      { status: 500 }
    );
  }
}
