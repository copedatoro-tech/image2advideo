import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

type PriceOptions = {
  imagesCount: number
  duration: number
  style: string
  aiEnabled: boolean
}

function calculatePrice({
  imagesCount,
  duration,
  style,
  aiEnabled,
}: PriceOptions) {
  let amount = 2900 // 29 RON

  if (duration === 30) amount += 1500
  if (duration === 60) amount += 3000

  if (style === "Cinematic") amount += 1500
  if (style === "Premium") amount += 3000

  if (aiEnabled) amount += 2000

  if (imagesCount > 1) {
    amount += (imagesCount - 1) * 300
  }

  if (amount < 2900) amount = 2900

  return amount
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const imagesCount = Number(body.imagesCount) || 1
    const duration = Number(body.duration) || 15
    const style = String(body.style || "Social")
    const aiEnabled = Boolean(body.aiEnabled)

    const amount = calculatePrice({
      imagesCount,
      duration,
      style,
      aiEnabled,
    })

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Image2AdVideo",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?cancel=1`,
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (err) {
    console.error("STRIPE CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
