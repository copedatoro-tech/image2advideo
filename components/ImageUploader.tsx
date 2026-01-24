"use client";

import { useRef } from "react";

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;

    const existing = new Set(images);
    const added: string[] = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      if (!existing.has(url)) {
        added.push(url);
      }
    });

    setImages([...images, ...added].slice(0, 10));
  };

  const removeImage = (index: number) => {
    const copy = [...images];
    copy.splice(index, 1);
    setImages(copy);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openPicker}
        className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
      >
        Selectează imagini (max 10)
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl border border-white/20 bg-white/5 overflow-hidden"
          >
            {images[i] && (
              <>
                <img
                  src={images[i]}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/30 text-black text-sm"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
