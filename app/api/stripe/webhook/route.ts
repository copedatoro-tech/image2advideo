import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import path from 'path'
import { generateVideo } from '@/video-engine/render'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new NextResponse('Webhook error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const videoName = `video_${session.id}.mp4`
    const outputPath = path.join(
      process.cwd(),
      'public/videos',
      videoName
    )

    // 🔥 PORNIM GENERAREA VIDEO
    await generateVideo({
      outputPath,
      sessionId: session.id,
    })
  }

  return NextResponse.json({ received: true })
}
