"use client";

type PayClientProps = {
  videoDuration: 15 | 30 | 60;
  videoStyle: "Social" | "Cinematic" | "Premium";
  aiEnabled: boolean;
  loading?: boolean;
};

const PayClient = ({
  videoDuration,
  videoStyle,
  aiEnabled,
  loading = false,
}: PayClientProps) => {
  const handlePay = async () => {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoDuration,
        videoStyle,
        aiEnabled,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Eroare Stripe");
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold"
    >
      {loading ? "..." : "Plătește"}
    </button>
  );
};

export default PayClient;
