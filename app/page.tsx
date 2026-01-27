"use client";

import { useState, useMemo, useRef } from "react";

const translations = {
  ro: {
    title: "Image2AdVideo",
    videoSettings: "Setări video",
    duration: "Lungime video",
    format: "Format video",
    style: "Stil video",
    aiOption: "Activare Inteligență Artificială (+20 RON)",
    price: "Preț total",
    addImages: "Adaugă imagini",
    createVideo: "Creează video",
    images: "Imagini",
    addAtLeastOne: "Adaugă cel puțin o imagine.",
    alreadyExists: "Această imagine este deja adăugată!",
  },
};

export default function Home() {
  const t = translations.ro;
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<15 | 30 | 60>(15);
  const [format, setFormat] = useState<"16:9" | "1:1" | "9:16">("16:9");
  const [style, setStyle] = useState<"Social" | "Cinematic" | "Premium">("Social");
  const [aiEnabled, setAiEnabled] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxImages = 10;

  // CALCUL PREȚ FINAL - LOGICA STABILITĂ
  const totalPrice = useMemo(() => {
    let total = 29; // Baza: 15s + Social
    if (duration === 30) total += 20; 
    if (duration === 60) total += 50; 
    if (style === "Cinematic") total += 20;
    if (style === "Premium") total += 50;
    if (aiEnabled) total += 20;
    return total;
  }, [duration, style, aiEnabled]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setImages(prev => {
      let updatedList = [...prev];
      newFiles.forEach(file => {
        const isDuplicate = prev.some(img => img.name === file.name && img.size === file.size);
        if (isDuplicate) alert(`${file.name}: ${t.alreadyExists}`);
        else if (updatedList.length < maxImages) updatedList.push(file);
      });
      return updatedList;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  async function handleCreateVideo() {
    if (images.length === 0) return alert(t.addAtLeastOne);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // TRIMITEM PREȚUL CALCULAT CĂTRE SERVER
        body: JSON.stringify({ 
          price: totalPrice, 
          duration, 
          style, 
          aiEnabled 
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100vh", background: "linear-gradient(135deg,#0b1c2d,#10263f)", padding: "20px 40px", display: "flex", flexDirection: "column", color: "#fff", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4fd1c5", fontSize: 45, fontWeight: 900, margin: "0 0 20px 0" }}>{t.title}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 30, maxWidth: 1400, margin: "0 auto", flex: 1, alignItems: "stretch" }}>
        
        {/* PANEL SETĂRI */}
        <div style={{ background: "rgba(255,255,255,0.07)", padding: 25, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <h2 style={{ fontSize: 22 }}>{t.videoSettings}</h2>
            <div>
              <p style={{ fontSize: 13, color: "#aaa" }}>{t.duration}</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[15, 30, 60].map(v => (
                  <button key={v} onClick={() => setDuration(v as any)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", cursor: "pointer", background: duration === v ? "#4fd1c5" : "#fff", fontWeight: "bold" }}>{v}s</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#aaa" }}>{t.style}</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["Social", "Cinematic", "Premium"].map(s => (
                  <button key={s} onClick={() => setStyle(s as any)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", cursor: "pointer", background: style === s ? "#4fd1c5" : "#fff", fontWeight: "bold" }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: 12, cursor: "pointer", border: aiEnabled ? "1px solid #4fd1c5" : "none" }}>
              <input type="checkbox" checked={aiEnabled} onChange={e => setAiEnabled(e.target.checked)} style={{ width: 20, height: 20, accentColor: "#4fd1c5" }} />
              <span style={{ fontWeight: "bold", color: aiEnabled ? "#4fd1c5" : "#fff" }}>{t.aiOption}</span>
            </label>
            <div style={{ textAlign: "center", fontSize: 32, color: "#4fd1c5", fontWeight: 900 }}>{totalPrice} RON</div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleUpload} />
            <button onClick={() => fileInputRef.current?.click()} style={{ padding: 15, background: "none", color: "#4fd1c5", border: "2px solid #4fd1c5", borderRadius: 12, cursor: "pointer", fontWeight: "bold" }}>{t.addImages}</button>
            <button onClick={handleCreateVideo} disabled={loading} style={{ padding: 18, background: "#4fd1c5", color: "#0b1c2d", border: "none", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 18 }}>{loading ? "PROCESARE..." : t.createVideo}</button>
          </div>
        </div>

        {/* PANEL IMAGINI */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: 25, borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>{t.images} ({images.length}/{maxImages})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {Array.from({ length: maxImages }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "1/1", background: "#0e2238", borderRadius: 15, position: "relative", border: images[i] ? "2px solid #4fd1c5" : "1px dashed rgba(255,255,255,0.1)", overflow: "hidden" }}>
                {images[i] && (
                  <>
                    <img src={URL.createObjectURL(images[i])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div onClick={() => removeImage(i)} style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.7)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold" }}>×</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}