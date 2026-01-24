import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const videosDir = path.join(process.cwd(), 'public', 'videos')
  const filePath = path.join(videosDir, 'test-video.mp4')

  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true })
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'TEST VIDEO FILE')
  }

  return NextResponse.json({
    ok: true,
    url: '/videos/test-video.mp4'
  })
}
