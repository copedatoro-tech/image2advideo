"use client";

import { useSearchParams } from "next/navigation";

export default function DownloadClient() {
  const searchParams = useSearchParams();
  const video = searchParams.get("video");

  if (!video) {
    return <p>Video lipsă.</p>;
  }

  return (
    <div>
      <h1>Descarcă videoclipul</h1>
      <a href={video} download>
        Descarcă video
      </a>
    </div>
  );
}
