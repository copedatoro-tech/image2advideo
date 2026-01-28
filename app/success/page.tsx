"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();

        const jobId = data?.metadata?.jobId;
        if (!jobId) return setStatus("error");

        const statusRes = await fetch(`/api/job/status?jobId=${jobId}`);
        const statusData = await statusRes.json();

        if (statusData.status === "done") {
          setVideoUrl(`/api/job/video?jobId=${jobId}`);
          setStatus("done");
        } else if (statusData.status === "error") {
          setStatus("error");
        } else {
          setTimeout(checkStatus, 3000);
        }
      } catch {
        setStatus("error");
      }
    };

    checkStatus();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Inter, sans-serif",
      padding: "40px",
      textAlign: "center"
    }}>
      {status === "loading" && <h1>🎬 Se generează video-ul...</h1>}
      {status === "error" && <h1>❌ Eroare la generare</h1>}
      {status === "done" && videoUrl && (
        <video controls style={{ maxWidth: "100%", borderRadius: "20px" }}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
