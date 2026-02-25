import { NextResponse } from "next/server";
import { generateVideo } from "../../../video-engine/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      imageUrl,
      videoDuration,
      videoStyle,
      aiEnabled,
      sessionId,
    } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Date lipsă" },
        { status: 400 }
      );
    }

    const videoName = await generateVideo({
      imageUrl,
      videoDuration,
      videoStyle,
      aiEnabled,
    });

    const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
    const token = `${videoName}__${expiresAt}`;

    return NextResponse.json({
      success: true,
      videoUrl: `/api/video/${token}`,
    });
  } catch (error) {
    console.error("Render video error:", error);
    return NextResponse.json(
      { error: "Eroare generare video" },
      { status: 500 }
    );
  }
}
