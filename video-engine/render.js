import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Simulează generarea unui video.
 * (mai târziu aici intră AI-ul real)
 */
export async function generateVideo({ images }) {
  if (!images || images.length === 0) {
    throw new Error("No images provided");
  }

  // folder unde salvăm video-ul
  const outputDir = path.join(process.cwd(), "public", "videos");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const videoName = `video-${uuidv4()}.mp4`;
  const videoPath = path.join(outputDir, videoName);

  // ⚠️ Fake video (placeholder)
  fs.writeFileSync(videoPath, "FAKE VIDEO CONTENT");

  return {
    videoUrl: `/videos/${videoName}`,
    videoName,
  };
}
