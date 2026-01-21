"use client";

import { useRef, useState } from "react";

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onImagesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const generateVideo = async () => {
    if (images.length === 0) return;
    setLoading(true);

    // mock – simulare generare video
    await new Promise((r) => setTimeout(r, 2000));

    alert("Video generat cu succes (mock)");
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 10 }}>
        Image2AdVideo AI
      </h1>

      <p style={{ opacity: 0.8, marginBottom: 30 }}>
        Transformă imaginile tale într-un video publicitar cinematic.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
        <button
          onClick={openFilePicker}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          Alege imagini
        </button>

        <button
          onClick={generateVideo}
          disabled={images.length === 0 || loading}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            borderRadius: 10,
            border: "none",
            cursor: images.length === 0 ? "not-allowed" : "pointer",
            opacity: images.length === 0 ? 0.4 : 1,
          }}
        >
          {loading ? "Se generează..." : "Generează video"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={onImagesSelected}
      />

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}
