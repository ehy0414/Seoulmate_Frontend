import { useState, useEffect } from 'react';

import CalendarHeader from '../../components/schedule/CalendarHeader';
import CalendarGrid from '../../components/schedule/CalendarGrid';
import ScheduleList from '../../components/schedule/ScheduleList';

export interface Schedule {
  id: number;
  img: string;
  title: string;
  place: string;
  date: string; // YYYY-MM-DD
  isConfirmed: boolean;
}

const mockSchedules: Schedule[] = [
  {
    id: 1,
    img: '📸',
    title: '스터디 모임',
    place: '스타벅스 강남점',
    date: '2025-07-23',
    isConfirmed: true,
  },
  {
    id: 2,
    img: '🎤',
    title: '회의',
    place: 'Zoom',
    date: '2025-07-23',
    isConfirmed: false,
  },
  {
    id: 3,
    img: '🎉',
    title: '친구 생일파티',
    place: '홍대 술집',
    date: '2025-07-12',
    isConfirmed: true,
  },
];

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    setSchedules(mockSchedules.filter((s) => s.date === selectedDate));
  }, [selectedDate]);

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      <CalendarHeader />
      <CalendarGrid
        schedules={mockSchedules}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />
      <ScheduleList date={selectedDate} schedules={schedules} />

      {/* + 버튼 */}
      <button className="fixed bottom-6 right-6 bg-primary-700 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg">
        +
      </button>
    </div>
  );
}
