import { NextResponse } from "next/server";
import { generateVideo } from "@/video-engine/render";

export async function POST() {
  try {
    console.log("🚀 API generate-video called");

    // generateVideo NU primește argumente
    const videoPath = await generateVideo();

    return NextResponse.json({
      success: true,
      videoPath,
    });
  } catch (error: any) {
    console.error("❌ Video generation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Video generation error",
      },
      { status: 500 }
    );
  }
}
