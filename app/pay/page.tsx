import { Suspense } from "react";
import PayClient from "./PayClient";

export default function PayPage() {
  return (
    <Suspense fallback={<p>Se încarcă plata...</p>}>
      <PayClient />
    </Suspense>
  );
}
