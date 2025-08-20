import { useState } from "react";
import type { KeyboardEvent } from "react";
import SearchIcon from '../../assets/friend/SearchIcon.png'
import BackArrow from '../../assets/friend/backArrow.png';

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
        <button>
            <img src={BackArrow} alt="뒤로가기 아이콘" className="w-[19px] h-[19px] mr-[16px]" />
        </button>
        <div className="flex flex-1 h-[45px] w-[293px] items-center border-[1px] border-black-700 rounded-md px-3 py-2">
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
            className="bg-none ml-[18px]"
        >
            <img src={SearchIcon} alt="검색 아이콘" className="w-[19px] h-[19px]" />
        </button>
    </div>
  );
};

export default FriendSearchBar;
