"use client"

type Format = "9:16" | "1:1" | "16:9"
type Duration = "15" | "30" | "60"
type Style = "Luxury" | "Cinematic" | "Social"

interface Props {
  format: Format
  setFormat: (v: Format) => void
  duration: Duration
  setDuration: (v: Duration) => void
  style: Style
  setStyle: (v: Style) => void
}

export default function VideoOptions({
  format,
  setFormat,
  duration,
  setDuration,
  style,
  setStyle,
}: Props) {
  const button = (active: boolean) =>
    `px-4 py-2 rounded-lg border ${
      active
        ? "border-white text-white"
        : "border-white/20 text-white/50 hover:border-white/40"
    } transition`

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-8">
      <div>
        <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">
          Format video
        </h4>
        <div className="flex gap-3">
          {(["9:16", "1:1", "16:9"] as Format[]).map((f) => (
            <button
              key={f}
              className={button(format === f)}
              onClick={() => setFormat(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">
          Durată
        </h4>
        <div className="flex gap-3">
          {(["15", "30", "60"] as Duration[]).map((d) => (
            <button
              key={d}
              className={button(duration === d)}
              onClick={() => setDuration(d)}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">
          Stil reclamă
        </h4>
        <div className="flex gap-3">
          {(["Luxury", "Cinematic", "Social"] as Style[]).map((s) => (
            <button
              key={s}
              className={button(style === s)}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
