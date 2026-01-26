"use client";

import { useSearchParams } from "next/navigation";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return <ResultClient sessionId={sessionId} />;
}
