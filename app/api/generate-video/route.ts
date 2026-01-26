import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imagePath } = body;

    if (!imagePath) {
      return NextResponse.json(
        { success: false, error: "imagePath missing" },
        { status: 400 }
      );
    }

    const outputName = `video-${Date.now()}.mp4`;

    const res = await fetch("http://localhost:3000/api/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagePath: path.join(process.cwd(), "public", imagePath),
        outputName,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("Render failed");
    }

    return NextResponse.json({
      success: true,
      videoPath: data.videoPath,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Generate video failed" },
      { status: 500 }
    );
  }
}
