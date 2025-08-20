import type { FriendRequest } from '../../components/friend/request/RequestUserListItem';

export const requests: FriendRequest[] = [
  { requestId: 1, senderId: 101, name: "김민지", profileImage: "" },
  { requestId: 2, senderId: 102, name: "박철수", profileImage: null },
  { requestId: 3, senderId: 103, name: "이서윤", profileImage: "https://picsum.photos/80?1" },
  { requestId: 4, senderId: 104, name: "정우성", profileImage: "" },
  // 필요하면 계속 추가
  // {
  //   "requestId": 0,
  //   "senderId": 0,
  //   "name": "string",
  //   "profileImage": "string"
  // }
];