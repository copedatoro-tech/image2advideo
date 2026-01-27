"use client";

import VideoPreview from "@/components/VideoPreview";

export default function ResultPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Video-ul tău este gata 🎉
        </h1>

        <VideoPreview />
      </div>
    </main>
  );
}
