import { NextResponse } from "next/server";
import { generateVideo } from "@/video-engine/render";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const videoUrl = generateVideo(sessionId || "test");
    
    return NextResponse.json({ success: true, url: videoUrl });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}