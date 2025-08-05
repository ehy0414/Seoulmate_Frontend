"use client";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 '/friend' 또는 '/friend/request'인지 확인
  const activeTab = location.pathname === "/friend" ? "friends" : "requests";

  const handleTabClick = (tab: "friends" | "requests") => {
    if (tab === "friends") {
      navigate("/friend");
    } else {
      navigate("/friend/request");
    }
  };

  return (
    <nav className="flex items-center w-full text-sm leading-none bg-white" role="tablist">
      <button
        className={`flex gap-2.5 justify-center items-center self-stretch py-3.5 my-auto font-semibold border-solid min-h-[45px] w-1/2 ${
          activeTab === "friends"
            ? "border-b-[3px] border-b-red-500 text-zinc-900"
            : "border-b-[0.5px] border-b-neutral-400 text-stone-700 font-medium"
        }`}
        onClick={() => handleTabClick("friends")}
        role="tab"
        aria-selected={activeTab === "friends"}
      >
        친구 목록
      </button>

      <button
        className={`flex gap-2.5 justify-center items-center self-stretch py-3.5 my-auto font-medium border-solid min-h-[45px] w-1/2 ${
          activeTab === "requests"
            ? "border-b-[3px] border-b-red-500 text-zinc-900 font-semibold"
            : "border-b-[0.5px] border-b-neutral-400 text-stone-700"
        }`}
        onClick={() => handleTabClick("requests")}
        role="tab"
        aria-selected={activeTab === "requests"}
      >
        친구 요청
      </button>
    </nav>
  );
};
