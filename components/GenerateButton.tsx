"use client";

import { useState } from "react";

export default function GenerateButton({
  price = 490,
}: {
  price?: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        alert(data.error || "Eroare la inițierea plății");
        setLoading(false);
        return;
      }

      // 🔥 Redirecționare către Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      alert("Eroare neașteptată");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50"
    >
      {loading ? "Se pregătește plata..." : "Creează video"}
    </button>
  );
}
