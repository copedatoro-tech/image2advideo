"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "active" | "inactive">(
    "loading"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    if (!userId) {
      setStatus("inactive");
      return;
    }

    fetch(`/api/user/status?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.active) {
          setStatus("active");
        } else {
          setStatus("inactive");
        }
      })
      .catch(() => setStatus("inactive"));
  }, []);

  if (status === "loading") {
    return <h1>Se confirmă plata...</h1>;
  }

  if (status === "active") {
    return <h1>✅ Plata confirmată. Cont activ!</h1>;
  }

  return <h1>❌ Plata nu a fost confirmată.</h1>;
}
