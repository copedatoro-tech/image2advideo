"use client";

import { useState } from "react";

export default function GenerateButton({ price = 490 }: { price?: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "Eroare la inițierea plății");
        setLoading(false);
        return;
      }

      // 🔥 Redirecționare către Stripe
      window.location.href = data.url;
    } catch (err) {
      setError("Eroare neașteptată");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Se pregătește plata..." : "Creează video"}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
