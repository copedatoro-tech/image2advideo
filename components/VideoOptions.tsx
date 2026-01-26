"use client";

type VideoOptionsProps = {
  duration: number;
  setDuration: (value: number) => void;
  format: string;
  setFormat: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
};

export default function VideoOptions({
  duration,
  setDuration,
  format,
  setFormat,
  style,
  setStyle,
}: VideoOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label>Durată (secunde)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="mp4">MP4</option>
          <option value="webm">WEBM</option>
        </select>
      </div>

      <div>
        <label>Stil</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="promo">Promo</option>
          <option value="cinematic">Cinematic</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
    </div>
  );
}
