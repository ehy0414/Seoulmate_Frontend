import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      <div className="mt-[60px]"></div>
      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={onFirstTabClick}
        onSecondTabClick={onSecondTabClick}
      />

        <section className="flex flex-col items-start h-60 w-full">
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
