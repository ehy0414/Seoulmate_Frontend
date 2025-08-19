import React, { useRef } from "react";
import icon from "./images/icon.jpg";

interface Props {
  onImageChange: (file: File) => void;
  previewUrl?: string;
}

export const ProfileImageUpload: React.FC<Props> = ({ onImageChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const defaultIcon =icon;
  return (
    <section className="flex justify-center items-center pb-5 pt-20 bg-white">
      <img
        src={previewUrl || defaultIcon}
        alt="Profile image upload"
        onClick={handleClick}
        className={`object-cover w-20 h-20 aspect-square cursor-pointer ${
          previewUrl ? "rounded-full" : "rounded-none"
        }`}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </section>
  );
};
