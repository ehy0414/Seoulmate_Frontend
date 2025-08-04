"use client";

import * as React from "react";
import { RequestActionButton } from "./RequestActionButton";

interface UserListItemProps {
  name: string;
  percentage: string;
  onDelete?: () => void;
  onAccept?: () => void;
  onClick: () => void;
}

export const RequestUserListItem: React.FC<UserListItemProps> = ({
  name,
  percentage,
  onDelete,
  onAccept,
  onClick
}) => {

  return (
    <div className="flex gap-4 items-center self-stretch px-5 py-0 bg-white border-solid border-b-[0.5px] border-b-neutral-400 h-[60px] max-sm:gap-3 max-sm:px-3 max-sm:py-0">
      <div  className="w-10 h-10 bg-zinc-400 rounded-[100px] cursor-pointer"
            onClick={onClick} />
        <div className="flex gap-3 items-center flex-[1_0_0] max-sm:gap-2">
          <div className="flex flex-col gap-2.5 items-start">
            <h3 className="overflow-hidden self-stretch text-base font-medium text-ellipsis text-zinc-900">
              {name}
            </h3>
          </div>
          <div className="flex justify-center items-center px-2 py-1 bg-primary-700 rounded-[100px]">
            <span className="text-xs font-semibold text-center text-zinc-50">
              {percentage}
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center max-sm:gap-3">
          <RequestActionButton type="delete" onClick={onDelete} />
          <RequestActionButton type="check" onClick={onAccept} />
        </div>
    </div>
  );
};
