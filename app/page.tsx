"use client";

import { useState, useMemo, useRef } from "react";

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [duration, setDuration] = useState<15 | 30 | 60>(15);
  const [format, setFormat] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [style, setStyle] = useState<"Social" | "Cinematic" | "Premium">("Social");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxImages = 10;
  const basePrice = 10;

  const price = useMemo(() => {
    let total = basePrice;
    if (duration === 30) total += 3;
    if (duration === 60) total += 6;
    if (style === "Cinematic") total += 3;
    if (style === "Premium") total += 6;
    return total;
  }, [duration, style]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages([...images, ...Array.from(e.target.files)].slice(0, maxImages));
  }

  async function handleCreateVideo() {
    if (images.length === 0) {
      alert("Adaugă cel puțin o imagine.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration, format, style, price }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Eroare la plată.");
    } catch {
      alert("Eroare de conectare.");
    } finally {
      setLoading(false);
    }
  }

  function OptionButton({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
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
          color: "#000",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1c2d, #10263f)",
        color: "#fff",
        padding: 32,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 36,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* STÂNGA */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 28,
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h2 style={{ fontSize: 26 }}>Setări video</h2>

          <div>
            <p>Lungime video</p>
            <div style={{ display: "flex", gap: 8 }}>
              <OptionButton active={duration === 15} onClick={() => setDuration(15)}>15s</OptionButton>
              <OptionButton active={duration === 30} onClick={() => setDuration(30)}>30s</OptionButton>
              <OptionButton active={duration === 60} onClick={() => setDuration(60)}>60s</OptionButton>
            </div>
          </div>

          <div>
            <p>Format video</p>
            <div style={{ display: "flex", gap: 8 }}>
              <OptionButton active={format === "16:9"} onClick={() => setFormat("16:9")}>16:9</OptionButton>
              <OptionButton active={format === "1:1"} onClick={() => setFormat("1:1")}>1:1</OptionButton>
              <OptionButton active={format === "9:16"} onClick={() => setFormat("9:16")}>9:16</OptionButton>
            </div>
          </div>

          <div>
            <p>Stil video</p>
            <div style={{ display: "flex", gap: 8 }}>
              <OptionButton active={style === "Social"} onClick={() => setStyle("Social")}>Social</OptionButton>
              <OptionButton active={style === "Cinematic"} onClick={() => setStyle("Cinematic")}>Cinematic</OptionButton>
              <OptionButton active={style === "Premium"} onClick={() => setStyle("Premium")}>Premium</OptionButton>
            </div>
          </div>

          {/* PREȚ */}
          <div
            style={{
              padding: 14,
              background: "#0e2238",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13 }}>Preț total</div>
            <div style={{ fontSize: 30, fontWeight: "bold", color: "#4fd1c5" }}>
              {price} €
            </div>
          </div>

          {/* UPLOAD */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: "14px",
              background: "#4fd1c5",
              color: "#000",
              borderRadius: 10,
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
            }}
          >
            Adaugă imagini
          </button>

          <button
            onClick={handleCreateVideo}
            disabled={loading}
            style={{
              padding: "16px",
              fontSize: 18,
              borderRadius: 12,
              border: "none",
              background: "#4fd1c5",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Creează video
          </button>
        </div>

        {/* DREAPTA */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 28,
            borderRadius: 18,
          }}
        >
          <h2 style={{ fontSize: 26 }}>
            Imagini ({images.length}/{maxImages})
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {Array.from({ length: maxImages }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1 / 1",
                  background: "#0e2238",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {images[i] ? (
                  <img
                    src={URL.createObjectURL(images[i])}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ color: "#6b8bb3", fontSize: 12 }}>Slot gol</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
