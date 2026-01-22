import fs from "fs";
import path from "path";

export async function GET() {
  const videoPath = path.join(
    process.cwd(),
    "video-engine",
    "output",
    "result.mp4"
  );

  const video = fs.readFileSync(videoPath);

  return new Response(video, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}
