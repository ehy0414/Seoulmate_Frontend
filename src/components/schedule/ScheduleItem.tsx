import type { Schedule } from '../../pages/schedule/Schedule';

interface Props {
  schedule: Schedule;
}

export default function ScheduleItem({ schedule }: Props) {
  return (
    <div className="flex items-center gap-3 p-3 border border-black-200 rounded-lg shadow-sm">
      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-black-100 rounded-md">
        {schedule.img}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{schedule.title}</div>
        <div className="text-xs text-black-400">{schedule.place}</div>
        <div className="text-xs text-black-400">{schedule.date}</div>
      </div>
      <div
        className={`text-xs px-2 py-1 rounded-full ${
          schedule.isConfirmed
            ? 'bg-primary-700 text-white'
            : 'border border-black-300 text-black-400'
        }`}
      >
        {schedule.isConfirmed ? '확정' : '미확정'}
      </div>
    </div>
  );
}
