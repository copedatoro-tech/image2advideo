"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const processPayment = async () => {
      try {
        // 1️⃣ verificăm plata
        const verifyRes = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );
        const verifyData = await verifyRes.json();

        if (!verifyData.paid) {
          setStatus("error");
          return;
        }

        // 2️⃣ generăm video
        const renderRes = await fetch("/api/render-video", {
          method: "POST",
        });

        const renderData = await renderRes.json();

        if (!renderData.success || !renderData.videoUrl) {
          setStatus("error");
          return;
        }

        // 3️⃣ creăm token 72h
        const filename = renderData.videoUrl.split("/").pop();
        const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
        const token = `${filename}__${expiresAt}`;

        // 4️⃣ redirect final
        router.replace(`/download?token=${token}`);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    processPayment();
  }, [sessionId, router]);

  if (status === "loading") {
    return (
      <div style={{ padding: 60, textAlign: "center", color: "#fff" }}>
        <h2>Se procesează plata și se generează video-ul…</h2>
        <p>Te rugăm să aștepți câteva momente.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 60, textAlign: "center", color: "#fff" }}>
      <h2>A apărut o eroare.</h2>
      <p>Te rugăm să ne contactezi sau să reîncerci.</p>
    </div>
  );
}

