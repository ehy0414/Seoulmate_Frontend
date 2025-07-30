"use client";
import * as React from "react";
import { AppTitle } from "../components/signup/googleLogin/AppTitle";
import GoogleLoginButton from "../components/signup/googleLogin/GoogleLoginButton";

interface LoginScreenProps {
  onGoogleLogin?: () => void;
}

export const SignUpPage: React.FC<LoginScreenProps> = ({ onGoogleLogin }) => {
  const handleGoogleLogin = () => {
    if (onGoogleLogin) {
      onGoogleLogin();
    } else {
      // Default behavior - could integrate with actual Google OAuth
      console.log("Google login clicked");
    }
  };

  return (
    <main className="flex overflow-hidden flex-col items-center px-6 pt-6 pb-2 mx-auto w-full h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
      <AppTitle />
      <GoogleLoginButton />
    </main>
  );
};

export default SignUpPage;
