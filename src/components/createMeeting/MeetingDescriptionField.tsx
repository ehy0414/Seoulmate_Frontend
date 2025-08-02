import * as React from "react";

interface MeetingDescriptionFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const MeetingDescriptionField: React.FC<MeetingDescriptionFieldProps> = ({
  value = '',
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium">
      <div className="leading-none text-black-700">
        모임 소개
      </div>
      <div className="flex items-center px-4 py-2.5 mt-2 w-full leading-5 rounded-[8px] border border-solid bg-black-100 border-black-700 text-black-300">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="모임에 어울리는 소개글을 작성하세요."
          className="self-stretch text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300 resize-none min-h-[57px]"
        />
      </div>
    </div>
  );
};
