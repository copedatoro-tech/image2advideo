import { NextResponse } from "next/server"
import path from "path"
import { generateVideo } from "@/video-engine/render"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const imagePath = body.imagePath

    if (!imagePath) {
      return NextResponse.json({ error: "No image path" }, { status: 400 })
    }

    const outputName = `video-${Date.now()}.mp4`

    const videoPath = await generateVideo({
      imagePath: path.join(process.cwd(), "public", imagePath),
      outputName,
    })

    return NextResponse.json({ videoPath })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Video generation failed" }, { status: 500 })
  }
}
