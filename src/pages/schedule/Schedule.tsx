import { useState, useEffect, useMemo } from 'react';

import CalendarGrid from '../../components/schedule/CalendarGrid';
import ScheduleList from '../../components/schedule/ScheduleList';
import { mockSchedules } from '../../mock/schedule/schedules';
import BottomNavBar from '../../components/common/BottomNavBar';
import TabMenu from '../../components/common/TabMenu';
import NoAlarmBackHeader from '../../components/common/NoAlarmBackHeader';

export interface Schedule {
  id: number;
  img: string;
  title: string;
  place: string;
  date: string; // YYYY-MM-DD
}

export default function Schedule() {
  const todayDate = useMemo(() => new Date(), []);
  const FIRST_TAB = '주최';
  const SECOND_TAB = '참여';

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeTab, setActiveTab] = useState<string>(FIRST_TAB);

  useEffect(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    setSchedules(mockSchedules.filter((s) => s.date === selectedDateStr));
  }, [selectedDate]);

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      <NoAlarmBackHeader title="일정" showBorder={false} />
      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={() => setActiveTab(FIRST_TAB)}
        onSecondTabClick={() => setActiveTab(SECOND_TAB)}
      />
      <CalendarGrid
        schedules={mockSchedules}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
        todayDate={todayDate} 
      />
      <ScheduleList 
        date={selectedDate}       
        schedules={schedules}
      />
      <BottomNavBar menu = 'profile'/>
    </div>
  );
}
