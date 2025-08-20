import React from "react";
import RejectIcon from '../../../assets/friend/rejectIcon.png';
import AcceptIcon from '../../../assets/friend/acceptIcon.png';

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
      className="h-[40px] w-[40px] rounded-full object-cover"
    />
  ) : (
    <div className="h-[40px] w-[40px] rounded-full bg-gray-300 grid place-items-center">
    </div>
  );

  return (
    <li className="flex items-center justify-between gap-4 p-4 border-b h-[60px]">
      <div className="flex items-center gap-4 min-w-0">
        {avatar}
        <span className="text-base font-medium text-black-700">{name}</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onReject(request)}
          className="bg-none"
        >
          <img src={RejectIcon} alt="거절 아이콘" className="w-[30px] h-[30px]" />
        </button>

        <button
          onClick={() => onAccept(request)}
          className="bg-none"
        >
          <img src={AcceptIcon} alt="수락 아이콘" className="w-[30px] h-[30px]" />
        </button>
      </div>
    </li>
  );
};

export default RequestUserListItem;