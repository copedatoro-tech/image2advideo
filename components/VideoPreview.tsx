"use client";

import { useState } from "react";

export default function VideoPreview() {
  const [sendEmail, setSendEmail] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingBottom: "24px", // spațiu jos
      }}
    >
      {/* VIDEO */}
      <video
        src="/videos/demo.mp4"
        controls
        style={{
          width: "100%",
          maxWidth: "380px",
          maxHeight: "480px", // puțin mai scund
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      {/* DOWNLOAD – MUTAT MAI SUS */}
      <div style={{ marginTop: "16px" }}>
        <a
          href="/videos/demo.mp4"
          download
          style={{
            display: "inline-block",
            padding: "12px 20px",
            backgroundColor: "#22c55e",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Descarcă video
        </a>
      </div>

      {/* EMAIL OPTION */}
      <div
        style={{
          marginTop: "18px",
          maxWidth: "380px",
          marginInline: "auto",
          textAlign: "left",
        }}
      >
        <label
          style={{
            display: "flex",
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
          Trimite și pe e-mail (valabil 72 de ore)
        </label>

        {sendEmail && (
          <input
            type="email"
            placeholder="Adresa de e-mail"
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
            }}
          />
        )}
      </div>
    </div>
  );
}
