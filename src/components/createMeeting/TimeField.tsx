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
      <div className="relative flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 h-[45px]">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full cursor-pointer"
          style={{
            colorScheme: 'light',
            color: value ? '#1a1a1a' : 'transparent',
          }}
        />
        {/* Placeholder가 값이 없을 때만 표시 */}
        {!value && (
          <div className="absolute left-4 pointer-events-none text-black-300 text-sm">
            모임 시간을 선택하세요.
          </div>
        )}
      </div>
    </div>
  );
};
