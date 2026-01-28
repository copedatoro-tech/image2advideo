import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // DEBUG: vezi că endpointul e apelat
    console.log("Generate video request:", body);

    // TEMPORAR: simulăm generarea video
    // (până legăm motorul real)
    return NextResponse.json({
      videoUrl: "/demo-video.mp4",
    });
  } catch (error) {
    console.error("Generate video error:", error);
    return NextResponse.json(
      { error: "A apărut o problemă la generare" },
      { status: 500 }
    );
  }
}
