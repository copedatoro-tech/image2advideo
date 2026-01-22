"use client"

type Format = "9:16" | "1:1" | "16:9"

interface Props {
  videoUrl: string | null
  isGenerating: boolean
  format: Format
  images?: File[]
}

export default function PreviewPanel({
  videoUrl,
  isGenerating,
  format,
  images = [],
}: Props) {
  const aspect =
    format === "9:16"
      ? "aspect-[9/16]"
      : format === "1:1"
      ? "aspect-square"
      : "aspect-video"

  return (
    <div className="flex justify-center w-full">
      <div
        className={`relative w-full max-w-sm ${aspect}
        rounded-2xl overflow-hidden
        bg-black border border-white/15
        max-h-[70vh]`}
      >
        {/* LOADING */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 border border-white/30 border-t-white rounded-full animate-spin mb-6" />
            <p className="text-sm text-white/60">
              Se generează reclama video
            </p>
          </div>
        )}

        {/* VIDEO */}
        {!isGenerating && videoUrl && (
          <video
            src={videoUrl}
            autoPlay
            controls
            className="w-full h-full object-cover"
          />
        )}

        {/* IMAGES PREVIEW */}
        {!isGenerating && !videoUrl && images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-2 h-full overflow-hidden">
            {images.slice(0, 10).map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-full h-full object-contain rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
