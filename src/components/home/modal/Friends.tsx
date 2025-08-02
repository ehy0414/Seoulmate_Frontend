"use client";

import { useState } from "react";
import { ActionButtons } from "./ActionButton";
import { HobbyChips } from "./HobbyChips";
import { InfoCard } from "./InfoCard";
import { ProfileHeader } from "./ProfileHeader";
import FriendRequestModal from "./FriendRequestModal";


interface FriendsProps {
  profileImage?: string;
  name?: string;
  badge?: string;
  description?: string;
  hobbies?: string[];
  infoItems?: Array<{ label: string; value: string }>;
  onFriendRequest?: () => void;
  onSendMessage?: () => void;
  friendRequestText?: string;
  sendMessageText?: string;
}

function Friends({
  profileImage = "https://api.builder.io/api/v1/image/assets/TEMP/cd641a41ab04e92021e52ca7eff297a2f684bfba?width=200",
  name = "name",
  badge = "nn%",
  description = "자기소개",
  hobbies = [
    "취미명", "취미명", "취미명", "취미명", "취미명",
    "취미명", "취미명", "취미명", "취미명", "취미명"
  ],
  infoItems = [
    { label: "학교", value: "숭실대학교" },
    { label: "나이", value: "22세" },
    { label: "영어 구사 레벨", value: "B1" },
    { label: "한국어 구사 레벨", value: "C2" }
  ],
  onFriendRequest,
  onSendMessage,
  friendRequestText = "친구 신청",
  sendMessageText = "메시지 보내기"
}: FriendsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false); // 친구 신청 버튼 잠금 여부
  const [isPending, setIsPending] = useState(false);       // 친구 요청 보낸 상태
  const [isFriend, setIsFriend] = useState(false); // 친구인지 여부


  const handleFriendRequest = async () => {
    try {
      setIsRequesting(true);  // 버튼 비활성화
      setIsPending(true);     // 친구 요청 보냄 상태

      // 친구 요청 API 호출
      //await axios.post("/api/friend/request", { userId: targetUserId });

      // 실제 친구 수락 여부는 백엔드 이벤트 or 주기적 polling으로 처리
      // 예시로는 친구가 수락했다고 가정하고 일정 시간 뒤 setIsFriend(true)
      // 실무에선 웹소켓이나 polling으로 처리

    } catch (err) {
      console.error("친구 요청 실패", err);
      setIsPending(false);  // 실패했으면 다시 요청 가능하게
    } finally {
      setIsRequesting(false); // 로딩 상태 해제
    }
  };

  const handleUnfriend = async () => {
  try {
    setIsRequesting(true);
    //await axios.delete("/api/friend", { data: { userId: targetUserId } });
    setIsFriend(false);
    setIsPending(false);
  } catch (err) {
    console.error("친구 삭제 실패", err);
  } finally {
    setIsRequesting(false);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRequesting(false); // 다시 활성화
  };
  
  return (
    <main className="flex flex-col justify-end items-start max-w-[clamp(360px,100vw,430px)]">
      <div className="flex relative flex-col gap-6 items-end self-stretch px-5 pt-14 pb-4 bg-white rounded-[24px_24px_0_0] overflow-y-auto ">

        <div className="flex flex-col gap-5 items-start self-stretch">
          <ProfileHeader
            profileImage={profileImage}
            name={name}
            badge={badge}
            description={description}
          />

          <HobbyChips hobbies={hobbies} />
        </div>

        <InfoCard items={infoItems} />

        <ActionButtons
          onFriendRequest={isFriend ? handleUnfriend : () => setIsModalOpen(true)}
          onSendMessage={onSendMessage}
          friendRequestText={isFriend ? "친구 삭제" : (isPending ? "요청 중..." : "친구 신청")}
          sendMessageText={sendMessageText}
          isFriend={isFriend}
          isDisabled={isRequesting || isPending}
        />
      </div>

      {/* 모달 띄우기 */}
      {isModalOpen && (
        <FriendRequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={async () => {
            await handleFriendRequest(); // 친구 요청 로직 실행
            setIsModalOpen(false);
          }}
          onCancel={() => {
            //console.log("친구 신청 취소");
            setIsModalOpen(false);
            setIsRequesting(false);
          }}
          friendName={name} // "톰" 대신 실제 이름으로
        />
      )}

    </main>
  );
}

export default Friends;
