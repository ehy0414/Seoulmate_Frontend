import { useState } from "react";

import { mockFriends } from "../../mock/friend/mockFriends";

import FriendSearchBar from "../../components/friend/FriendSearchBar";
import FriendListItem from "../../components/friend/FriendListItem";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import BottomNavBar from "../../components/common/BottomNavBar";

type Friend = {
  userId: number;
  name: string;
  profileImage: string;
};

const FriendPage = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setFriends(mockFriends);
      return;
    }
    const filtered = mockFriends.filter((f) =>
      f.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFriends(filtered);
  };

  return (
    <>
      <div className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      {/* 검색 바 */}
      <div className="shrink-0 mt-[60px]">
        <FriendSearchBar onSearch={handleSearch} />
      </div>

      {/* 리스트 영역만 스크롤 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {friends.map((friend) => (
          <FriendListItem key={friend.userId} friend={friend} />
        ))}
      </div>
    </div>
    <BottomNavBar menu='friend'/>
    </>
    
  );
};

export default FriendPage;
