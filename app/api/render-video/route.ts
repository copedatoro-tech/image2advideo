import { NextResponse } from "next/server";
// Folosim calea relativa directa pentru a fi siguri ca gaseste fisierul .ts
import { generateVideo } from "../../../video-engine/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = body.sessionId || "test-session";
    
    const videoUrl = generateVideo(sessionId);
    
    return NextResponse.json({ success: true, url: videoUrl });
  } catch (err: any) {
    console.error("Render API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}