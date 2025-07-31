import * as React from "react";

interface ActionButtonsProps {
  onFriendRequest?: () => void;
  onSendMessage?: () => void;
  friendRequestText?: string;
  sendMessageText?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFriendRequest,
  onSendMessage,
  friendRequestText = "친구 신청",
  sendMessageText = "메시지 보내기"
}) => {
  return (
    <div className="flex gap-2 items-center w-full">
      <button
        onClick={onFriendRequest}
        className="flex shrink-0 justify-center items-center bg-orange-400 rounded-lg h-[38px] w-[162px] "
      >
        <span className="text-xs font-bold text-zinc-50">
          {friendRequestText}
        </span>
      </button>
      <button
        onClick={onSendMessage}
        className="flex shrink-0 justify-center items-center rounded-lg border border-orange-400 border-solid bg-zinc-50 h-[38px] w-[162px] "
      >
        <span className="text-xs font-bold text-red-500">
          {sendMessageText}
        </span>
      </button>
    </div>
  );
};
