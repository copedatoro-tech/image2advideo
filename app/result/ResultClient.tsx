"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [paid, setPaid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/stripe/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setPaid(data.paid))
      .catch(() => setPaid(false));
  }, [sessionId]);

  if (paid === null) return <p>Se verifică plata...</p>;
  if (!paid) return <h1>❌ Plata nu a fost confirmată</h1>;

  return (
    <div>
      <h1>✅ Plata confirmată</h1>
      <p>Video-ul tău este în curs de generare.</p>
    </div>
  );
}
