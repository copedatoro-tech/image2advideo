import { NextResponse } from "next/server";
import { generateVideo } from "../../../video-engine/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await generateVideo(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Video generation failed" },
      { status: 500 }
    );
  }
}
