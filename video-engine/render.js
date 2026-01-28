const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

async function main() {
  const jobDir = process.argv[2];

  if (!jobDir) {
    console.error("❌ Missing jobDir argument");
    process.exit(1);
  }

  console.log("🎬 Pornim generarea video-ului pentru:", jobDir);

  const configPath = path.join(jobDir, "config.json");

  if (!fs.existsSync(configPath)) {
    console.error("❌ config.json nu există");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  const images = fs
    .readdirSync(jobDir)
    .filter((f) => f.startsWith("image_"))
    .map((f) => path.join(jobDir, f));

  if (!images.length) {
    console.error("❌ Nu există imagini în jobDir");
    process.exit(1);
  }

  console.log("📸 Imagini găsite:", images.length);
  console.log("⚙️ Setări:", config);

  // 🔥 Creăm un fișier temporar cu lista imaginilor pentru ffmpeg
  const listFile = path.join(jobDir, "images.txt");
  const listContent = images.map((img) => `file '${img}'\nduration 1`).join("\n");
  fs.writeFileSync(listFile, listContent);

  const outputPath = path.join(jobDir, "output.mp4");

  console.log("🎥 Generăm video-ul...");

  // 🔥 Comandă ffmpeg simplă (slideshow)
  const ffmpeg = spawn("ffmpeg", [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listFile,
    "-vf",
    "scale=1080:-1",
    "-pix_fmt",
    "yuv420p",
    outputPath,
  ]);

  ffmpeg.stdout.on("data", (data) => {
    console.log("FFmpeg:", data.toString());
  });

  ffmpeg.stderr.on("data", (data) => {
    console.log("FFmpeg:", data.toString());
  });

  ffmpeg.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Video generat cu succes:", outputPath);
      process.exit(0);
    } else {
      console.error("❌ FFmpeg a eșuat cu codul:", code);
      process.exit(1);
    }
  });
}

main();
