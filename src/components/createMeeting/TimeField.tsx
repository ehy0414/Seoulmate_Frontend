import * as React from "react";

interface TimeFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const TimeField: React.FC<TimeFieldProps> = ({
  value = '',
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">
        시간
      </div>
      <div className="flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 h-[45px]">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="모임 시간을 선택하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
        />
      </div>
    </div>
  );
};
