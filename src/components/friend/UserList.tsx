"use client";
import * as React from "react";
import { UserListItem } from "./UserListItem";

interface User {
  id: string;
  name: string;
  percentage: string;
}

interface UserListProps {
  users?: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const defaultUsers: User[] = Array.from({ length: 16 }, (_, index) => ({
    id: `user-${index}`,
    name: "name",
    percentage: "nn%"
  }));

  const userList = users || defaultUsers;

  return (
    <section className="w-full whitespace-nowrap h-[595px]" role="list" aria-label="친구 목록">
      {userList.map((user) => (
        <UserListItem
          key={user.id}
          name={user.name}
          percentage={user.percentage}
        />
      ))}
    </section>
  );
};
