"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    if (res.ok) {
      setEmailSent(true);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>Mulțumim pentru achiziție!</h1>
      <p>Video-ul tău este gata sau va fi gata în câteva momente.</p>

      <h3 style={{ marginTop: 30 }}>Video-ul tău:</h3>

      <video
        src="https://example.com/fake-video.mp4"
        controls
        style={{ width: "100%", borderRadius: 8, marginTop: 20 }}
      />

      <div style={{ marginTop: 40 }}>
        {!emailSent ? (
          <button
            onClick={handleSendEmail}
            style={{
              padding: "12px 20px",
              background: "#000",
              color: "#fff",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Trimite-mi video-ul pe email
          </button>
        ) : (
          <p>Email trimis cu succes!</p>
        )}
      </div>
    </div>
  );
}
