import { NextResponse } from "next/server"
import { exec } from "child_process"
import path from "path"
import fs from "fs"

export async function POST() {
  return new Promise<Response>((resolve) => {
    const uploadsDir = path.join(process.cwd(), "uploads")
    const outputDir = path.join(process.cwd(), "public", "videos")

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputFile = path.join(
      outputDir,
      `video-${Date.now()}.mp4`
    )

    const cmd = `ffmpeg -y -framerate 1 -i "${uploadsDir}/%d.jpg" -c:v libx264 -r 30 -pix_fmt yuv420p "${outputFile}"`

    exec(cmd, (error) => {
      if (error) {
        resolve(
          NextResponse.json(
            { success: false, error: "Video render failed" },
            { status: 500 }
          )
        )
      } else {
        resolve(
          NextResponse.json({
            success: true,
            videoUrl: `/videos/${path.basename(outputFile)}`,
          })
        )
      }
    })
  })
}
