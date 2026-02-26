"use client";

import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<p>Se încarcă rezultatul…</p>}>
      <ResultClient />
    </Suspense>
  );
}

