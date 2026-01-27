"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");

  if (!token) {
    return (
      <div style={{ padding: 40, color: "#fff", textAlign: "center" }}>
        Link invalid sau lipsă.
      </div>
    );
  }

  const videoApiUrl = `/api/video/${token}`;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "32px auto",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: 18 }}>Download video</h1>

      {/* VIDEO PREVIEW */}
      <video
        src={videoApiUrl}
        controls
        style={{
          width: "100%",
          maxHeight: 420,
          borderRadius: 14,
          background: "#000",
          marginBottom: 22,
        }}
      />

      {/* DOWNLOAD BUTTON */}
      <a
        href={videoApiUrl}
        download
        style={{
          display: "inline-block",
          padding: "16px 34px",
          background: "#20c997",
          color: "#000",
          borderRadius: 14,
          fontWeight: 800,
          fontSize: "18px",
          textDecoration: "none",
        }}
      >
        Descarcă video
      </a>

      {/* EXPIRE INFO */}
      <p style={{ marginTop: 12, opacity: 0.85 }}>
        Link-ul este valabil <strong>72 de ore</strong>
      </p>

      {/* EMAIL OPTION – CENTRAT */}
      <div
        style={{
          marginTop: 28,
          maxWidth: 420,
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
          />
          Trimite video-ul și pe e-mail (opțional)
        </label>

        {sendEmail && (
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginTop: 12,
              width: "100%",
              padding: 12,
              borderRadius: 10,
              textAlign: "center",
            }}
          />
        )}
      </div>
    </div>
  );
}
