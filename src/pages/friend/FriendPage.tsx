import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FriendSearchBar from "../../components/friend/FriendSearchBar";
import FriendListItem from "../../components/friend/FriendListItem";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import BottomNavBar from "../../components/common/BottomNavBar";
import TabMenu from "../../components/common/TabMenu";
import { FriendsModal } from "../../components/modal/FriendsModal";

import api from '../../services/axios';

type Friend = {
  userId: number;
  name: string;
  profileImage: string;
};

const FriendPage = () => {
  const FIRST_TAB = "친구 목록";
  const SECOND_TAB = "친구 요청";
  const [activeTab, setActiveTab] = useState<string>(FIRST_TAB);
  const [friends, setFriends] = useState<Friend[]>([]);

  // 모달 상태 및 선택된 사용자
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  const openModal = (userId: number) => {
    setSelectedRequestId(userId);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await api.get("/friends");
        if (res.data.success && Array.isArray(res.data.data)) {
          setFriends(res.data.data);
        }
      } catch (error) {
        console.error("친구 목록 가져오기 실패:", error);
      }
    };
    fetchFriends();
  }, []);

  // 검색
  const handleSearch = async (keyword: string) => {
    try {
      if (!keyword.trim()) {
        const res = await api.get("/friends");
        if (res.data.success && Array.isArray(res.data.data)) {
          setFriends(res.data.data);
        }
        return;
      }
      const res = await api.get("/friends/search/my", {
        params: { query: keyword, page: 1, size: 20 },
      });
      if (res.data.success && Array.isArray(res.data.data)) {
        setFriends(res.data.data);
      }
    } catch (error) {
      console.error("친구 검색 실패:", error);
    }
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

        <div className="mt-[60px]" />
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
            <FriendListItem
              key={friend.userId}
              friend={friend}
              onClick={() => openModal(friend.userId)} // 클릭 시 모달 오픈
            />
          ))}
        </div>

        {/* 모달 */}
        {selectedRequestId && (
          <FriendsModal
            isVisible={isModalVisible}
            onClose={closeModal}
            requestId={selectedRequestId}
          />
        )}
      </div>
      <BottomNavBar menu="friend" />
    </>
  );
};

export default FriendPage;
