"use client";

export default function PayButton() {
  const handlePay = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Eroare Stripe");
      }
    } catch {
      alert("Eroare Stripe");
    }
  };

  return (
    <button
      onClick={handlePay}
      style={{
        padding: "16px 32px",
        fontSize: "18px",
        borderRadius: "10px",
        backgroundColor: "#0ea5e9",
        color: "#fff",
      }}
    >
      Plătește
    </button>
  );
}
