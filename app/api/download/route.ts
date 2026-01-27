import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Definește calea fișierului video
export async function GET(req: Request) {
  const videoName = req.url.split("/").pop(); // Extrage numele fișierului din URL
  const videoPath = path.join(process.cwd(), "public", "videos", videoName || "");

  // Verifică dacă fișierul există
  if (!fs.existsSync(videoPath)) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  // Citește fișierul video
  const videoBuffer = fs.readFileSync(videoPath);

  return new NextResponse(videoBuffer, {
    headers: {
      "Content-Type": "video/mp4", // Tipul fișierului
      "Content-Disposition": `attachment; filename="${videoName}"`, // Forțează descărcarea
      "Content-Length": videoBuffer.length.toString(), // Dimensiunea fișierului
    },
  });
}
