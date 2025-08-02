"use client";
import * as React from "react";

interface MenuBarProps {
  activeTab?: "friends" | "requests";
  onTabChange?: (tab: "friends" | "requests") => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeTab = "friends",
  onTabChange
}) => {
  const handleTabClick = (tab: "friends" | "requests") => {
    onTabChange?.(tab);
  };

  return (
    <nav className="flex items-center w-full text-sm leading-none bg-white" role="tablist">
      <button
        className={`flex gap-2.5 justify-center items-center self-stretch px-2.5 py-3.5 my-auto font-semibold border-solid min-h-[45px] w-[197px] ${
          activeTab === "friends"
            ? "border-b-[3px] border-b-red-500 text-zinc-900"
            : "border-b-[0.5px] border-b-neutral-400 text-stone-700 font-medium"
        }`}
        onClick={() => handleTabClick("friends")}
        role="tab"
        aria-selected={activeTab === "friends"}
        aria-controls="friends-panel"
      >
        <div className="self-stretch my-auto">
          친구 목록
        </div>
      </button>
      <button
        className={`flex gap-2.5 justify-center items-center self-stretch px-2.5 py-3.5 my-auto font-medium border-solid min-h-[45px] w-[197px] ${
          activeTab === "requests"
            ? "border-b-[3px] border-b-red-500 text-zinc-900 font-semibold"
            : "border-b-[0.5px] border-b-neutral-400 text-stone-700"
        }`}
        onClick={() => handleTabClick("requests")}
        role="tab"
        aria-selected={activeTab === "requests"}
        aria-controls="requests-panel"
      >
        <div className="self-stretch my-auto">
          친구 요청
        </div>
      </button>
    </nav>
  );
};
