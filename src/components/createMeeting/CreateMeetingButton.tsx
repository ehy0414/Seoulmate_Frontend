import * as React from "react";

interface CreateMeetingButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const CreateMeetingButton: React.FC<CreateMeetingButtonProps> = ({
  onClick,
  disabled = false
}) => {
  return (
    <div className="flex flex-col justify-center mt-[2.7vh] px-[18px] py-4 w-full bg-white min-h-[82px]">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex justify-center text-base items-center w-full rounded-[8px] h-[50px] transition-colors duration-300 ${
          disabled
            ? "bg-black-200 text-black-400 cursor-not-allowed"
            : "bg-primary-600 text-black-100 hover:bg-primary-700"
        }`}
      >
        <div className="self-stretch my-auto">
          모임 개설하기
        </div>
      </button>
    </div>
  );
};
