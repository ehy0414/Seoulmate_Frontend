type Friend = {
    userId: number;
    name: string;
    profileImage: string;
};

type Props = {
  friend: Friend;
};

const FriendListItem = ({ friend }: Props) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-black-200">
      {friend.profileImage ? (
        <img
          src={friend.profileImage}
          alt={friend.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-black-300"></div>
      )}
      <span className="text-base font-medium text-black-700">{friend.name}</span>
    </div>
  );
};

export default FriendListItem;
