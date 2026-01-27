import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateVideoFromImage(imageUrl: string) {
  const prediction = await replicate.predictions.create({
    version: "9d51b43c6f8f4b6b5d2b5f2a2f03a5e9f0c0e9c7c8a9b7e6d5c4b3a2f1e0d",
    input: {
      image: imageUrl,
      prompt: "A cinematic promotional video, smooth camera movement, professional lighting",
      fps: 24,
      duration: 5
    }
  });

  return prediction;
}
