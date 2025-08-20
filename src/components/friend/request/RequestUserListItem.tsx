import React from "react";

export type FriendRequest = {
  requestId: number;
  senderId: number;
  name: string;
  profileImage?: string | null;
};

type Props = {
  request: FriendRequest;
  onAccept: (request: FriendRequest) => void; 
  onReject: (request: FriendRequest) => void; 
};

const RequestUserListItem: React.FC<Props> = ({ request, onAccept, onReject }) => {
  const { name, profileImage } = request;

  const avatar = profileImage ? (
    <img
      src={profileImage}
      alt={`${name} 프로필`}
      className="h-16 w-16 rounded-full object-cover"
    />
  ) : (
    <div className="h-16 w-16 rounded-full bg-gray-300 grid place-items-center">
    </div>
  );

  return (
    <li className="flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-4 min-w-0">
        {avatar}
        <span className="text-xl font-semibold truncate">{name}</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onReject(request)}
          className="rounded-xl bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:opacity-80"
        >
          삭제
        </button>

        <button
          onClick={() => onAccept(request)}
          className="rounded-xl bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:opacity-80"
        >
          수락
        </button>
      </div>
    </li>
  );
};

export default RequestUserListItem;