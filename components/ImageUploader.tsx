"use client";

export default function ImageUploader({
  onChange,
}: {
  onChange: (files: File[]) => void;
}) {
  return (
    <div style={{ marginTop: 20 }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (!e.target.files) return;
          onChange(Array.from(e.target.files));
        }}
      />
    </div>
  );
}
