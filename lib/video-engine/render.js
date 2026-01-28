export async function generateVideo({
  images,
  duration,
  format,
  style,
  aiEnabled,
}) {
  console.log("Generating video with settings:", {
    images,
    duration,
    format,
    style,
    aiEnabled,
  });

  // MOCK – aici va veni logica reală de AI/video
  // Deocamdată simulăm un video generat
  return {
    videoUrl: "/sample-video.mp4",
    status: "success",
  };
}
