"use client";

export default function GenerateButton({ email }: { email: string }) {
  const handlePay = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ SINGURUL redirect permis
    }
  };

  return (
    <button
      onClick={handlePay}
      className="bg-white text-black px-6 py-3 rounded-full font-semibold"
    >
      Plătește & Generează
    </button>
  );
}
