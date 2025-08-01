"use client";
import * as React from "react";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { ActionButton } from "../../components/home/ActionButton";
import { MeetingInfo } from "../../components/home/club/MeetingInfo";
import image1 from "../../components/home/club/image.png";
import image2 from "../../components/home/club/image2.png";
import { ParticipantsList } from "../../components/home/club/ParticpantsList";

interface MeetingDetailPageProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  onJoinClick?: () => void;
}

export const ClubDetailPage: React.FC<MeetingDetailPageProps> = ({
  onBackClick,
  onNotificationClick,
  onJoinClick
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

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    <main className="flex flex-col items-center px-6 mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderDetail
          title="한국어 기초 클래스"
          onBackClick={onBackClick}
          onNotificationClick={onNotificationClick}
        />

        <MeetingInfo
            title="한국어 기초 클래스"
            hobby="취미명"
            location="스타벅스 숭실대점"
            datetime="7/28 18:00"
            price="20,000원"
            description="한국어 기초 클래스입니다.
                        이번 주는 스타벅스 숭실대점에서 만나요!
                        한국어를 편하게 알려드릴게요!."
            imageUrls={[
                image1,
                "https://api.builder.io/api/v1/image/assets/TEMP/69fcfc725ba28ecd840a947076aa7d0a62038622?width=786",
                image2,
            ]}          
        />

        <div className=" left-5 top-[580px] w-full ">
          <ParticipantsList 
            participants={participants} 
            maxParticipants={10} // 예: 최대 10명
            />
        </div>

        <ActionButton
          text="참여하기"
          onClick={onJoinClick}
          disabled={participants.length >= 10}
        />
      </main>
    </>
  );
};

export default ClubDetailPage;
