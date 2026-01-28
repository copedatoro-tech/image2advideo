import { NextResponse } from "next/server";
import { generateVideo } from "@/lib/video-engine/generateVideo";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new NextResponse("Missing imageUrl", { status: 400 });
    }

    const video = await generateVideo(imageUrl);

    return NextResponse.json({ video });
  } catch (error) {
    console.error("Render video error:", error);
    return new NextResponse("Video generation failed", { status: 500 });
  }
}
