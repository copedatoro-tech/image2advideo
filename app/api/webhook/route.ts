import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const dataFile = path.join(process.cwd(), "users.json");

    let users: any = {};
    if (fs.existsSync(dataFile)) {
      users = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    }

    users["demo-user"] = {
      paid: true,
      paymentId: event.data.object.id,
      date: new Date().toISOString(),
    };

    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

    console.log("✅ ACCESS ACTIVATED");
  }

  return NextResponse.json({ received: true });
}
