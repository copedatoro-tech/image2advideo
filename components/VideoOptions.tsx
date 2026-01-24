"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import VideoOptions from "@/components/VideoOptions";
import PreviewPanel from "@/components/PreviewPanel";

export default function HomePage() {
  const [images, setImages] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(15);
  const [format, setFormat] = useState<string>("9:16");
  const [style, setStyle] = useState<string>("Cinematic");
  const [email, setEmail] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const canGenerate =
    images.length > 0 && email.includes("@") && !isGenerating;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setVideoUrl(null);

    // simulare generare video (mock)
    setTimeout(() => {
      setVideoUrl("/mock/demo-video.mp4");
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* STÂNGA */}
        <div className="space-y-8">
          {/* Selectare imagini */}
          <ImageUploader images={images} setImages={setImages} />

          {/* Opțiuni video */}
          <VideoOptions
            duration={duration}
            setDuration={setDuration}
            format={format}
            setFormat={setFormat}
            style={style}
            setStyle={setStyle}
          />

          {/* Email */}
          <div className="space-y-2">
            <label className="text-slate-200 font-medium">
              Email pentru livrare
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplu@email.com"
              className="w-full rounded-xl bg-slate-800/70 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preț */}
          <div className="text-lg font-semibold text-slate-200">
            Preț: <span className="text-blue-400">în curând</span>
          </div>

          {/* Generează */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
              ${
                canGenerate
                  ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30"
                  : "bg-slate-700 cursor-not-allowed opacity-60"
              }`}
          >
            {isGenerating ? "Se generează videoclipul..." : "Generează video"}
          </button>
        </div>

        {/* DREAPTA – PREVIEW */}
        <div className="flex flex-col items-center justify-start">
          {!videoUrl ? (
            <PreviewPanel images={images} />
          ) : (
            <div className="w-full rounded-3xl border border-white/10 bg-black/60 p-4">
              <video
                src={videoUrl}
                controls
                className="w-full rounded-2xl"
              />
              <a
                href={videoUrl}
                download
                className="block mt-4 text-center w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold"
              >
                Descarcă video
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
