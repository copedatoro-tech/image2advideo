"use client"

import { useState } from "react"
import GenerateButton from "@/components/GenerateButton"
import VideoPreview from "@/components/VideoPreview"

export default function GeneratePage() {
  const [video, setVideo] = useState<string | null>(null)

  return (
    <div className="p-10 space-y-6">
      <GenerateButton onVideo={setVideo} />
      <VideoPreview src={video} />
    </div>
  )
}
