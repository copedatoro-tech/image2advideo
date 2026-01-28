"use client";

import { useSearchParams } from "next/navigation";

export default function PayClient() {
  const searchParams = useSearchParams();

  const price = searchParams.get("price");
  const images = searchParams.get("images");

  return (
    <div>
      <h1>Plată</h1>

      <p>Preț: {price}</p>
      <p>Imagini: {images}</p>

      {/* aici rămâne logica ta de Stripe / buton */}
    </div>
  );
}
