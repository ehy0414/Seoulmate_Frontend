import type { Schedule } from '../../pages/schedule/Schedule';
import leftArrow from '../../assets/schedule/left-arrow.png';
import rightArrow from '../../assets/schedule/right-arrow.png';

interface Props {
  schedules: Schedule[];
  selectedDate: string;
  onDateClick: (date: string) => void;
}

export default function CalendarGrid({ schedules, selectedDate, onDateClick }: Props) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); 

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = startOfMonth.getDay(); // 요일: 0(일) ~ 6(토)
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const totalCells = 42; // 6주
  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = 0; i < totalCells; i++) {
    const dayOffset = i - startDay + 1;
    let date: Date;
    let isCurrentMonth = true;

    if (dayOffset <= 0) { // 이전 달
      date = new Date(currentYear, currentMonth - 1, daysInPrevMonth + dayOffset);
      isCurrentMonth = false;
    } else if (dayOffset > daysInCurrentMonth) { // 다음 달
      date = new Date(currentYear, currentMonth + 1, dayOffset - daysInCurrentMonth);
      isCurrentMonth = false;
    } else { // 이번 달
      date = new Date(currentYear, currentMonth, dayOffset);
    }

    calendarDays.push({ date, isCurrentMonth });
  }

  const getDateString = (date: Date) =>
    date.toISOString().split('T')[0];

  const hasSchedule = (date: Date) =>
    schedules.some((s) => s.date === getDateString(date));

  const isSelected = (date: Date) =>
    selectedDate === getDateString(date);

  const isToday = (date: Date) =>
    today.toISOString().split('T')[0] === getDateString(date);

  return (
    <div className="px-4 mt-4">
      <div className="flex justify-between items-center text-[24px] font-bold px-4 py-4">
        <button>
          <img src={leftArrow} alt="Previous Month" className="w-[24px] h-[24px]" />
        </button>
        <span>{`${currentYear}. ${currentMonth + 1}.`}</span>
        <button>
          <img src={rightArrow} alt="Next Month" className="w-[24px] h-[24px]" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center mt-2 text-black-400 text-sm">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-base mt-2">
        {calendarDays.map(({ date, isCurrentMonth }, i) => {
          const day = date.getDate();
          const dateStr = getDateString(date);
          const selected = isSelected(date);
          const todayMark = isToday(date);
          const scheduled = hasSchedule(date);

          return (
            <button
              key={i}
              onClick={() => onDateClick(dateStr)}
              className="relative w-full h-[60px] mt-[4px] aspect-square flex justify-center border-b border-black"
            >
              <div
                className={`
                  w-[30px] h-[30px] flex items-center justify-center rounded-full
                  ${selected ? 'bg-primary-500 text-white' : ''}
                  ${!selected && todayMark ? 'bg-black-600 text-white' : ''}
                  ${!selected && !todayMark && !isCurrentMonth ? 'text-black-300' : ''}
                `}
              >
                {day}
              </div>
              {scheduled && (
                <div className="absolute bottom-[11px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-yellow-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
