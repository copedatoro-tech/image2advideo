import { NextResponse } from "next/server";
import { generateVideo } from "@/video-engine/render";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const videoUrl = generateVideo(sessionId || "default");
    
    return NextResponse.json({ success: true, videoUrl });
  } catch (err: any) {
    console.error("Render API Error:", err);
    return NextResponse.json({ success: false, error: "Eroare interna render" }, { status: 500 });
  }
}