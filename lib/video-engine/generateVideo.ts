import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateVideo(imageUrl: string) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN missing");
  }

  const output = await replicate.run(
    "stability-ai/stable-video-diffusion",
    {
      input: {
        image: imageUrl,
      },
    }
  );

  return output;
}
