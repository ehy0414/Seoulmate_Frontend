import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";
import { format } from "date-fns"; // date-fns v3+ (2025 기준, lightweight 포맷팅 추천)
import {ko} from "date-fns/locale"; // 한국어 로케일 추가

interface DateFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({ value = '', onChange }) => {
  const selected = value ? new Date(value) : null;

  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">날짜</div>
      <div className="relative flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
        <DatePicker
          selected={selected}
          onChange={(date: Date | null) => {
            const formatted = date ? format(date, "yyyy-MM-dd") : ''; // date-fns로 안전 포맷
            onChange?.(formatted);
          }}
          dateFormat="yyyy-MM-dd"
          placeholderText="모임 날짜를 입력하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full cursor-pointer text-left"
          locale={ko} // 한국어 로케일 적용
          customInput={<input className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full cursor-pointer text-left placeholder:text-[#D4D0D0]" />}
        />
      </div>
    </div>
  );
};