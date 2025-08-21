"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import { HeaderSeoulmate } from '../../components/common/HeaderSeoulmate';
import { ClubMiniCard } from '../../components/home/club/ClubMiniCard';
import { ClubCard } from '../../components/home/club/ClubCard';
import { SectionHeader } from '../../components/home/SectionHeader';
import { ScrollableCardList } from '../../components/home/ScrollableCardList';
import { CategoryGrid } from '../../components/home/category/CategoryGrid';
import BottomNavBar from '../../components/common/BottomNavBar';

interface Club {
  id: number;
  image: string;
  title: string;
  place: string;
  date: string;
  startTime?: string;
  type?: string;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [recommendedClubs, setRecommendedClubs] = useState<Club[]>([]);
  const [koreanClasses, setKoreanClasses] = useState<Club[]>([]);
  const [regularMeeting, setRegularMeeting] = useState<Club | null>(null);

  const AllClubs = async () => {
    try {
      const response = await api.get("/home");
      const data = response.data.data;

      // 추천 모임
      setRecommendedClubs(
        (data.recommendedMeetings ?? []).map((club: any) => ({
          ...club,
          place: club.place || club.location || "장소 미정",
          date: club.meeting_day ? `${club.meeting_day} ${club.start_time ?? ""}` : "날짜 미정",
          startTime: club.start_time
        }))
      );

      // 한국어 클래스
      setKoreanClasses(
        (data.koreanClasses ?? []).map((klass: any) => ({
          ...klass,
          place: klass.location || "장소 미정",
          date: klass.meeting_day ? `${klass.meeting_day} ${klass.start_time ?? ""}` : "날짜 미정",
          startTime: klass.start_time
        }))
      );

      // 정기 모임
      if (data.regularMeeting) {
        setRegularMeeting({
          ...data.regularMeeting,
          place: data.regularMeeting.place || data.regularMeeting.location || "장소 미정",
          date: data.regularMeeting.meeting_day ? `${data.regularMeeting.meeting_day} ${data.regularMeeting.start_time ?? ""}` : "날짜 미정",
          startTime: data.regularMeeting.start_time
        });
      } else {
        setRegularMeeting(null);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setRecommendedClubs([]);
      setKoreanClasses([]);
      setRegularMeeting(null);
    }
  };

  useEffect(() => {
    AllClubs();
  }, [navigate]);

  return (
    <main className="flex flex-col items-center px-[18px] mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
      <HeaderSeoulmate title="서울메이트" alarm={true}/>

      <div className="flex left-0 flex-col gap-7 items-center py-5 top-[203px] w-full">
        {regularMeeting && (
          <ClubMiniCard
            key={regularMeeting.id}
            image={regularMeeting.image}
            title={regularMeeting.title}
            place={regularMeeting.place}
            date={regularMeeting.date}
            altText={regularMeeting.title}
            onClick={() => navigate(`/class/${regularMeeting.id}`)}
          />
        )}

        <section className="flex flex-col gap-5 items-start self-stretch py-0 w-full">
          <SectionHeader title="추천 모임" />
          <ScrollableCardList>
            {recommendedClubs.map((club) => (
              <ClubCard
                key={club.id}
                image={club.image}
                title={club.title}
                place={club.place}
                date={club.date}
                altText={club.title}
                id={club.id}
                onClick={() => navigate(`/club/${club.id}`)}
              />
            ))}
          </ScrollableCardList>
        </section>

        <section className="flex flex-col gap-5 justify-center w-full items-start self-stretch py-0">
          <SectionHeader title="우리학교 모임" />
          <CategoryGrid />
        </section>

        <section className="flex flex-col gap-5 items-start self-stretch py-0 w-full">
          <SectionHeader title="한국어 클래스" />
          <ScrollableCardList>
            {koreanClasses.map((klass) => (
              <ClubCard
                key={klass.id}
                image={klass.image}
                title={klass.title}
                place={klass.place}
                date={klass.date}
                altText={klass.title}
                id={klass.id}
                onClick={() => navigate(`/class/${klass.id}`)}
              />
            ))}
          </ScrollableCardList>
        </section>

        <BottomNavBar menu='home'/>
      </div>
    </main>
  );
};

export default HomePage;
