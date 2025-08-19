import { useState } from "react";
import type { KeyboardEvent } from "react";

type Props = {
  onSearch: (keyword: string) => void;
};

const FriendSearchBar = ({ onSearch }: Props) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log("검색 실행:", keyword);
    onSearch(keyword);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex flex-1 items-center border border-black-300 rounded-md px-3 py-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="찾고 싶은 친구를 검색하세요."
          className="flex-1 border-none outline-none text-sm text-black-700 placeholder-black-400"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
      >
        검색
      </button>
    </div>
  );
};

export default FriendSearchBar;
