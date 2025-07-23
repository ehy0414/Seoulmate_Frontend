"use client";
import * as React from "react";
import { GoogleLoginButton } from "../components/signup/googleLogin/GoogleLoginButton";
import { AppTitle } from "../components/signup/googleLogin/AppTitle";

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
    <main className="box-border border border-gray-200 flex overflow-hidden flex-col items-center px-6 pt-6 pb-2 mx-auto w-full h-screen bg-white max-w-[480px]">
      <AppTitle />
      <GoogleLoginButton onClick={handleGoogleLogin} />
    </main>
  );
};

export default SignUpPage;
