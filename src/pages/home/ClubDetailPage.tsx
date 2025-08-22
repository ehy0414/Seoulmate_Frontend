"use client";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { ActionButton } from "../../components/home/ActionButton";
import { MeetingInfo } from "../../components/home/club/MeetingInfo";
import { ParticipantsList } from "../../components/home/club/ParticpantsList";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";
import { useEffect, useState } from "react";
import Info from "../../components/home/class/Info";

interface MeetingDetailPageProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  onJoinClick?: () => void;
}

interface Club {
  id: number;
  type: string;
  image: string;
  title: string;
  location: string;
  meeting_day: string;
  start_time: string;
  min_participants: number;
  max_participants: number;
  current_participants: number;
  host_message: string;
  price: number;
  hobbyCategory: string;
  primaryHobbyName: string;
  language: string;
  host: {
    id: number;
    name: string;
    profile_image: string;
    score: number;
  };
}


interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

// 사설모임 페이지
export const ClubDetailPage: React.FC<MeetingDetailPageProps> = ({}) => {
  const [club, setClub] = useState<Club | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getClub = async () => {
    try {
      // 모임 정보 가져오기
      const clubRes = await api.get(`/meetings/private/${id}`, {
        headers: { userId: id },
      });

      setClub(clubRes.data.data);

      // 참여자 정보 가져오기
      const participantsRes = await api.get(`/meetings/${id}/participants`);
      const participantsData = participantsRes.data.data.participants;

      // ParticipantsList 에 맞게 변환
      const mapped = participantsData.map((p: any) => ({
        id: String(p.userId),
        nickname: p.name,
        imageUrl: p.profileImageUrl,
      }));

      setParticipants(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClub();
  }, [id]);

  console.log(club);

  if (!club) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">존재하지 않는 클럽입니다.</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col items-center mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderDetail title={club.title} onBackClick={() => navigate(-1)} />

        <MeetingInfo
          title={club.title}
          hobby={club.primaryHobbyName}
          location={club.location}
          datetime={`${club.meeting_day} ${club.start_time}`}
          price={club.price === 0 ? "무료" : `${club.price}원`}
          description={club.host_message}
          imageUrls={[club.image]}
          type="club"
          language={club.language}
          score={club.host.score}
          extraContent={
            <Info 
              hostName={club.host.name}
              hostImage={club.host.profile_image}
              hostId={club.host.id}
            />
          }
        />


        <div className="top-[580px] w-full px-4">
          <ParticipantsList
            participants={participants}
            maxParticipants={club.max_participants}
            minParticipants={club.min_participants}
            type="club"
          />
        </div>

        <ActionButton
          text="참여하기"
          disabled={participants.length >= club.max_participants}
          meetingId={club.id}
          type="club"
          participants={participants}
          club={club}
        />
      </main>
    </>
  );
};

export default ClubDetailPage;
