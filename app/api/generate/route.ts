import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { exec } from "child_process"

export async function POST() {
  try {
    const projectRoot = process.cwd()

    const renderScript = path.join(projectRoot, "video-engine", "render.js")
    const tempVideo = path.join(projectRoot, "video-engine", "output", "result.mp4")
    const publicDir = path.join(projectRoot, "public", "videos")
    const publicVideo = path.join(publicDir, "result.mp4")

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Rulează render.js
    await new Promise<void>((resolve, reject) => {
      exec(`node "${renderScript}"`, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })

    // Copiază video-ul în public
    fs.copyFileSync(tempVideo, publicVideo)

    return NextResponse.json({
      success: true,
      url: "/videos/result.mp4"
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
