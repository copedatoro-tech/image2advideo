export async function generateVideo(data) {
  console.log("generateVideo called", data);

  return {
    success: true,
    videoUrl: "/demo-video.mp4",
  };
}
