"use client";

export default function PayPage() {
  const handlePay = async () => {
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com" }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Plată</h1>
      <button onClick={handlePay}>
        Plătește
      </button>
    </div>
  );
}
