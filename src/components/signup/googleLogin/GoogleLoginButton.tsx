"use client";
import * as React from "react";

interface GoogleLoginButtonProps {
  text?: string;
}

const CustomGoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  text = "Google로 로그인",
}) => {
  const handleLogin = () => {
    // 로컬 개발용 주소
    //window.location.href = "http://localhost:8080/oauth2/authorization/google";

    // 배포 환경 - 백엔드에서 처리하는 방식으로 채택한 것 같습니다.
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;
  };

  return (
    <button
      className="flex relative gap-2 justify-center items-start self-stretch px-2 py-4 mt-96 text-base font-bold text-black border-solid border-[0.5px] border-zinc-900 min-h-[50px] rounded-[100px] hover:bg-gray-50 transition-colors"
      onClick={handleLogin}
      type="button"
    >
      <span className="z-0 my-auto">{text}</span>
      <img
        src="https://api.builder.io/api/v1/image/assets/7adddd5587f24b91884c2915be4df62c/f1f54fa5644d9451b6fb75cd57c50e069ee7ac46?placeholderIfAbsent=true"
        alt="Google logo"
        className="object-contain absolute bottom-2.5 left-2.5 z-0 shrink-0 self-start aspect-square h-[30px] w-[30px]"
      />
    </button>
  );
};

export default CustomGoogleLoginButton;
