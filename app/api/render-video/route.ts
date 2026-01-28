// app/api/render-video/route.ts

import { NextResponse } from "next/server";
import { generateVideo } from "@/video-engine/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await generateVideo(body);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Eroare la generarea video:", error.message);
    return NextResponse.json(
      { error: "Eroare la generarea video: " + error.message },
      { status: 500 }
    );
  }
}
