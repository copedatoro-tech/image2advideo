import { NextResponse } from "next/server";
import { generateVideo } from "@/lib/video-engine/generateVideo";

export async function POST() {
  try {
    const result = await generateVideo();

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("Render video error:", error);
    return NextResponse.json(
      { ok: false, error: "Video render failed" },
      { status: 500 }
    );
  }
}
