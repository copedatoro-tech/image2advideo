import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  try {
    // PRELUĂM PREȚUL TRIMIS DIN PAGINA PRINCIPALĂ
    const { price, duration, style } = await req.json();

    // Dacă din vreo eroare prețul nu ajunge, punem 29 (baza), dar NU 19.
    const finalAmount = price || 29;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: `Video Ad: ${duration}s, Stil ${style}`,
              description: "Producție video Image2Ad",
            },
            // Înmulțim cu 100 pentru formatul Stripe
            unit_amount: finalAmount * 100, 
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
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}