"use client";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { ActionButton } from "../../components/home/ActionButton";
import { MeetingInfo } from "../../components/home/club/MeetingInfo";
import { ParticipantsList } from "../../components/home/club/ParticpantsList";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";
import { useEffect, useState } from "react";

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
  max_participants: number;
  current_participants: number;
  host_message: string;
  price: number;
}

interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

export const ClassDetailPage: React.FC<MeetingDetailPageProps> = ({}) => {
  const [club, setClub] = useState<Club | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getClub = async () => {
    try {
      // 모임 정보 가져오기
      const clubRes = await api.get(`/meetings/official/${id}`);
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

  if (!club) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">존재하지 않는 클럽입니다.</p>
      </main>
    );
  }

    console.log(club);

  return (
    <>
      <main className="flex flex-col items-center mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderDetail title={club.title} onBackClick={() => navigate(-1)} />

        <MeetingInfo
          title={club.title}
          hobby={club.type}
          location={club.location}
          datetime={`${club.meeting_day} ${club.start_time}`}
          price={club.price === 0 ? "무료" : `${club.price}원`}
          description={club.host_message}
          imageUrls={[club.image]}
          type="class"
        />

        <div className="top-[580px] w-full px-4">
          <ParticipantsList
            participants={participants}
            maxParticipants={club.max_participants}
            minParticipants={0}
            type="class"
          />
        </div>

        <ActionButton
          text="참여하기"
          disabled={participants.length >= club.max_participants}
          meetingId={club.id}
          type="class"
        />
      </main>
    </>
  );
};

export default ClassDetailPage;
