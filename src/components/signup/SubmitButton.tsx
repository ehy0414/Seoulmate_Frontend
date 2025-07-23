import * as React from "react";

interface SubmitButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = "다음",
  onClick,
  disabled = false
}) => {
  return (
    <div className="flex flex-col justify-center px-5 py-4 mt-14  w-full text-base font-medium whitespace-nowrap bg-white text-zinc-50">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex justify-center mx-auto items-center w-[357px] bg-primary-600 hover:bg-primary-700 rounded-md min-h-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="self-stretch my-auto text-zinc-50">
          {text}
        </span>
      </button>
    </div>
  );
};
