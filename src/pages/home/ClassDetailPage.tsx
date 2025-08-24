"use client";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import { ActionButton } from "../../components/home/ActionButton";
import { MeetingInfo } from "../../components/home/club/MeetingInfo";
import { ParticipantsList } from "../../components/home/club/ParticpantsList";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/signup/langTest/Spinner";

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
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const getClub = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClub();
  }, [id]);

  const isJoined = participants.some((p) => p.id === userId);

  return (
    <>
    {loading ? (
        <div className="flex justify-center items-center pt-[200px]">
            <Spinner text="모임을 가져오는 중입니다" />
        </div>
    ) : !club ? (
        <div className="w-full flex flex-col items-center justify-center gap-6 pt-[211px]">
            <span className="text-2xl text-[#000] font-[600]">존재하지 않는 모임입니다.</span>
        </div>
    ) : (
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
            text={isJoined ? "이미 참여중" : "참여하기"}
            disabled={isJoined || participants.length >= club.max_participants}
            meetingId={club.id}
            type="class"
            club={club}
          />
        </main>
        )}
    </>
  );
};

export default ClassDetailPage;
