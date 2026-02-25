import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface VideoOptions {
  imageUrl?: string;
  videoDuration?: number;
  videoStyle?: string;
  aiEnabled?: boolean;
  images?: string[];
}

export async function generateVideo(options: VideoOptions): Promise<string> {
  const { videoDuration = 15, videoStyle = "Social" } = options;
  
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const videoFileName = `video_${timestamp}_${randomId}.mp4`;
  
  const outputDir = path.join(process.cwd(), "public", "videos");
  const uploadsDir = path.join(process.cwd(), "uploads");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, videoFileName);
  
  if (!fs.existsSync(uploadsDir)) {
    throw new Error("Nu există imagini pentru generare video");
  }
  
  const imageFiles = fs.readdirSync(uploadsDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();
  
  if (imageFiles.length === 0) {
    throw new Error("Nu s-au găsit imagini în folder");
  }
  
  const durationPerImage = Math.max(1, Math.floor(videoDuration / imageFiles.length));
  
  const listFilePath = path.join(uploadsDir, "list.txt");
  let listContent = "";
  
  for (const imageFile of imageFiles) {
    const imagePath = path.join(uploadsDir, imageFile);
    listContent += `file '${imagePath}'\n`;
    listContent += `duration ${durationPerImage}\n`;
  }
  const lastImage = path.join(uploadsDir, imageFiles[imageFiles.length - 1]);
  listContent += `file '${lastImage}'\n`;
  
  fs.writeFileSync(listFilePath, listContent);
  
  let filterComplex = "";
  switch (videoStyle) {
    case "Cinematic":
      filterComplex = "-vf 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=0.5'";
      break;
    case "Premium":
      filterComplex = "-vf 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,eq=brightness=0.05:contrast=1.1'";
      break;
    default:
      filterComplex = "-vf 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1'";
  }
  
  const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${listFilePath}" ${filterComplex} -c:v libx264 -pix_fmt yuv420p -r 30 "${outputPath}"`;
  
  try {
    await execAsync(ffmpegCmd);
    
    if (fs.existsSync(listFilePath)) {
      fs.unlinkSync(listFilePath);
    }
    
    return videoFileName;
  } catch (error) {
    console.error("FFmpeg error:", error);
    throw new Error("Eroare la generarea video-ului");
  }
}
