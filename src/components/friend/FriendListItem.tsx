type Friend = {
    userId: number;
    name: string;
    profileImage: string;
  };
  
  type Props = {
    friend: Friend;
    onClick?: () => void; // 클릭 핸들러 전달
  };
  
  const FriendListItem = ({ friend, onClick }: Props) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-[10px] border-b border-black-400 text-left"
        aria-label={`${friend.name} 프로필 보기`}
      >
        {friend.profileImage ? (
          <img
            src={friend.profileImage}
            alt={friend.name}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[40px] h-[40px] rounded-full bg-[#B8B8B8]" />
        )}
        <span className="text-base font-medium text-black-700">{friend.name}</span>
      </button>
    );
  };
  
  export default FriendListItem;
  