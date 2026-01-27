"use client";

type Props = {
  duration: 15 | 30 | 60;
  setDuration: (v: 15 | 30 | 60) => void;
  style: "Social" | "Cinematic" | "Premium";
  setStyle: (v: "Social" | "Cinematic" | "Premium") => void;
  aiEnabled: boolean;
  setAiEnabled: (v: boolean) => void;
};

export default function VideoOptions({
  duration,
  setDuration,
  style,
  setStyle,
  aiEnabled,
  setAiEnabled
}: Props) {
  return (
    <div className="space-y-8">
      {/* SECȚIUNE LUNGIME VIDEO */}
      <section>
        <p className="text-white text-lg mb-3">Lungime video</p>
        <div className="flex gap-3">
          {[15, 30, 60].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d as any)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                duration === d 
                ? 'bg-[#4ade80] text-black shadow-lg shadow-[#4ade80]/20' 
                : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </section>

      {/* SECȚIUNE STIL VIDEO */}
      <section>
        <p className="text-white text-lg mb-3">Stil video</p>
        <div className="flex gap-3">
          {(["Social", "Cinematic", "Premium"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                style === s 
                ? 'bg-[#4ade80] text-black shadow-lg shadow-[#4ade80]/20' 
                : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* SECȚIUNE INTELIGENȚĂ ARTIFICIALĂ */}
      <section className="bg-[#1f364d] p-5 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
        <label className="flex items-start gap-4 cursor-pointer">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              className="w-6 h-6 rounded border-gray-300 text-[#4ade80] focus:ring-[#4ade80] cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-base">Inteligență artificială (AI)</p>
            <p className="text-sm text-gray-400 leading-tight mb-1">
              Optimizare automată, efecte inteligente, montaj avansat
            </p>
            <p className="text-[#4ade80] text-sm font-bold">+20 RON</p>
          </div>
        </label>
      </section>
    </div>
  );
}