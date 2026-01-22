export default function VideoPreview({ src }: { src: string | null }) {
  if (!src) return null

  return (
    <video
      src={src}
      controls
      autoPlay
      className="w-full rounded"
    />
  )
}
