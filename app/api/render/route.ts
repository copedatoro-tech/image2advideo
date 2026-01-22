import { NextResponse } from "next/server"
import { exec } from "child_process"
import path from "path"

export async function POST() {
  return new Promise((resolve) => {
    const script = path.join(process.cwd(), "video-engine", "render.js")

    exec(`node "${script}"`, (err) => {
      if (err) {
        resolve(
          NextResponse.json({ error: "Video failed" }, { status: 500 })
        )
      } else {
        resolve(
          NextResponse.json({
            success: true,
            video: "/videos/result.mp4",
          })
        )
      }
    })
  })
}
