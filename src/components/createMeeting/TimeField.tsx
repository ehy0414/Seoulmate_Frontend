import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";

interface TimeFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const TimeField: React.FC<TimeFieldProps> = ({ value = '', onChange }) => {
  const selected = value ? new Date(`1970-01-01T${value}:00`) : null;

  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">시간</div>
      <div className="relative flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 h-[45px]">
        <DatePicker
          selected={selected}
          onChange={(date: Date | null) => {
            const formatted = date ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}` : '';
            onChange?.(formatted);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          placeholderText="모임 시간을 선택하세요."
          customInput={<input className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full cursor-pointer text-left placeholder:text-[#D4D0D0]" />}
        />
      </div>
    </div>
  );
};