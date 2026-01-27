"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Procesare plată...");

  // Preluăm prețul și sesiunea din URL dacă este nevoie
  const price = searchParams.get("price");

  useEffect(() => {
    // Aici putem adăuga o logică de verificare dacă plata a fost inițiată
    // Dar cel mai important: NU importăm generateVideo aici!
    
    console.log("Pagina de plată a fost încărcată pentru suma:", price);
  }, [price]);

  return (
    <div style={{ 
      height: "100vh", 
      background: "#0b1c2d", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      color: "#fff",
      fontFamily: "sans-serif" 
    }}>
      <div style={{ 
        background: "rgba(255,255,255,0.05)", 
        padding: "40px", 
        borderRadius: "24px", 
        textAlign: "center",
        border: "1px solid #4fd1c5"
      }}>
        <h1 style={{ color: "#4fd1c5", marginBottom: "20px" }}>Finalizare Comandă</h1>
        <p style={{ fontSize: "18px" }}>Vă mulțumim pentru încredere!</p>
        {price && <p style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>Total de plată: {price} RON</p>}
        
        <div style={{ marginTop: "30px" }}>
          <button 
            onClick={() => router.push("/")}
            style={{ 
              padding: "12px 25px", 
              background: "#4fd1c5", 
              color: "#0b1c2d", 
              border: "none", 
              borderRadius: "10px", 
              fontWeight: "bold", 
              cursor: "pointer" 
            }}
          >
            Înapoi la editor
          </button>
        </div>
      </div>
    </div>
  );
}