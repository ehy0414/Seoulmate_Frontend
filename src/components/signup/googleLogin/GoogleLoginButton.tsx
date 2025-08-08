"use client";
import * as React from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate, type NavigateFunction } from "react-router-dom";

interface GoogleLoginButtonProps {
  text?: string;
}

const CustomGoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  text = "Google로 로그인",
}) => {
  const navigate: NavigateFunction = useNavigate();

  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log("Token response:", tokenResponse);

  //     const accessToken = tokenResponse.access_token;

  //     try {
  //       const res = await fetch("/api/auth/google", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ accessToken }),
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to authenticate");
  //       }

  //       navigate("/signUp/profile");
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //     }
  //   },
  //   onError: () => {
  //     console.error("Login Failed");
  //   },
  // });

  return (
    <button
      className="flex relative gap-2 justify-center items-start self-stretch px-2 py-4 mt-96 text-base font-bold text-black border-solid border-[0.5px] border-zinc-900 min-h-[50px] rounded-[100px] hover:bg-gray-50 transition-colors"
      onClick={() => navigate("signUp/profile")}
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

// 외부에서 사용할 때는 Provider 포함시켜야 함
const GoogleLoginWrapper = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <CustomGoogleLoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginWrapper;
