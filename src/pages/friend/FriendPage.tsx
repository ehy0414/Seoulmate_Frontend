import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FriendSearchBar from "../../components/friend/FriendSearchBar";
import FriendListItem from "../../components/friend/FriendListItem";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import BottomNavBar from "../../components/common/BottomNavBar";
import TabMenu from "../../components/common/TabMenu";

import api from '../../services/axios'; // 앞에서 만든 axios 인스턴스

type Friend = {
  userId: number;
  name: string;
  profileImage: string;
};

const FriendPage = () => {
  const FIRST_TAB = "주최";
  const SECOND_TAB = "참여";
  const [activeTab, setActiveTab] = useState<string>(FIRST_TAB);
  const [friends, setFriends] = useState<Friend[]>([]);

  const navigate = useNavigate();

  // 컴포넌트 로드 시 API 요청
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await api.get("/friends"); // GET 요청
        if (res.data.success && Array.isArray(res.data.data)) {
          setFriends(res.data.data); // data만 상태에 반영
        }
      } catch (error) {
        console.error("친구 목록 가져오기 실패:", error);
      }
    };
    fetchFriends();
  }, []);

  // 검색 필터링 (백엔드 연동 전이므로 프론트에서만 필터링)
  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      // 다시 전체 요청 불러오기
      (async () => {
        try {
          const res = await api.get("/friends");
          if (res.data.success && Array.isArray(res.data.data)) {
            setFriends(res.data.data);
          }
        } catch (error) {
          console.error(error);
        }
      })();
      return;
    }
    const filtered = friends.filter((f) =>
      f.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFriends(filtered);
  };

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
      <BottomNavBar menu="friend" />
    </>
  );
};

export default FriendPage;
