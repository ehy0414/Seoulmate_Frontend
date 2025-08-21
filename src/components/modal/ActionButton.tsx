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
    <div className="flex gap-2 items-center w-full px-1">
      <button
        onClick={onFriendRequest}
        disabled={isDisabled}
        className={`flex shrink-0 justify-center items-center h-[38px] w-1/2 rounded-lg ${
          isFriend
            ? "bg-primary-700 text-white"
            : "bg-primary-700 text-white hover:bg-primary-800 transition-colors"
        } ${isDisabled && "opacity-70 cursor-not-allowed"}`}
      >
        <span className="text-xs font-bold">
          {friendRequestText}
        </span>
      </button>
      <button
        onClick={onSendMessage}
        className="flex shrink-0 justify-center items-center rounded-lg border hover:bg-primary-100 border-primary-700 border-solid bg-zinc-50 h-[38px] w-1/2"
      >
        <span className="text-xs font-bold text-primary-700 ">
          {sendMessageText}
        </span>
      </button>
    </div>
  );
};
