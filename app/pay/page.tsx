"use client";

export default function PayPage() {
  async function goToCheckout() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Acces restricționat</h1>
      <p>Trebuie să faci plata pentru a continua.</p>
      <button
        onClick={goToCheckout}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Plătește acum
      </button>
    </main>
  );
}
