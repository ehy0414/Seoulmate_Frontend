"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButtons } from "./ActionButton";
import { HobbyChips } from "./HobbyChips";
import { InfoCard } from "./InfoCard";
import { ProfileHeader } from "./ProfileHeader";
import FriendRequestModal from "./FriendRequestModal";
import api from "../../services/axios";

interface FriendsProps {
  requestId: number;
}

interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

interface FriendDetail {
  userId: number;
  name: string;
  profileImage: string;
  bio: string;
  university: string;
  age: number;
  country: string;
  languageLevels: Record<string, number>;
  hobbyList: string[];
  relation?: "NONE" | "FRIEND" | "REQUEST_SENT"; 
}

interface ChatRoom {
  roomId: number;
  title: string;
  roomImageUrl: string;
  type: string;
  myUserId: number;
  participants: {
    userId: number;
    name: string;
    profileImageUrl: string;
    role: string;
    me: boolean;
  }[];
}

function Friends({ requestId }: FriendsProps) {
  const navigate = useNavigate();
  const [friendData, setFriendData] = useState<FriendDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await api.get<ApiResponse<FriendDetail>>(`/friends/${requestId}`);
        setFriendData(res.data.data);
      } catch (err) {
        console.error("친구 정보 불러오기 실패", err);
      }
    };
    fetchFriend();
  }, [requestId]);

  if (!friendData) return <div className="p-4">불러오는 중…</div>;

  const flagSrc = `/country/${friendData.country.toUpperCase()}.gif`;

  let friendRequestText = "친구 신청";
  let isDisabled = false;

  if (friendData.relation === "FRIEND") {
    friendRequestText = "친구입니다";
    isDisabled = true;
  } else if (friendData.relation === "REQUEST_SENT") {
    friendRequestText = "친구 요청중...";
    isDisabled = true;
  }

  const handleSendMessage = async () => {
    try {
      const res = await api.post<ApiResponse<ChatRoom>>(
        "/chat/room/onetoone",
        { partnerUserId: requestId }
      );
      const { roomId, title } = res.data.data;
      navigate(`/chat?roomId=${roomId}&name=${encodeURIComponent(title)}`);
    } catch (err) {
      console.error("1:1 채팅방 생성 실패", err);
      alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="flex flex-col justify-end items-start w-full max-w-[clamp(360px,100vw,430px)]">
      <div className="flex relative flex-col gap-6 items-end self-stretch px-5 pt-14 pb-4 bg-white rounded-[24px_24px_0_0] overflow-y-auto ">
        <div className="flex flex-col gap-5 items-start self-stretch">
          <ProfileHeader
            profileImage={friendData.profileImage}
            name={friendData.name}
            description={friendData.bio}
            flagSrc={flagSrc}
            userId={friendData.userId}
          />
          <HobbyChips hobbies={friendData.hobbyList} />
        </div>
        <InfoCard
          items={[
            { label: "학교", value: friendData.university },
            { label: "나이", value: `${friendData.age}세` },
            ...Object.entries(friendData.languageLevels).map(([lang, level]) => ({
              label: `${lang} 구사 레벨`,
              value: `${level}`,
            })),
          ]}
        />
        <ActionButtons
          onFriendRequest={() =>
            friendData.relation === "NONE" ? setIsModalOpen(true) : undefined
          }
          onSendMessage={handleSendMessage}
          friendRequestText={friendRequestText}
          sendMessageText="메시지 보내기"
          isFriend={friendData.relation === "FRIEND"}
          isDisabled={isDisabled}
        />
      </div>

      {isModalOpen && (
        <FriendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={async () => {
            setFriendData((prev) =>
              prev ? { ...prev, relation: "REQUEST_SENT" } : prev
            );
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          friendName={friendData.name}
          id={friendData.userId}
        />
      )}
    </main>
  );
}

export default Friends;
