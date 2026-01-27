import path from "path";

/**
 * Generează un link de video placeholder (Vercel friendly)
 */
export function generateVideo(sessionId) {
  console.log("🎬 Pregătire link video pentru sesiunea:", sessionId);

  // Pe Vercel nu putem scrie fișiere fizice cu fs.writeFileSync în folderul public.
  // Pentru moment, returnăm un link către un video demonstrativ sau un placeholder.
  
  const fileName = `video_${Date.now()}.mp4`;
  
  // Returnăm doar calea simbolică. 
  // Într-o aplicație reală, aici vei apela Replicate sau Cloudinary.
  return `/videos/placeholder.mp4`; 
}