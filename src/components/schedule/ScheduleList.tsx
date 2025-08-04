import type { Schedule } from "../../pages/schedule/Schedule";
import ScheduleItem from "../../components/schedule/ScheduleItem";

interface Props {
  date: Date;
  schedules: Schedule[];
}

export default function ScheduleList({ date, schedules }: Props) {
  const displayDate = new Date(date);
  const month = displayDate.getMonth() + 1;
  const day = displayDate.getDate();

  return (
    <div className="px-4 mt-6">
      <div className="text-base mb-4">
        {month}월 {day}일의 일정
      </div>

      {schedules.length === 0 ? (
        <div className="flex justify-center items-center h-[96px] p-2 bg-black-100 border border-black-400 rounded-md shadow-sm text-black-600 text-sm">
          오늘은 일정이 없어요!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {schedules.map((schedule) => (
            <ScheduleItem key={schedule.id} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  );
}
