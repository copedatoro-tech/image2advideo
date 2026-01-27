import path from "path";

export function startJob(sessionId: string) {
  const cwd = process.cwd();

  const videoRenderPath = path.join(
    cwd,
    "video-engine",
    "render.js"
  );

  console.log("🎬 Starting video job for:", sessionId);
  console.log("Using render file:", videoRenderPath);
}
