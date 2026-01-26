import fs from "fs";
import path from "path";

type GenerateVideoParams = {
  imagePath: string;
  outputName: string;
};

export async function generateVideo({
  imagePath,
  outputName,
}: GenerateVideoParams): Promise<string> {
  console.log("🎬 Video generation started...");
  console.log("🖼 Image path:", imagePath);

  const outputDir = path.join(process.cwd(), "video-engine/output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const mockVideoPath = path.join(outputDir, "mock.mp4");
  const finalVideoPath = path.join(outputDir, `${outputName}.mp4`);

  if (!fs.existsSync(mockVideoPath)) {
    throw new Error("❌ mock.mp4 not found in video-engine/output/");
  }

  fs.copyFileSync(mockVideoPath, finalVideoPath);

  console.log("✅ Video generated successfully:", finalVideoPath);

  return finalVideoPath;
}
