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

  /* ================= CALCUL PREȚ FINAL (LOGICA DAN) ================= */
  const price = useMemo(() => {
    let total = 29; // Baza: 15s + Social

    // Supliment Durată
    if (duration === 30) total += 20; 
    if (duration === 60) total += 50; 

    // Supliment Stil
    if (style === "Cinematic") total += 20;
    if (style === "Premium") total += 50;

    // Supliment AI
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
        if (isDuplicate) {
          alert(`${file.name}: ${t.alreadyExists}`);
        } else if (updatedList.length < maxImages) {
          updatedList.push(file);
        }
      });
      return updatedList;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  /* ================= TRIMITE PREȚUL CĂTRE PLATĂ ================= */
  async function handleCreateVideo() {
    if (images.length === 0) return alert(t.addAtLeastOne);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Trimitem toate opțiunile și PREȚUL CALCULAT
        body: JSON.stringify({ 
          duration, 
          format, 
          style, 
          price, 
          aiEnabled,
          imageCount: images.length 
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Eroare la plată:", err);
      alert("A apărut o problemă la inițierea plății.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden", background: "linear-gradient(135deg,#0b1c2d,#10263f)", padding: "20px 40px", display: "flex", flexDirection: "column", color: "#fff" }}>
      
      <h1 style={{ textAlign: "center", color: "#4fd1c5", fontSize: 45, fontWeight: 900, margin: "0 0 15px 0", animation: "megaPulse 3s ease-in-out infinite" }}>
        {t.title}
      </h1>

      <style jsx>{`
        @keyframes megaPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 30, maxWidth: 1400, margin: "0 auto", flex: 1, alignItems: "stretch", paddingBottom: "20px" }}>
        
        {/* PANEL STÂNGA */}
        <div style={{ background: "rgba(255,255,255,0.07)", padding: "25px", borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h2 style={{ fontSize: 22, margin: 0 }}>{t.videoSettings}</h2>
            
            <div>
              <p style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{t.duration}</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[15, 30, 60].map(v => (
                  <button key={v} onClick={() => setDuration(v as any)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", fontWeight: "bold", cursor: "pointer", background: duration === v ? "#4fd1c5" : "#fff", color: "#000" }}>{v}s</button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{t.format}</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["16:9", "1:1", "9:16"].map(f => (
                  <button key={f} onClick={() => setFormat(f as any)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", fontWeight: "bold", cursor: "pointer", background: format === f ? "#4fd1c5" : "#fff", color: "#000" }}>{f}</button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{t.style}</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["Social", "Cinematic", "Premium"].map(s => (
                  <button key={s} onClick={() => setStyle(s as any)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", fontWeight: "bold", cursor: "pointer", background: style === s ? "#4fd1c5" : "#fff", color: "#000" }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "12px", cursor: "pointer", border: aiEnabled ? "1px solid #4fd1c5" : "1px solid transparent", transition: "0.3s" }}>
              <input type="checkbox" checked={aiEnabled} onChange={(e) => setAiEnabled(e.target.checked)} style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#4fd1c5" }} />
              <span style={{ fontSize: "14px", fontWeight: "bold", color: aiEnabled ? "#4fd1c5" : "#fff" }}>{t.aiOption}</span>
            </label>

            <div style={{ textAlign: "center", fontSize: 32, color: "#4fd1c5", fontWeight: "900", margin: "10px 0" }}>
              {t.price}: {price} RON
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleUpload} />
            <button onClick={() => fileInputRef.current?.click()} style={{ width: "100%", padding: 15, background: "rgba(79, 209, 197, 0.1)", color: "#4fd1c5", border: "2px solid #4fd1c5", borderRadius: 14, fontWeight: "bold", cursor: "pointer" }}>{t.addImages}</button>
            <button onClick={handleCreateVideo} disabled={loading} style={{ width: "100%", padding: 18, background: "#4fd1c5", color: "#0b1c2d", border: "none", borderRadius: 14, fontWeight: "900", cursor: "pointer", fontSize: 18 }}>{loading ? "SE PROCESEAZĂ..." : t.createVideo}</button>
          </div>
        </div>

        {/* PANEL DREAPTA */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>{t.images} <span style={{color: "#4fd1c5"}}>({images.length}/{maxImages})</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, flex: 1 }}>
            {Array.from({ length: maxImages }).map((_, i) => (
              <div key={i} style={{ width: "100%", aspectRatio: "1/1", background: "#0e2238", borderRadius: 18, position: "relative", border: images[i] ? "3px solid #4fd1c5" : "1px dashed rgba(255,255,255,0.1)", overflow: "hidden" }}>
                {images[i] ? (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <img src={URL.createObjectURL(images[i])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div onClick={(e) => { e.stopPropagation(); removeImage(i); }} style={{ position: "absolute", top: "6px", right: "6px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(0, 0, 0, 0.7)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px", fontWeight: "bold", zIndex: 100, border: "1px solid rgba(255,255,255,0.2)" }} onMouseOver={(e) => (e.currentTarget.style.background = "#ff4d4d")} onMouseOut={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)")}>×</div>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.05)", fontSize: 11 }}>Slot {i+1}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}