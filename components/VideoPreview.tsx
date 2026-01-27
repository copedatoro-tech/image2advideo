"use client";

import { useState } from "react";

export default function VideoPreview() {
  const [sendEmail, setSendEmail] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingBottom: "32px",
      }}
    >
      {/* TITLU */}
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>
        Download video
      </h1>

      {/* VIDEO */}
      <video
        src="/videos/demo.mp4"
        controls
        style={{
          width: "100%",
          maxWidth: "440px", // 🔼 puțin mai mare
          maxHeight: "520px",
          borderRadius: "14px",
          objectFit: "cover",
        }}
      />

      {/* DOWNLOAD BUTTON */}
      <div style={{ marginTop: "22px" }}>
        <a
          href="/videos/demo.mp4"
          download
          style={{
            display: "inline-block",
            padding: "14px 26px",
            backgroundColor: "#22c55e",
            color: "#000",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Download video
        </a>
      </div>

      {/* EXPIRARE */}
      <p style={{ marginTop: "12px", fontSize: "14px", opacity: 0.8 }}>
        Link-ul este valabil timp de 72 de ore
      </p>

      {/* EMAIL OPTION */}
      <div
        style={{
          marginTop: "18px",
          maxWidth: "440px",
          marginInline: "auto",
          textAlign: "center", // ✅ CENTRAT
        }}
      >
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px",
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
            placeholder="Adresa de e-mail"
            style={{
              marginTop: "12px",
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#000",
              color: "#fff",
            }}
          />
        )}
      </div>
    </div>
  );
}
