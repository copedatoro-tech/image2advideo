"use client";

import { useSearchParams } from "next/navigation";

export default function DownloadClient() {
  const params = useSearchParams();
  const videoUrl = params.get("video");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Descarcă videoclipul</h1>

      {videoUrl ? (
        <a
          href={videoUrl}
          download
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Descarcă video
        </a>
      ) : (
        <p>Nu am găsit niciun video de descărcat.</p>
      )}
    </div>
  );
}
