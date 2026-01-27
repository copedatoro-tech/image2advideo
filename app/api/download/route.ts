import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const video = searchParams.get("video");

  if (!video) {
    return new NextResponse("Missing video parameter", { status: 400 });
  }

  // video trebuie să fie doar nume de fișier, ex: demo.mp4
  const safeVideoName = path.basename(video);

  const videoPath = path.join(
    process.cwd(),
    "public",
    "videos",
    safeVideoName
  );

  if (!fs.existsSync(videoPath)) {
    return new NextResponse("Video not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(videoPath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${safeVideoName}"`,
    },
  });
}
