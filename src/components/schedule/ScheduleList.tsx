import type { Schedule }from "../../pages/schedule/Schedule";
import ScheduleItem from "../../components/schedule/ScheduleItem";

interface Props {
  date: string;
  schedules: Schedule[];
}

export default function ScheduleList({ date, schedules }: Props) {
  return (
    <div className="px-4 mt-6">
      <div className="text-base font-semibold mb-4">
        {new Date(date).getMonth() + 1}월 {new Date(date).getDate()}일의 일정
      </div>
      <div className="flex flex-col gap-3">
        {schedules.map((schedule) => (
          <ScheduleItem key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </div>
  );
}
