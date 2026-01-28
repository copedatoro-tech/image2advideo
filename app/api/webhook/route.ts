import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) throw new Error("Missing Stripe signature or secret");

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🔥 Procesăm doar plata completă
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const jobId = session.metadata?.jobId;

    if (!jobId) {
      console.error("❌ Missing jobId in metadata");
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    console.log("🔥 Pornim generarea video-ului pentru job:", jobId);

    const jobDir = path.join("/tmp/jobs", jobId);

    if (!fs.existsSync(jobDir)) {
      console.error("❌ Job folder not found:", jobDir);
      return NextResponse.json({ error: "Job folder missing" }, { status: 400 });
    }

    // 🔥 Pornim scriptul video-engine/render.js
    const renderProcess = spawn("node", [
      path.join(process.cwd(), "video-engine/render.js"),
      jobDir,
    ]);

    renderProcess.stdout.on("data", (data) => {
      console.log("🎬 Render:", data.toString());
    });

    renderProcess.stderr.on("data", (data) => {
      console.error("❌ Render error:", data.toString());
    });

    renderProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Video generat cu succes pentru job:", jobId);

        // 🔥 Marcam jobul ca finalizat
        fs.writeFileSync(
          path.join(jobDir, "status.json"),
          JSON.stringify({ status: "done", video: "output.mp4" })
        );
      } else {
        console.error("❌ Render failed with code:", code);

        fs.writeFileSync(
          path.join(jobDir, "status.json"),
          JSON.stringify({ status: "error" })
        );
      }
    });

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ ignored: true });
}
