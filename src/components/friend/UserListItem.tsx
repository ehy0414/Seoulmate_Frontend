"use client";
import * as React from "react";

interface UserListItemProps {
  name: string;
  percentage: string;
  avatarUrl?: string;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  name,
  percentage,
  avatarUrl
}) => {
  return (
    <div className="flex gap-4 items-center px-5 w-full bg-white border-solid border-b-[0.5px] border-b-neutral-400 min-h-[60px]">
      <div className="flex shrink-0 self-stretch my-auto w-10 h-10 bg-zinc-400 rounded-[100px]" />
      <div className="flex flex-1 shrink gap-3 justify-center items-start self-stretch my-auto basis-0 min-w-60">
        <div className="flex-1 shrink text-base font-medium basis-4 min-w-60 text-zinc-900">
          <div className="text-ellipsis text-zinc-900">
            {name}
          </div>
        </div>
        <div className="flex justify-center items-center px-2 py-1 text-xs font-semibold text-center bg-red-500 rounded-[100px] text-zinc-50">
          <div className="self-stretch my-auto text-zinc-50">
            {percentage}
          </div>
        </div>
      </div>
    </div>
  );
};
