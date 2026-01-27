/**
 * Generează un link de video placeholder
 * Această versiune este simplificată pentru a evita erorile de build pe Vercel
 */
export function generateVideo(sessionId) {
  console.log("🎬 Pregătire video pentru sesiunea:", sessionId);
  
  // Returnăm un link către un video de test
  return "/videos/placeholder.mp4";
}