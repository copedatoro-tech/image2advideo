"use client";

import { useState } from "react";

type Props = {
  sessionId: string | null;
};

export default function ResultClient({ sessionId }: Props) {
  const [sendEmail, setSendEmail] = useState(false);

  if (!sessionId) {
    return (
      <div style={styles.page}>
        <h2 style={{ color: "red" }}>❌ Session ID lipsește</h2>
      </div>
    );
  }

  const videoUrl = "/videos/demo.mp4"; // demo / fallback

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Videoclipul tău este gata</h1>

      <div style={styles.card}>
        <video
          src={videoUrl}
          controls
          style={styles.video}
        />

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
          />
          <span>
            Trimite pe e-mail (atașament + link valabil 72h)
          </span>
        </label>

        <button
          style={styles.downloadBtn}
          onClick={() => {
            if (sendEmail) {
              alert("✔ Video-ul va fi trimis și pe e-mail");
            }
            window.location.href = videoUrl;
          }}
        >
          Descarcă video
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
  },
  title: {
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: 700,
  },
  card: {
    background: "#111",
    borderRadius: "16px",
    padding: "24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  video: {
    width: "100%",
    maxHeight: "360px",
    borderRadius: "12px",
    objectFit: "contain",
    background: "#000",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    opacity: 0.9,
  },
  downloadBtn: {
    background: "#4fe3c1", // verde ca pe homepage
    color: "#000",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
