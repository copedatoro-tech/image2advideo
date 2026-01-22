"use client";

export type Format = "mp4" | "webm";

type VideoOptionsProps = {
  format: Format;
  setFormat: (format: Format) => void;
};

export default function VideoOptions({
  format,
  setFormat,
}: VideoOptionsProps) {
  return (
    <div>
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as Format)}
      >
        <option value="mp4">MP4</option>
        <option value="webm">WEBM</option>
      </select>
    </div>
  );
}
