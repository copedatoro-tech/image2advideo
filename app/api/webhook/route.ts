import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

// 🔥 IMPORTANT: dezactivăm edge runtime
export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
  });

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const jobId = session.metadata?.jobId;

    if (!jobId) return NextResponse.json({ error: "Missing jobId" }, { status: 400 });

    const jobDir = path.join("/tmp/jobs", jobId);
    if (!fs.existsSync(jobDir)) return NextResponse.json({ error: "Job folder missing" }, { status: 400 });

    // 🔥 Importăm spawn DOAR aici
    const { spawn } = require("child_process");

    const renderProcess = spawn("node", [
      path.join(process.cwd(), "video-engine/render.js"),
      jobDir,
    ]);

    renderProcess.stdout.on("data", (data: Buffer) => {
      console.log("🎬 Render:", data.toString());
    });

    renderProcess.stderr.on("data", (data: Buffer) => {
      console.error("❌ Render error:", data.toString());
    });

    renderProcess.on("close", (code: number) => {
      const statusPath = path.join(jobDir, "status.json");

      if (code === 0) {
        fs.writeFileSync(statusPath, JSON.stringify({ status: "done", video: "output.mp4" }));
      } else {
        fs.writeFileSync(statusPath, JSON.stringify({ status: "error" }));
      }
    });

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ ignored: true });
}
