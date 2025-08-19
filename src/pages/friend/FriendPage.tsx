import { useState } from "react";

import { mockFriends } from "../../mock/friend/mockFriends";

import FriendSearchBar from "../../components/friend/FriendSearchBar";
import FriendListItem from "../../components/friend/FriendListItem";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";

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
    <HeaderSeoulmate title="서울메이트" alarm={false} />

    <div className="flex flex-col h-screen bg-white mt-[60px]">

      {/* 검색창 */}
      <FriendSearchBar onSearch={handleSearch} />

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {friends.map((friend) => (
          <FriendListItem key={friend.userId} friend={friend} />
        ))}
      </div>
    </div>
    </>
    
  );
};

export default FriendPage;
