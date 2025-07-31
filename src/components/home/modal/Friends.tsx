"use client";

import { ActionButtons } from "./ActionButton";
import { HobbyChips } from "./HobbyChips";
import { InfoCard } from "./InfoCard";
import { ProfileHeader } from "./ProfileHeader";


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
  return (
    <main className="flex flex-col justify-end items-start h-[688px] w-full max-w-[clamp(360px,100vw,430px)]">
      <div className="flex relative flex-col gap-6 items-end self-stretch px-5 pt-14 pb-4 bg-white rounded-[24px_24px_0_0] max-md:px-4 max-md:pt-10 max-md:pb-4 max-sm:gap-5 max-sm:px-3 max-sm:pt-8 max-sm:pb-3">

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
          onFriendRequest={onFriendRequest}
          onSendMessage={onSendMessage}
          friendRequestText={friendRequestText}
          sendMessageText={sendMessageText}
        />
      </div>
    </main>
  );
}

export default Friends;
