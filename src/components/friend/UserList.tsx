"use client";
import { useState } from "react";
import { UserListItem } from "./UserListItem";
import { FriendsModal } from "../modal/FriendsModal";

interface User {
  id: string;
  name: string;
}

interface UserListProps {
  users?: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const defaultUsers: User[] = Array.from({ length: 16 }, (_, index) => ({
    id: `user-${index}`,
    name: "name",
  }));

  const userList = users || defaultUsers;
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <section className="w-full whitespace-nowrap h-[595px]" role="list" aria-label="친구 목록">
      {userList.map((user) => (
        <UserListItem
          key={user.id}
          name={user.name}
          onClick={openModal}
        />
      ))}

    <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
    </section>
  );
};
