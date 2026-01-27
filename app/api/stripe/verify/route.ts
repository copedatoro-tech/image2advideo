import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  try {
    // 🔐 Verificăm plata
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    /**
     * 🎯 LOGICĂ SIMPLĂ PENTRU MVP
     * Luăm CEL MAI RECENT video generat
     * (următorul pas va fi mapare per sesiune)
     */

    const videosDir = path.join(process.cwd(), "public", "videos");

    if (!fs.existsSync(videosDir)) {
      return NextResponse.json(
        { error: "No videos found" },
        { status: 404 }
      );
    }

    const files = fs
      .readdirSync(videosDir)
      .filter((f) => f.endsWith(".mp4"));

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No video available yet" },
        { status: 404 }
      );
    }

    // 🔽 Luăm ultimul video creat
    const latestVideo = files.sort().reverse()[0];

    return NextResponse.json({
      paid: true,
      videoUrl: `/videos/${latestVideo}`,
      expiresInHours: 72,
    });
  } catch (err) {
    console.error("Stripe verify error:", err);
    return NextResponse.json(
      { error: "Stripe verification failed" },
      { status: 500 }
    );
  }
}
