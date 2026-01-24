import Stripe from "stripe";
import { headers } from "next/headers";
import { generateVideo } from "@/video-engine/render";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const imagePath = session.metadata?.imagePath;

    if (imagePath) {
      const outputName = `video-${Date.now()}.mp4`;

      await generateVideo({
        imagePath: path.join(process.cwd(), "public", imagePath),
        outputName,
      });
    }
  }

  return new Response("OK", { status: 200 });
}
