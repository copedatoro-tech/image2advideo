import path from "path";

// Folosim referința către fișierul .ts sau pur și simplu numele fără extensie
export const videoRenderPath = path.join(process.cwd(), "video-engine", "render.ts");

export function logRenderPath() {
  console.log("Using render file:", videoRenderPath);
}