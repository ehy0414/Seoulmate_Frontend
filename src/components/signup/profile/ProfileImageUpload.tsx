// components/signup/profile/ProfileImageUpload.tsx
import React, { useRef } from "react";

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

  const defaultIcon =
    "https://api.builder.io/api/v1/image/assets/TEMP/c98cc0f189cd4596ac0218ccc3940df161af7907?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c";

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
