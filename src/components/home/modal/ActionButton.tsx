interface ActionButtonsProps {
  onFriendRequest?: () => void;
  onSendMessage?: () => void;
  friendRequestText?: string;
  sendMessageText?: string;
  isFriend?: boolean;
  isDisabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFriendRequest,
  onSendMessage,
  friendRequestText = "친구 신청",
  sendMessageText = "메시지 보내기",
  isFriend = false,
  isDisabled = false,
}) => {
  return (
    <div className="flex gap-2 items-center w-full">
      <button
        onClick={onFriendRequest}
        disabled={isDisabled}
        className={`flex shrink-0 justify-center items-center h-[38px] w-[162px] rounded-lg ${
          isFriend
            ? "bg-white border border-gray-300 text-black"
            : "bg-orange-400 text-white"
        } ${isDisabled && "opacity-50 cursor-not-allowed"}`}
      >
        <span className="text-xs font-bold">
          {friendRequestText}
        </span>
      </button>
      <button
        onClick={onSendMessage}
        className="flex shrink-0 justify-center items-center rounded-lg border border-orange-400 border-solid bg-zinc-50 h-[38px] w-[162px]"
      >
        <span className="text-xs font-bold text-red-500">
          {sendMessageText}
        </span>
      </button>
    </div>
  );
};
