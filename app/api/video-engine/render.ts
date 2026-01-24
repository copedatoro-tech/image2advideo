import { exec } from "child_process"
import path from "path"
import fs from "fs"

export async function generateVideo(): Promise<string> {
  return new Promise((resolve, reject) => {
    const inputDir = path.join(process.cwd(), "video-engine", "input")
    const outputDir = path.join(process.cwd(), "public", "videos")

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputFile = path.join(outputDir, `video-${Date.now()}.mp4`)

    const cmd = `ffmpeg -y -framerate 1 -i "${inputDir}/%d.jpg" -c:v libx264 -r 30 -pix_fmt yuv420p "${outputFile}"`

    exec(cmd, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(`/videos/${path.basename(outputFile)}`)
      }
    })
  })
}
