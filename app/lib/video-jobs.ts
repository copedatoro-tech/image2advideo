import { spawn } from "child_process";
import path from "path";

export function startJob(sessionId: string) {
  const videoRenderPath = path.join(process.cwd(), "video-engine", "render.js");

  console.log("🚀 Starting video render...");

  const process = spawn("node", [videoRenderPath, sessionId], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  process.on("close", (code) => {
    console.log(`🎬 Video render finished with code ${code}`);
  });
}
