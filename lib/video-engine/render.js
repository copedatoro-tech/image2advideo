import { replicateGenerateVideo } from "./replicate";

export async function generateVideo(data) {
  try {
    const { imageUrl, useAI } = data;

    if (!imageUrl) {
      throw new Error("imageUrl lipsă");
    }

    const videoUrl = await replicateGenerateVideo({
      imageUrl,
      useAI,
    });

    return {
      success: true,
      videoUrl,
    };
  } catch (error) {
    console.error("❌ generateVideo error:", error);
    throw error;
  }
}
