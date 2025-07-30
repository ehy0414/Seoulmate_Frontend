"use client";

import { useState, useRef } from "react";

interface FileUploadFieldProps {
  onFileSelect?: (file: File | null) => void;
  accept?: string;
}

export function FileUploadField({
  onFileSelect,
  accept = "image/*,.pdf,.doc,.docx"
}: FileUploadFieldProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2 items-center h-[72px] mx-4 top-[339px] w-[357px]">
      <label
        htmlFor="file-upload"
        className="self-stretch text-sm leading-5 text-zinc-900 max-sm:text-sm"
      >
        학교 인증
      </label>

      <div className="relative w-full">
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="sr-only"
          aria-describedby="file-upload-description"
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center self-stretch px-4 py-0 rounded-lg border border-solid bg-zinc-50 border-zinc-900 h-[45px] w-full"
        >
          <span className="text-sm leading-5 text-black-700 max-sm:text-sm">
            {selectedFile ? selectedFile.name : "파일 첨부"}
          </span>
        </button>
      </div>

      <p
        id="file-upload-description"
        className="h-3.5 text-xs left-0 text-neutral-400 top-[79px] w-full"
      >
        재학증명서, 학생증 등으로 인증 가능합니다.
      </p>
    </div>
  );
}
