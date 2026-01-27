import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST() {
  return new Promise<Response>((resolve) => {
    try {
      const uploadsDir = path.join(process.cwd(), "uploads");
      const outputDir = path.join(process.cwd(), "public", "videos");

      // 🔒 Asigurăm directoarele
      if (!fs.existsSync(uploadsDir)) {
        resolve(
          NextResponse.json(
            { success: false, error: "Nu există imagini pentru render" },
            { status: 400 }
          )
        );
        return;
      }

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 🎬 Nume video unic
      const fileName = `video-${Date.now()}.mp4`;
      const outputFile = path.join(outputDir, fileName);

      /**
       * ffmpeg:
       * - ia toate imaginile din uploads (1.jpg, 2.jpg, ...)
       * - creează un video mp4 compatibil web
       */
      const cmd = `
        ffmpeg -y
        -framerate 1
        -i "${uploadsDir}/%d.jpg"
        -c:v libx264
        -r 30
        -pix_fmt yuv420p
        "${outputFile}"
      `;

      exec(cmd, (error) => {
        if (error) {
          console.error("FFMPEG ERROR:", error);
          resolve(
            NextResponse.json(
              { success: false, error: "Eroare la generarea video-ului" },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              videoUrl: `/videos/${fileName}`,
              expiresInHours: 72,
            })
          );
        }
      });
    } catch (err) {
      console.error("Render API error:", err);
      resolve(
        NextResponse.json(
          { success: false, error: "Eroare internă render" },
          { status: 500 }
        )
      );
    }
  });
}
