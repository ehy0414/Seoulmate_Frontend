"use client";
import * as React from "react";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { ActionButton } from "../../components/home/ActionButton";
import { MeetingInfo } from "../../components/home/club/MeetingInfo";
import image1 from "../../components/home/club/image.png";
import image2 from "../../components/home/club/image2.png";
import { ParticipantsList } from "../../components/home/club/ParticpantsList";
import { useNavigate, useParams } from "react-router-dom";
import { clubData } from "../../mock/club/mockClubData"; // mock 데이터

interface MeetingDetailPageProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  onJoinClick?: () => void;
}

interface club {
    id: number;
    title: string;
    hobby: string;
    location: string;
    datetime: string;
    price: string;
    description: string;
    imageUrls: string[];
} 

export const ClubDetailPage: React.FC<MeetingDetailPageProps> = ({
}) => {
  const participants = [
    {
      id: "1",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/b13f698dcdd227584cf0fcf49accd676a1fdc9ff?width=80",
      nickname: "닉네임"
    },
    {
      id: "2",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6291d9c5ef5c598f4227f6a632ed45e10b220a66?width=80",
      nickname: "닉네임"
    },
    {
      id: "3",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/8c5bccbd52c19a7c3b9a9916ec632e4f83f2ead3?width=80",
      nickname: "닉네임"
    },
    {
      id: "4",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/95395f2615ce261e3a2a1351121628cd35d51b30?width=80",
      nickname: "닉네임4"
    },
    
    
  ];

  const navigate = useNavigate();
  const { id } = useParams();

  // 문자열로 넘어오는 id를 숫자로 변환
  const club = clubData.find((item) => item.id === Number(id));

  if (!club) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">존재하지 않는 클럽입니다.</p>
    </main>
  );
}

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    <main className="flex flex-col items-center mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderDetail
        title={club.title}
        onBackClick={() => navigate(-1)}
      />

      <MeetingInfo
        title={club.title}
        hobby={club.hobby}
        location={club.location}
        datetime={club.datetime}
        price={club.price}
        description={club.description}
        imageUrls={club.imageUrls}
      />

      <div className="top-[580px] w-full px-4">
        <ParticipantsList 
          participants={participants} 
          maxParticipants={10}
        />
      </div>

      <ActionButton
        text="참여하기"
        onClick={() => console.log("참여 클릭")}
        disabled={participants.length >= 10}
      />
      </main>
    </>
  );
};

export default ClubDetailPage;
