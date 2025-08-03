import type { Schedule } from '../../pages/schedule/Schedule';

interface Props {
  schedules: Schedule[];
  selectedDate: string;
  onDateClick: (date: string) => void;
}

export default function CalendarGrid({ schedules, selectedDate, onDateClick }: Props) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); 

  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


  const getDateString = (d: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  const hasSchedule = (d: number) =>
    schedules.some((s) => s.date === getDateString(d));

  const isSelected = (d: number) =>
    selectedDate === getDateString(d);

  const isToday = (d: number) => {
    const todayStr = today.toISOString().split('T')[0];
    return todayStr === getDateString(d);
  };

  return (
    <div className="px-4 mt-4">
      <div className="text-center text-xl font-bold">{`${currentYear}. ${currentMonth + 1}.`}</div>
      <div className="grid grid-cols-7 text-center mt-2 text-black-400 text-sm">
        {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-base mt-2">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getDateString(day);
          return (
            <button
              key={day}
              onClick={() => onDateClick(dateStr)}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              <div
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full
                  ${isSelected(day) ? 'bg-primary-500 text-white' : ''}
                  ${isToday(day) && !isSelected(day) ? 'bg-black-600 text-white' : ''}
                `}
              >
                {day}
              </div>
              {hasSchedule(day) && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
