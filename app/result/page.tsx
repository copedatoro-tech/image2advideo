"use client";

export default function ResultPage() {
  const videoUrl = "/videos/test-video.mp4";

  return (
    <main
      style={{
        height: "100vh",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "24px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        Videoclipul tău este gata
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "300px",          // 👈 VIDEO MAI MIC
          aspectRatio: "9 / 16",
          background: "#111",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "12px",       // 👈 SPAȚIU MIC PENTRU BUTON
        }}
      >
        <video
          src={videoUrl}
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "black",
          }}
        />
      </div>

      <a
        href={videoUrl}
        download
        style={{
          padding: "12px 22px",
          background: "white",
          color: "black",
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: "600",
          textDecoration: "none",
        }}
      >
        Descarcă video
      </a>
    </main>
  );
}
