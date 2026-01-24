import { NextResponse } from 'next/server'

let JOBS: Record<string, any> = {}

export async function POST() {
  const jobId = crypto.randomUUID()

  JOBS[jobId] = { status: 'processing' }

  setTimeout(() => {
    JOBS[jobId] = {
      status: 'done',
      videoUrl: '/videos/demo.mp4'
    }
  }, 3000)

  return NextResponse.json({ jobId })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  return NextResponse.json(JOBS[id] || { status: 'processing' })
}
