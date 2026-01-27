// video-engine/render.ts

export const generateVideo = (sessionId: string): string => {
  console.log("🎬 Generare video pentru sesiunea:", sessionId);
  // Pe Vercel doar returnăm link-ul, nu scriem fișiere pe disc (fs)
  return "/videos/placeholder.mp4";
};