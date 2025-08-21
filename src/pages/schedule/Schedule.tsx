import { useState, useEffect, useMemo } from 'react';

import CalendarGrid from '../../components/schedule/CalendarGrid';
import ScheduleList from '../../components/schedule/ScheduleList';
import BottomNavBar from '../../components/common/BottomNavBar';
import TabMenu from '../../components/common/TabMenu';
import NoAlarmBackHeader from '../../components/common/NoAlarmBackHeader';

import api from '../../services/axios';

export interface Schedule {
  id: number;
  img: string;  
  title: string;
  place: string;
  date: string; 
}

type Meeting = {
  meetingId: number;
  image: string;
  title: string;
  location: string;
  meetingDay: [number, number, number]; // [yyyy, M, d]
  meetingType: 'OFFICIAL' | 'PRIVATE';
  startTime: [number, number]; // [HH, mm]
};

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export default function Schedule() {
  const todayDate = useMemo(() => new Date(), []);
  const FIRST_TAB = '주최';
  const SECOND_TAB = '참여';

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeTab, setActiveTab] = useState<string>(FIRST_TAB);

  // YYYY-MM-DD 포맷 변환 유틸
  const toYmd = (y: number, m: number, d: number) => {
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const mapToSchedules = (meetings: Meeting[]): Schedule[] =>
    meetings.map((m) => ({
      id: m.meetingId,
      img: m.image,         
      title: m.title,
      place: m.location,
      date: toYmd(m.meetingDay[0], m.meetingDay[1], m.meetingDay[2]),
    }));

  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;

  const fetchHostedSchedules = async () => {
    try {
      const res = await api.get<ApiResponse<Meeting[]>>(`/my-page/hosted`, {
        params: { year, month },
      });
      setSchedules(mapToSchedules(res.data.data));
    } catch (err) {
      console.error('Failed to fetch hosted schedules:', err);
      setSchedules([]); 
    }
  };

  const fetchParticipatedSchedules = async () => {
    try {
      const res = await api.get<ApiResponse<Meeting[]>>(`/my-page/participated`, {
        params: { year, month },
      });
      setSchedules(mapToSchedules(res.data.data));
    } catch (err) {
      console.error('Failed to fetch participated schedules:', err);
      setSchedules([]);
    }
  };

  useEffect(() => {
    fetchHostedSchedules();
  }, []);

  const onFirstTabClick = () => {
    setActiveTab(FIRST_TAB);
    fetchHostedSchedules();
  };
  const onSecondTabClick = () => {
    setActiveTab(SECOND_TAB);
    fetchParticipatedSchedules();
  };

  // 선택된 날짜(YYYY-MM-DD)와 일치하는 일정만 리스트로 표시
  const selectedDateStr = useMemo(
    () => selectedDate.toISOString().split('T')[0],
    [selectedDate]
  );
  const filteredSchedules = useMemo(
    () => schedules.filter((s) => s.date === selectedDateStr),
    [schedules, selectedDateStr]
  );

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      <NoAlarmBackHeader title="일정" showBorder={false} />
      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={onFirstTabClick}
        onSecondTabClick={onSecondTabClick}
      />

      {/* 달력은 전체 schedules로 표시(점/강조 등) */}
      <CalendarGrid
        schedules={schedules}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
        todayDate={todayDate}
      />

      {/* 리스트는 선택된 날짜만 필터링된 데이터 */}
      <ScheduleList
        date={selectedDate}
        schedules={filteredSchedules}
      />

      <BottomNavBar menu="profile" />
    </div>
  );
}
