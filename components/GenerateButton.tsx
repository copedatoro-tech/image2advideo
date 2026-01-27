"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateButton({
  imageUrl,
  useAI = true,
}: {
  imageUrl: string;
  useAI?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          useAI,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Eroare la generare video");
        setLoading(false);
        return;
      }

      router.push(`/result?video=${encodeURIComponent(data.videoUrl)}`);
    } catch (err) {
      alert("Eroare neașteptată");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50"
    >
      {loading ? "Se generează video..." : "Creează video"}
    </button>
  );
}
