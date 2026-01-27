// video-engine/render.ts

/**
 * Functia trebuie sa fie exportata clar cu "export" in fata
 */
export function generateVideo(sessionId: string): string {
  console.log("🎬 Generare video pentru sesiunea:", sessionId);
  // Returnam un link simplu pentru a nu bloca build-ul pe Vercel
  return "/videos/placeholder.mp4";
}