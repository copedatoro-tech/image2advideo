"use client";

import { useState, useMemo, useRef } from "react";

const translations = {
  ro: {
    title: "Image2AdVideo",
    videoSettings: "SETĂRI VIDEO",
    duration: "Lungime video",
    format: "Format video",
    style: "Stil video",
    aiOption: "Activare AI",
    aiPrice: "+20 RON",
    addImages: "Adaugă imagini",
    createVideo: "Creează video",
    processing: "Se procesează...",
    images: "Imagini",
  },
};

export default function Home() {
  const t = translations.ro;
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<15 | 30 | 60>(15);
  const [format, setFormat] = useState<"16:9" | "9:16" | "1:1">("9:16");
  const [style, setStyle] = useState<"Social" | "Cinematic" | "Premium">("Social");
  const [aiEnabled, setAiEnabled] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxImages = 12;

  // RECALCULARE PREȚ CONFORM INSTRUCȚIUNILOR TALE
  const totalPrice = useMemo(() => {
    let total = 29; // Prețul de bază inițial
    if (duration === 30) total += 20;
    if (duration === 60) total += 50;
    if (style === "Cinematic") total += 20;
    if (style === "Premium") total += 50;
    if (aiEnabled) total += 20;
    return total;
  }, [duration, style, aiEnabled]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    newFiles.forEach(file => {
      const isDuplicate = images.some(img => img.name === file.name && img.size === file.size);
      if (isDuplicate) alert(`Imaginea "${file.name}" este deja adăugată.`);
      else validFiles.push(file);
    });

    setImages(prev => [...prev, ...validFiles].slice(0, maxImages));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateVideo = async () => {
    if (!images.length) return alert("Adaugă cel puțin o imagine");
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: totalPrice }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else { setLoading(false); alert("Eroare la plată."); }
    } catch (error) { setLoading(false); }
  };

  const getButtonStyle = (active: boolean) => ({
    padding: "10px",
    borderRadius: "10px",
    border: active ? "2px solid #4fd1c5" : "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    background: active ? "rgba(79,209,197,0.2)" : "#1e293b",
    color: active ? "#4fd1c5" : "#cbd5e1",
    fontWeight: "700",
    transition: "all 0.2s ease",
    flex: 1,
    fontSize: "13px",
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#020617",
      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(79,209,197,0.1), transparent 80%)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "950px",
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(30px)",
        borderRadius: "30px",
        padding: "35px",
        border: "1px solid rgba(79,209,197,0.2)",
      }}>
        
        {/* TITLU MAI MARE ȘI PE MIJLOC */}
        <h1 style={{
          fontSize: "56px",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "35px",
          color: "#4fd1c5",
          textShadow: "0 0 25px rgba(79,209,197,0.4)"
        }}>
          {t.title}
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "40px", alignItems: "start" }}>
          
          {/* COLOANA STÂNGA: SETĂRI */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "12px", color: "#4fd1c5", letterSpacing: "2px", fontWeight: "bold" }}>{t.videoSettings}</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>{t.duration}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {[15, 30, 60].map(v => (
                  <button key={v} onClick={() => setDuration(v as any)} style={getButtonStyle(duration === v)}>{v}s</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>{t.format}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {["16:9", "9:16", "1:1"].map(f => (
                  <button key={f} onClick={() => setFormat(f as any)} style={getButtonStyle(format === f)}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>{t.style}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Social", "Cinematic", "Premium"].map(s => (
                  <button key={s} onClick={() => setStyle(s as any)} style={getButtonStyle(style === s)}>{s}</button>
                ))}
              </div>
            </div>

            <div 
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "15px", borderRadius: "14px", background: "rgba(79,209,197,0.08)",
                border: "1px solid rgba(79,209,197,0.3)", cursor: "pointer"
              }} 
              onClick={() => setAiEnabled(!aiEnabled)}
            >
              <span style={{ fontSize: "14px", fontWeight: "600" }}>{t.aiOption} <span style={{ color: "#4fd1c5", marginLeft: "5px" }}>{t.aiPrice}</span></span>
              <div style={{
                width: "40px", height: "20px", background: aiEnabled ? "#4fd1c5" : "#334155",
                borderRadius: "20px", position: "relative", transition: "0.3s"
              }}>
                <div style={{
                  width: "14px", height: "14px", background: "#fff", borderRadius: "50%",
                  position: "absolute", top: "3px", left: aiEnabled ? "23px" : "3px", transition: "0.3s"
                }} />
              </div>
            </div>

            <div style={{ fontSize: "42px", fontWeight: "900", color: "#fff", marginTop: "10px" }}>
              {totalPrice} <span style={{ fontSize: "20px", color: "#4fd1c5" }}>RON</span>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => fileInputRef.current?.click()} style={{
                flex: 1, padding: "14px", borderRadius: "12px", border: "2px solid #4fd1c5",
                background: "transparent", color: "#4fd1c5", fontWeight: "800", cursor: "pointer"
              }}>{t.addImages}</button>
              
              <button onClick={handleCreateVideo} disabled={loading} style={{
                flex: 1.5, padding: "14px", borderRadius: "12px", border: "none",
                background: "#4fd1c5", color: "#000", fontWeight: "900", cursor: "pointer"
              }}>{loading ? t.processing : t.createVideo}</button>
            </div>
          </div>

          {/* COLOANA DREAPTĂ: PREVIEW IMAGINI (CÂTE 4 PE RÂND) */}
          <div style={{ 
            background: "rgba(255,255,255,0.02)", 
            padding: "20px", 
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <h3 style={{ marginBottom: "15px", color: "#94a3b8", fontSize: "14px" }}>
              {t.images} ({images.length}/{maxImages})
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {Array.from({ length: maxImages }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio: "1/1", borderRadius: "10px", position: "relative",
                  background: "rgba(255,255,255,0.03)", border: images[i] ? "2px solid #4fd1c5" : "1px dashed rgba(255,255,255,0.1)",
                  overflow: "hidden"
                }}>
                  {images[i] ? (
                    <>
                      <img src={URL.createObjectURL(images[i])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeImage(i); }} 
                        style={{
                          position: "absolute", top: "5px", right: "5px", width: "20px", height: "20px",
                          borderRadius: "50%", background: "#ef4444", color: "#fff", border: "none",
                          cursor: "pointer", fontSize: "10px", fontWeight: "bold", display: "flex",
                          justifyContent: "center", alignItems: "center", zIndex: 10
                        }}
                      >✕</button>
                    </>
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.05)", fontSize: "20px" }}>+</div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <input ref={fileInputRef} type="file" multiple hidden onChange={handleUpload} />
    </div>
  );
}