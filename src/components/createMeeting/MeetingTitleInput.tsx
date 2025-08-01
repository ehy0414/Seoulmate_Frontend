import * as React from "react";

interface MeetingTitleInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const MeetingTitleInput: React.FC<MeetingTitleInputProps> = ({
  value = '',
  onChange
}) => {
  return (
    <div className="flex gap-2.5 items-center px-1 py-4 w-full text-2xl border-b border-solid border-b-stone-300 text-black-300">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="모임 제목을 입력하세요."
        className="my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300 text-2xl"
      />
    </div>
  );
};
