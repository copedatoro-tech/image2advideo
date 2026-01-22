"use client"

export default function GenerateButton({
  onVideo,
}: {
  onVideo: (url: string) => void
}) {
  const generate = async () => {
    const res = await fetch("/api/render", { method: "POST" })
    const data = await res.json()
    onVideo(data.video)
  }

  return (
    <button
      onClick={generate}
      className="px-6 py-3 bg-purple-600 text-white rounded"
    >
      Generate video
    </button>
  )
}
