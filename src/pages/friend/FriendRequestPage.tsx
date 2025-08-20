import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import RequestUserListItem from "../../components/friend/request/RequestUserListItem";
import BottomNavBar from "../../components/common/BottomNavBar";
import { FriendsModal } from "../../components/modal/FriendsModal";
import TabMenu from "../../components/common/TabMenu";

import { requests } from '../../mock/friend/requests';
import type { FriendRequest } from '../../components/friend/request/RequestUserListItem';

export const FriendRequestPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const FIRST_TAB = "주최";
  const SECOND_TAB = "참여";
  const [activeTab, setActiveTab] = useState<string>(SECOND_TAB);

  const navigate = useNavigate();

  const onFirstTabClick = () => {
    setActiveTab(FIRST_TAB);
    navigate("/friend");
  };

  const onSecondTabClick = () => {
    setActiveTab(SECOND_TAB);
    navigate("/friend/request");
  };

  const [list, setList] = useState<FriendRequest[]>(requests);

  const handleAccept = (req: FriendRequest) => {
    alert(`${req.name} 님의 친구 요청을 수락하시겠습니까?`);
    setList((prev) => prev.filter((r) => r.requestId !== req.requestId)); // 즉시 제거
    // TODO: 수락 API 호출 위치
  };

  const handleDelete = (req: FriendRequest) => {
    alert(`${req.name} 님의 친구 요청을 거절하시겠습니까?`);
    setList((prev) => prev.filter((r) => r.requestId !== req.requestId)); // 즉시 제거
    // TODO: 거절 API 호출 위치
  };

  return (
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      {/* 헤더 높이 보정 */}
      <div className="mt-[60px]" />

      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={onFirstTabClick}
        onSecondTabClick={onSecondTabClick}
      />

      <section className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl">
          <ul className="divide-y rounded-xl bg-white">
            {list.map((request) => (
              <RequestUserListItem
                key={request.requestId}
                request={request}
                onAccept={handleAccept}
                onReject={handleDelete}
              />
            ))}

            {list.length === 0 && (
              <li className="p-8 text-center text-gray-500">
                처리할 친구 요청이 없습니다.
              </li>
            )}
          </ul>
        </div>

        <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
      </section>

      <BottomNavBar menu="friend" />
    </main>
  );
};

export default FriendRequestPage;