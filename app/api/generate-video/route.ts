import { NextResponse } from "next/server";
import Replicate from "replicate";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl, sessionId } = body;

    if (!imageUrl || !sessionId) {
      return NextResponse.json(
        { error: "Date lipsă" },
        { status: 400 }
      );
    }

    // 1️⃣ Verificăm plata Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Plata nu este confirmată" },
        { status: 402 }
      );
    }

    // 2️⃣ Generare video AI (Replicate – pay per use)
    const output = await replicate.run(
      "stability-ai/stable-video-diffusion",
      {
        input: {
          image: imageUrl,
          motion_bucket_id: 127,
          fps: 6,
          duration: 3,
        },
      }
    );

    // 3️⃣ Returnăm video
    return NextResponse.json({
      success: true,
      videoUrl: Array.isArray(output) ? output[0] : output,
    });

  } catch (error: any) {
    console.error("AI VIDEO ERROR:", error);
    return NextResponse.json(
      { error: "Eroare la generarea video-ului" },
      { status: 500 }
    );
  }
}
