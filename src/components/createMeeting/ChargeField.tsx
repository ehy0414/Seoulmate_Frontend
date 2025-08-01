import * as React from "react";

interface ChargeFieldProps {
  value?: number | null;
  onChange?: (value: number| null) => void;
}

export const ChargeField: React.FC<ChargeFieldProps> = ({
  value = null,
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">
        참가비
      </div>
      <div className="flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
        <input
          type="number"
          value={value ?? ''}
            onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue === '') {
              onChange?.(null); // 빈 값일 때 null 전달
            } else {
              onChange?.(Number(inputValue));
            }
          }}
          placeholder="모임에서 받을 참가비를 입력하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
        />
      </div>
    </div>
  );
};
