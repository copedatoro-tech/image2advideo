import { NextResponse } from "next/server";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

ffmpeg.setFfmpegPath(ffmpegPath as string);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const images = formData.getAll("images") as File[];
    const format = formData.get("format") as string;
    const style = formData.get("style") as string;
    const duration = Number(formData.get("duration") || 15);

    if (!images.length) {
      return NextResponse.json({ error: "No images" }, { status: 400 });
    }

    const id = randomUUID();
    const tempDir = path.join(process.cwd(), "public/temp", id);
    const outputDir = path.join(process.cwd(), "public/videos");

    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    // salvăm imaginile
    for (let i = 0; i < images.length; i++) {
      const buffer = Buffer.from(await images[i].arrayBuffer());
      await fs.writeFile(path.join(tempDir, `img${i}.jpg`), buffer);
    }

    const outputPath = path.join(outputDir, `${id}.mp4`);

    const size =
      format === "9:16"
        ? "1080x1920"
        : format === "1:1"
        ? "1080x1080"
        : "1920x1080";

    const zoom =
      style === "cinematic"
        ? "zoompan=z='min(zoom+0.0015,1.08)':d=125"
        : style === "luxury"
        ? "zoompan=z='min(zoom+0.001,1.04)':d=125"
        : "zoompan=z='1.0':d=125";

    await new Promise<void>((resolve, reject) => {
      ffmpeg()
        .input(path.join(tempDir, "img%d.jpg"))
        .inputOptions(["-framerate 1"])
        .videoFilters([
          `scale=${size}`,
          zoom,
          "fade=t=in:st=0:d=0.5",
          "fade=t=out:st=2.5:d=0.5",
        ])
        .outputOptions([
          "-c:v libx264",
          "-pix_fmt yuv420p",
          "-r 30",
          `-t ${duration}`,
        ])
        .on("end", resolve)
        .on("error", reject)
        .save(outputPath);
    });

    return NextResponse.json({
      success: true,
      videoUrl: `/videos/${id}.mp4`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Video generation failed" },
      { status: 500 }
    );
  }
}
