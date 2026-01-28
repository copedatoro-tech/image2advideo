export async function generateVideo(body) {
  // body vine din API (setări video, imagini etc)
  // momentan returnăm un rezultat fake ca să treacă build-ul

  return {
    success: true,
    videoName: "test.mp4",
    url: "/test.mp4",
    input: body,
  };
}
