"use client"

import { useState, useMemo, useRef } from "react"

/* ================= TEXT ================= */
const t = {
  title: "Image2AdVideo",
  videoSettings: "Setări video",
  duration: "Lungime video",
  format: "Format video",
  style: "Stil video",
  ai: "Inteligență artificială (AI)",
  aiDesc: "Optimizare automată, efecte inteligente, montaj avansat",
  price: "Preț total",
  addImages: "Adaugă imagini",
  createVideo: "Creează video",
  images: "Imagini",
}

/* ================= COMPONENT ================= */
export default function Home() {
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const [duration, setDuration] = useState<15 | 30 | 60>(15)
  const [format, setFormat] = useState<"16:9" | "1:1" | "9:16">("16:9")
  const [style, setStyle] = useState<"Social" | "Cinematic" | "Premium">("Social")
  const [aiEnabled, setAiEnabled] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const maxImages = 10

  /* ================= PRICE ================= */
  const price = useMemo(() => {
    let total = 29
    if (duration === 30) total += 15
    if (duration === 60) total += 30
    if (style === "Cinematic") total += 15
    if (style === "Premium") total += 30
    if (aiEnabled) total += 20
    if (images.length > 1) total += (images.length - 1) * 3
    return total
  }, [duration, style, aiEnabled, images.length])

  /* ================= IMAGE UPLOAD (NO DUPLICATES) ================= */
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const newFiles: File[] = []
    let duplicateFound = false

    for (const file of files) {
      const exists = images.some(
        img => img.name === file.name && img.size === file.size
      )

      if (!exists) {
        newFiles.push(file)
      } else {
        duplicateFound = true
      }
    }

    if (duplicateFound) {
      alert("⚠️ Unele imagini erau deja adăugate și au fost ignorate.")
    }

    setImages(prev =>
      [...prev, ...newFiles].slice(0, maxImages)
    )

    e.target.value = ""
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  /* ================= STRIPE ================= */
  async function handleCreateVideo() {
    if (images.length === 0) {
      alert("Adaugă cel puțin o imagine.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagesCount: images.length,
          duration: duration,   // ✅ NUMĂR: 15 | 30 | 60
          style: style,         // ✅ TRIMIS EXPLICIT
          aiEnabled: aiEnabled, // ✅ CLAR
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Eroare Stripe")
      }
    } catch {
      alert("Eroare server")
    } finally {
      setLoading(false)
    }
  }

  function OptionButton({
    active,
    onClick,
    children,
  }: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
  }) {
    return (
      <button
        onClick={onClick}
        style={{
          padding: "9px 16px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: active ? "#4fd1c5" : "#fff",
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b1c2d,#10263f)",
        padding: "20px 32px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 52,
          fontWeight: 800,
          marginBottom: 12,
        }}
      >
        {t.title}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 32,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 26,
            borderRadius: 18,
            color: "#fff",
          }}
        >
          <h2>{t.videoSettings}</h2>

          <p>{t.duration}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <OptionButton active={duration === 15} onClick={() => setDuration(15)}>15s</OptionButton>
            <OptionButton active={duration === 30} onClick={() => setDuration(30)}>30s</OptionButton>
            <OptionButton active={duration === 60} onClick={() => setDuration(60)}>60s</OptionButton>
          </div>

          <p>{t.format}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <OptionButton active={format === "16:9"} onClick={() => setFormat("16:9")}>16:9</OptionButton>
            <OptionButton active={format === "1:1"} onClick={() => setFormat("1:1")}>1:1</OptionButton>
            <OptionButton active={format === "9:16"} onClick={() => setFormat("9:16")}>9:16</OptionButton>
          </div>

          <p>{t.style}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <OptionButton active={style === "Social"} onClick={() => setStyle("Social")}>Social</OptionButton>
            <OptionButton active={style === "Cinematic"} onClick={() => setStyle("Cinematic")}>Cinematic</OptionButton>
            <OptionButton active={style === "Premium"} onClick={() => setStyle("Premium")}>Premium</OptionButton>
          </div>

          {/* AI */}
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 12,
              background: "rgba(255,255,255,0.07)",
            }}
          >
            <label style={{ display: "flex", gap: 12, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={() => setAiEnabled(!aiEnabled)}
              />
              <div>
                <strong>{t.ai}</strong>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{t.aiDesc}</div>
                <div style={{ fontSize: 13, color: "#4fd1c5" }}>+20 RON</div>
              </div>
            </label>
          </div>

          <div
            style={{
              marginTop: 16,
              textAlign: "center",
              fontSize: 26,
              color: "#4fd1c5",
            }}
          >
            {t.price}: {price} RON
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleUpload}
          />

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                flex: 1,
                padding: "16px",
                background: "#4fd1c5",
                borderRadius: 12,
                fontWeight: "bold",
              }}
            >
              {t.addImages}
            </button>

            <button
              onClick={handleCreateVideo}
              disabled={loading}
              style={{
                flex: 1,
                padding: "16px",
                background: "#4fd1c5",
                borderRadius: 12,
                fontWeight: "bold",
              }}
            >
              {loading ? "..." : t.createVideo}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 26,
            borderRadius: 18,
            color: "#fff",
          }}
        >
          <h2>
            {t.images} ({images.length}/{maxImages})
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
            }}
          >
            {Array.from({ length: maxImages }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1/1",
                  background: "#0e2238",
                  borderRadius: 14,
                  position: "relative",
                }}
              >
                {images[i] && (
                  <>
                    <img
                      src={URL.createObjectURL(images[i])}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 14,
                      }}
                    />
                    <button
                      onClick={() => removeImage(i)}
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
