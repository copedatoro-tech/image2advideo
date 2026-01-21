"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl card">
        <h1 className="text-3xl font-bold text-center mb-8">
          Creează video publicitar
        </h1>

        {/* Upload */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Încarcă imagini de produs
          </label>

          <div className="upload-box">
            <input
              type="file"
              multiple
              className="block w-full text-sm"
            />
            <p className="text-sm text-muted mt-2">
              Poți încărca mai multe imagini (unghiuri diferite ale produsului)
            </p>
          </div>
        </div>

        {/* Setări */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block mb-2 font-semibold">Format</label>
            <select className="w-full p-3">
              <option>9:16 – Vertical</option>
              <option>16:9 – Landscape</option>
              <option>1:1 – Pătrat</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Durată</label>
            <select className="w-full p-3">
              <option>15 sec</option>
              <option>30 sec</option>
              <option>60 sec</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Stil</label>
            <select className="w-full p-3">
              <option>Social Media</option>
              <option>Cinematic</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full btn-primary text-lg"
        >
          {loading ? "Se generează..." : "Generează video"}
        </button>
      </div>
    </main>
  );
}
