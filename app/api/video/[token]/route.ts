import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;

    if (!token || !token.includes("__")) {
      return new NextResponse("Invalid link", { status: 400 });
    }

    const [filename, expiresAtStr] = token.split("__");
    const expiresAt = Number(expiresAtStr);

    if (!filename || isNaN(expiresAt)) {
      return new NextResponse("Invalid link", { status: 400 });
    }

    if (Date.now() > expiresAt) {
      return new NextResponse("Link expired", { status: 410 });
    }

    const videoPath = path.join(
      process.cwd(),
      "public",
      "videos",
      filename
    );

    if (!fs.existsSync(videoPath)) {
      return new NextResponse("Video not found", { status: 404 });
    }

    const buffer = fs.readFileSync(videoPath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("VIDEO API ERROR:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
