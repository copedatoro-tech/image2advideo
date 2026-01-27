import path from "path";
import fs from "fs";

/**
 * Generează un video placeholder (temporar)
 */
export function generateVideo(sessionId: string): string {
  console.log("🎬 Generating video for session:", sessionId);

  // nume unic simplu (fără uuid)
  const fileName = `video_${Date.now()}.mp4`;

  const videosDir = path.join(
    process.cwd(),
    "public",
    "videos"
  );

  // asigură folderul
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  const videoPath = path.join(videosDir, fileName);

  // fișier placeholder (gol)
  fs.writeFileSync(videoPath, "");

  console.log("✅ Video created:", videoPath);

  return `/videos/${fileName}`;
}
