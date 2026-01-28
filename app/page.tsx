"use client";

import { useState, useMemo, useRef } from "react";

const translations = {
  ro: {
    title: "Image2AdVideo",
    videoSettings: "Setări video",
    duration: "Lungime video",
    format: "Format video",
    style: "Stil video",
    aiOption: "Activare Inteligență Artificială",
    aiPrice: "+20 RON",
    priceLabel: "Preț total",
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
  const maxImages = 10;

  const totalPrice = useMemo(() => {
    let total = 29;
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
    setImages(prev => {
      let updatedList = [...prev];
      newFiles.forEach(file => {
        if (updatedList.length < maxImages) updatedList.push(file);
      });
      return updatedList;
    });
  };

  // FUNCȚIA REPARATĂ PENTRU PLATĂ
  async function handleCreateVideo() {
    if (images.length === 0) return alert("Te rugăm să adaugi cel puțin o imagine.");
    
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          price: totalPrice, 
          duration, 
          format, 
          style, 
          aiEnabled,
          imageCount: images.length 
        }),
      });

      if (!res.ok) throw new Error("Eroare la comunicarea cu serverul de plată.");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirecționare către Stripe
      } else {
        alert("Nu s-a putut genera link-ul de plată.");
      }
    } catch (error) {
      console.error(error);
      alert("A apărut o problemă. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#020617", 
      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0) 0%, #020617 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234fd1c5' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", fontFamily: "'Inter', sans-serif" 
    }}>
      
      <h1 style={{ fontSize: "44px", fontWeight: "900", marginBottom: "30px", textAlign: "center", background: "linear-gradient(to right, #4fd1c5 0%, #818cf8 50%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1.5px", filter: "drop-shadow(0 0 15px rgba(129, 140, 248, 0.3))" }}>
        {t.title}
      </h1>

      <div style={{ width: "100%", maxWidth: "1000px", background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(25px)", borderRadius: "32px", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "35px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.03)", display: "flex", flexDirection: "column", gap: "15px", height: "fit-content" }}>
            <h2 style={{ fontSize: "16px", marginBottom: "10px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>{t.videoSettings}</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#64748b" }}>{t.duration}</span>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "12px" }}>
                  {[15, 30, 60].map(v => (
                    <button key={v} onClick={() => setDuration(v as any)} style={{ padding: "7px 14px", borderRadius: "9px", border: "none", cursor: "pointer", background: duration === v ? "#4fd1c5" : "transparent", color: duration === v ? "#000" : "#fff", fontSize: "12px", fontWeight: "bold" }}>{v}s</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#64748b" }}>{t.format}</span>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "12px" }}>
                  {["16:9", "9:16", "1:1"].map(f => (
                    <button key={f} onClick={() => setFormat(f as any)} style={{ padding: "7px 14px", borderRadius: "9px", border: "none", cursor: "pointer", background: format === f ? "#4fd1c5" : "transparent", color: format === f ? "#000" : "#fff", fontSize: "12px", fontWeight: "bold" }}>{f}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "5px" }}>
                 {["Social", "Cinematic", "Premium"].map(s => (
                    <button key={s} onClick={() => setStyle(s as any)} style={{ padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", background: style === s ? "#4fd1c5" : "rgba(255,255,255,0.05)", color: style === s ? "#000" : "#fff", fontWeight: "700", fontSize: "12px" }}>{s}</button>
                 ))}
              </div>
            </div>

            <div style={{ marginTop: "15px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(79, 209, 197, 0.05)", padding: "15px", borderRadius: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold", color: "#eee" }}>{t.aiOption}</span>
                <span style={{ fontSize: "11px", color: "#4fd1c5" }}>{t.aiPrice}</span>
              </div>
              <div onClick={() => setAiEnabled(!aiEnabled)} style={{ width: "48px", height: "24px", background: aiEnabled ? "#4fd1c5" : "#1e293b", borderRadius: "20px", position: "relative", cursor: "pointer", transition: "0.3s" }}>
                <div style={{ position: "absolute", top: "3px", left: aiEnabled ? "27px" : "3px", width: "18px", height: "18px", background: "#fff", borderRadius: "50%", transition: "0.3s" }} />
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "15px", marginTop: "5px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "42px", fontWeight: "900", color: "#4fd1c5" }}>{totalPrice}</span>
                <span style={{ fontSize: "16px", color: "#4fd1c5", fontWeight: "bold" }}>RON</span>
              </div>
              <p style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase", letterSpacing: "1px" }}>{t.priceLabel}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "12px", marginTop: "10px" }}>
              <button onClick={() => fileInputRef.current?.click()} style={{ padding: "14px", borderRadius: "12px", border: "1.5px solid #4fd1c5", background: "transparent", color: "#4fd1c5", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>{t.addImages}</button>
              
              {/* BUTONUL ACUM FUNCȚIONEAZĂ */}
              <button 
                onClick={handleCreateVideo} 
                disabled={loading}
                style={{ 
                  padding: "14px", borderRadius: "12px", border: "none", 
                  background: loading ? "#1e293b" : "#4fd1c5", 
                  color: loading ? "#64748b" : "#000", 
                  fontWeight: "800", cursor: loading ? "not-allowed" : "pointer", 
                  fontSize: "13px", boxShadow: loading ? "none" : "0 10px 20px -5px rgba(79, 209, 197, 0.4)" 
                }}
              >
                {loading ? t.processing : t.createVideo}
              </button>
            </div>
            <input ref={fileInputRef} type="file" multiple hidden onChange={handleUpload} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ fontSize: "16px", marginBottom: "20px", color: "#94a3b8", fontWeight: "600" }}>
              {t.images} <span style={{color: "#4fd1c5", marginLeft: "10px"}}>({images.length}/{maxImages})</span>
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
              {Array.from({ length: maxImages }).map((_, i) => (
                <div key={i} style={{ width: "calc(33.33% - 8px)", aspectRatio: "1/1", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: images[i] ? "2px solid #4fd1c5" : "1px dashed rgba(255,255,255,0.1)", overflow: "hidden", position: "relative" }}>
                  {images[i] && <img src={URL.createObjectURL(images[i])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}