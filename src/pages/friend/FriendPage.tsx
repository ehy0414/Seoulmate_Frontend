import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { mockFriends } from "../../mock/friend/mockFriends";
import FriendSearchBar from "../../components/friend/FriendSearchBar";
import FriendListItem from "../../components/friend/FriendListItem";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import BottomNavBar from "../../components/common/BottomNavBar";
import TabMenu from "../../components/common/TabMenu";

type Friend = {
  userId: number;
  name: string;
  profileImage: string;
};

const FriendPage = () => {
  const FIRST_TAB = '주최';
  const SECOND_TAB = '참여';
  const [activeTab, setActiveTab] = useState<string>(FIRST_TAB);
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

  const navigate = useNavigate();

  const onFirstTabClick = () => {
    setActiveTab(FIRST_TAB);
    navigate("/friend");
  };
  
  const onSecondTabClick = () => {
    setActiveTab(SECOND_TAB);
    navigate("/friend/request");
  };

  return (
    <>
      <div className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      <div className="mt-[60px]"></div>
      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={onFirstTabClick}
        onSecondTabClick={onSecondTabClick}
      />

      <div className="shrink-0">
        <FriendSearchBar onSearch={handleSearch} />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide mb-[60px]">
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
