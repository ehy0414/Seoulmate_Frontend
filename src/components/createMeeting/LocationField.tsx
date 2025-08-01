import * as React from "react";

interface LocationFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const LocationField: React.FC<LocationFieldProps> = ({
  value = '',
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-zinc-900">
        장소
      </div>
      <div className="flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="모임 장소를 입력하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
        />
      </div>
    </div>
  );
};
