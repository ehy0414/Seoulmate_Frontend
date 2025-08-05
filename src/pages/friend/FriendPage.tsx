"use client";
import { useState } from "react";
import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import { MenuBar } from "../../components/friend/MenuBar";
import { SearchSection } from "../../components/friend/SearchSection";
import { UserList } from "../../components/friend/UserList";
import BottomNavBar from "../../components/common/BottomNavBar";

interface User {
  id: string;
  name: string;
  percentage: string;
}

interface FriendsListProps {
  users?: User[];
  onTabChange?: (tab: "friends" | "requests") => void;
  onSearch?: (query: string) => void;
  onBack?: () => void;
}

export const FriendPage: React.FC<FriendsListProps> = ({
  users,
  onTabChange,
  onSearch,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (tab: "friends" | "requests") => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleBack = () => {
    onBack?.();
  };

  return (
    <main className="flex flex-col items-center mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <HeaderSeoulmate title="서울메이트" alarm={false} />
      
        <section className="w-full">
            <MenuBar />
            <SearchSection
            onBack={handleBack}
            onSearch={handleSearch}
            placeholder="찾고 싶은 친구를 검색하세요."
            />
        </section>
        <div
            role="tabpanel"
            id={activeTab === "friends" ? "friends-panel" : "requests-panel"}
            aria-labelledby={activeTab === "friends" ? "friends-tab" : "requests-tab"}
            className="mb-[23rem] w-full"
        >
            <UserList users={users} />
        </div>

        <BottomNavBar menu='friend'/>
    </main>
  );
};

export default FriendPage;
