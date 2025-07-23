import * as React from "react";

interface SubmitButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = "다음",
  onClick,
  disabled = false,
}) => {
  return (
    <div className="fixed bottom-0 left-[37%] z-50 bg-white px-5 py-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex justify-center mx-auto items-center w-[357px] bg-primary-600 hover:bg-primary-700 rounded-md min-h-[50px] text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="my-auto">{text}</span>
      </button>
    </div>
  );
};
