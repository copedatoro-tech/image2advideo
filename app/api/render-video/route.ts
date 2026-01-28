import { NextResponse } from "next/server";
import { generateVideo } from "@/app/lib/video-engine/generateVideo";

export async function POST() {
  try {
    const result = await generateVideo();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Render video error:", error);
    return new NextResponse("Render error", { status: 500 });
  }
}
