"use client";

import { Dispatch, SetStateAction } from "react";

type ImageUploaderProps = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
};

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />
      {images.length > 0 && (
        <p>{images.length} image(s) selected</p>
      )}
    </div>
  );
}
