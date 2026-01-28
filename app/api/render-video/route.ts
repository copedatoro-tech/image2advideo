// app/api/render-video/route.ts

import { NextResponse } from "next/server";
import { generateVideo } from "../../../lib/video-engine/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // apelăm funcția de generare video
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
