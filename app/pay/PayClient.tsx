"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PayClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }

    router.replace(`/result?session_id=${sessionId}`);
  }, [sessionId, router]);

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #0b1c2d, #10263f)",
      color: "#fff",
      fontFamily: "sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#4fd1c5", marginBottom: 16 }}>Se procesează plata...</h2>
        <p style={{ color: "#aaa" }}>Te rugăm să aștepți câteva momente.</p>
      </div>
    </div>
  );
}

