"use client";
import * as React from "react";

interface GoogleLoginButtonProps {
  text?: string;
  onClick?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  text = "Google로 로그인",
  onClick
}) => {
  return (
    <button
      className="flex relative gap-2 justify-center items-start self-stretch px-2 py-4 mt-96 text-base font-medium text-black border-solid border-[0.5px] border-zinc-900 min-h-[50px] rounded-[100px] hover:bg-gray-50 transition-colors"
      onClick={onClick}
      type="button"
    >
      <span className="z-0 my-auto">
        {text}
      </span>
      <img
        src="https://api.builder.io/api/v1/image/assets/7adddd5587f24b91884c2915be4df62c/f1f54fa5644d9451b6fb75cd57c50e069ee7ac46?placeholderIfAbsent=true"
        alt="Google logo"
        className="object-contain absolute bottom-2.5 left-2.5 z-0 shrink-0 self-start aspect-square h-[30px] w-[30px]"
      />
    </button>
  );
};
