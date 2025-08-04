import { useState, useEffect } from 'react';

import CalendarGrid from '../../components/schedule/CalendarGrid';
import ScheduleList from '../../components/schedule/ScheduleList';
import { mockSchedules } from '../../mock/schedule/schedules';

export interface Schedule {
  id: number;
  img: string;
  title: string;
  place: string;
  date: string; // YYYY-MM-DD
  isConfirmed: boolean;
}

export default function Schedule() {
  const todayDate = new Date(); 

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    setSchedules(mockSchedules.filter((s) => s.date === selectedDateStr));
  }, [selectedDate]);
  

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
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

      <button className="absolute bottom-6 right-6 bg-primary-700 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg">
        +
      </button>
    </div>
  );
}
