"use client"

import { useState, useMemo } from "react"
import ImageUploader from "@/components/ImageUploader"
import VideoOptions from "@/components/VideoOptions"
import GenerateButton from "@/components/GenerateButton"
import PreviewPanel from "@/components/PreviewPanel"

type Format = "9:16" | "1:1" | "16:9"
type Duration = "15" | "30" | "60"
type Style = "Luxury" | "Cinematic" | "Social"

export default function HomePage() {
  const [images, setImages] = useState<File[]>([])
  const [format, setFormat] = useState<Format>("9:16")
  const [duration, setDuration] = useState<Duration>("15")
  const [style, setStyle] = useState<Style>("Luxury")

  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const price = useMemo(() => {
    let base = 5
    if (duration === "30") base += 3
    if (duration === "60") base += 6
    if (style === "Luxury") base += 4
    if (style === "Cinematic") base += 2
    base += images.length
    return base
  }, [duration, style, images.length])

  const handleGenerate = async () => {
    if (images.length === 0) return

    setIsGenerating(true)
    setVideoUrl(null)

    const formData = new FormData()
    images.forEach((img) => formData.append("images", img))
    formData.append("format", format)
    formData.append("duration", duration)
    formData.append("style", style)

    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setVideoUrl(data.videoUrl)
    setIsGenerating(false)
  }

  return (
    <main className="min-h-screen px-8 py-16 text-white bg-gradient-to-br from-black via-[#050b18] to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light">Image2AdVideo AI</h1>
          <p className="text-white/60 mt-4">
            Creează reclame video premium din imagini
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <ImageUploader images={images} setImages={setImages} />
            <VideoOptions
              format={format}
              setFormat={setFormat}
              duration={duration}
              setDuration={setDuration}
              style={style}
              setStyle={setStyle}
            />
            <GenerateButton onClick={handleGenerate} price={price} />
          </div>

          <PreviewPanel
            videoUrl={videoUrl}
            isGenerating={isGenerating}
            format={format}
            images={images}
          />
        </div>
      </div>
    </main>
  )
}
