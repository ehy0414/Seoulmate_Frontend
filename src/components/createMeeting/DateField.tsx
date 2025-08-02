import * as React from "react";

interface DateFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({
  value = '',
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">
        날짜
      </div>
      <div className="flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="모임 날짜를 입력하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
        />
      </div>
    </div>
  );
};
