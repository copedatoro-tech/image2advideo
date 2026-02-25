"use client";
import { Suspense } from "react";
import DownloadClient from "./DownloadClient";

export default function DownloadPage() {
  return (
    <Suspense fallback={<p>Se încarcă...</p>}>
      <DownloadClient />
    </Suspense>
  );
}
