"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import VideoOptions, { Format } from "@/components/VideoOptions";

export default function Page() {
  const [images, setImages] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("mp4");

  return (
    <main className="min-h-screen p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <ImageUploader images={images} setImages={setImages} />
          <VideoOptions format={format} setFormat={setFormat} />
        </div>
      </div>
    </main>
  );
}
