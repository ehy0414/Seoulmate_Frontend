"use client";
import * as React from "react";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { MeetingInfo } from "../../components/home/detail/MeetingInfo";
import { ParticipantsList } from "../../components/home/detail/ParticpantsList";
import { ActionButton } from "../../components/home/ActionButton";
import { useNavigate } from "react-router-dom";

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
      nickname: "닉네임"
    },
    {
      id: "5",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/b13f698dcdd227584cf0fcf49accd676a1fdc9ff?width=80",
      nickname: "닉네임"
    },
    {
      id: "6",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/b13f698dcdd227584cf0fcf49accd676a1fdc9ff?width=80",
      nickname: "닉네임"
    },
    {
      id: "7",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6291d9c5ef5c598f4227f6a632ed45e10b220a66?width=80",
      nickname: "닉네임"
    },
    
  ];

export const MeetingDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    <main className="flex flex-col items-center mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderDetail
          title="숭실대 정기모임"
          onBackClick={() => navigate(-1)}
          onNotificationClick={() => navigate("")}
        />

        <MeetingInfo
          title="숭실대 정기모임"
          location="블루힐"
          datetime="7/21 18:00"
          price="15,000원"
          description="숭실대학교 정기모임입니다.
                    이번 주는 학교 앞 블루힐에서 만나요!
                    떡볶이가 진짜 맛있서용."
          imageUrl="https://api.builder.io/api/v1/image/assets/TEMP/69fcfc725ba28ecd840a947076aa7d0a62038622?width=786"
          imageAlt="숭실대 정기모임 이미지"
        />

        <div className=" left-5 top-[580px] w-full px-4">
          <ParticipantsList participants={participants} />
        </div>

        <ActionButton
          text="참여하기"
          onClick={() => navigate("")}
        />
      </main>
    </>
  );
};

export default MeetingDetailPage;
