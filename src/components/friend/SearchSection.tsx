"use client";
import * as React from "react";

interface SearchSectionProps {
  onBack?: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  onBack,
  onSearch,
  placeholder = "찾고 싶은 친구를 검색하세요."
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleBackClick = () => {
    onBack?.();
  };

  const handleSearchClick = () => {
    onSearch?.(searchQuery);
  };

  return (
    <div className="flex flex-col justify-center p-2.5 w-full bg-white">
      <div className="flex gap-4 items-center w-full">
        <button
          className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-6 min-h-6"
          onClick={handleBackClick}
          aria-label="뒤로 가기"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/eb90d170687b6a5631ae378d5e41a64b9f44ad90?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            className="object-contain self-stretch my-auto w-2 aspect-[0.47] fill-zinc-900"
            alt=""
          />
        </button>
        <div className="flex flex-1 shrink items-center self-stretch px-4 my-auto text-sm font-medium leading-none rounded-lg border border-solid basis-0 bg-zinc-50 border-zinc-900 min-h-[45px] min-w-60 text-stone-300">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder-stone-300"
            aria-label="친구 검색"
          />
        </div>
        <button
          className="flex flex-col justify-center items-center self-stretch my-auto w-6 min-h-6"
          onClick={handleSearchClick}
          aria-label="검색"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/08137582a46c5044ed4f44a1ca84a95f8e40d9df?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            className="object-contain aspect-[1.05] fill-zinc-900 w-[19px]"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
