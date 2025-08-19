// "use client";

import * as React from "react";
import { useState } from "react";
// import { MenuBar } from "../../components/friend/MenuBar";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import { RequestUserListItem } from "../../components/friend/request/RequestUserListItem";
import BottomNavBar from "../../components/common/BottomNavBar";
import { FriendsModal } from "../../components/modal/FriendsModal";
import TabMenu from '../../components/common/TabMenu';

interface FriendRequest {
  id: string;
  name: string;
}

interface FriendRequestListProps {
  requests?: FriendRequest[];
  onDeleteRequest?: (id: string) => void;
  onAcceptRequest?: (id: string) => void;
}

export const FriendRequestPage: React.FC<FriendRequestListProps> = ({
  requests = [
    { id: "1", name: "name" },
    { id: "2", name: "name" },
    { id: "3", name: "name" },
    { id: "4", name: "name" },
  ],
  onDeleteRequest,
  onAcceptRequest,
}) => {
  // const [activeTab, setActiveTab] = React.useState<"friends" | "requests">("requests");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
    const FIRST_TAB = '주최';
    const SECOND_TAB = '참여';
    const [activeTab, setActiveTab] = useState<string>(SECOND_TAB);

  const handleDeleteRequest = (id: string) => {
    onDeleteRequest?.(id);
  };

  const handleAcceptRequest = (id: string) => {
    onAcceptRequest?.(id);
  };

  return (
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      <div className="mt-[60px]"></div>
      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={() => setActiveTab(FIRST_TAB)}
        onSecondTabClick={() => setActiveTab(SECOND_TAB)}
      />

        <section className="flex flex-col items-start h-60 w-full mt-10">
            {requests.map((request) => (
            <RequestUserListItem
                key={request.id}
                name={request.name}
                onDelete={() => handleDeleteRequest(request.id)}
                onAccept={() => handleAcceptRequest(request.id)}
                onClick={openModal}
            />
            ))}

            <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
        </section>

        <BottomNavBar menu='friend'/>
    </main>
  );
};

export default FriendRequestPage;
