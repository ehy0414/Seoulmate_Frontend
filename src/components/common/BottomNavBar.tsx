import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/common/bottom-navbar-home.svg?react';
import SearchIcon from '../../assets/common/bottom-navbar-search.svg?react';
import FriendIcon from '../../assets/common/bottom-navbar-friend.svg?react';
import ChatIcon from '../../assets/common/bottom-navbar-chat.svg?react';
import ProfileIcon from '../../assets/common/bottom-navbar-profile.svg?react';
import PlusIcon from '../../assets/common/plus.svg';

interface BottomNavBarProps {
  menu: 'home' | 'search' | 'friend' | 'chat' | 'profile';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ menu }) => {
  const [activeTab, setActiveTab] = useState(menu);
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', icon: HomeIcon, route: '/home' },
    { key: 'search', icon: SearchIcon, route: '/search' },
    { key: 'friend', icon: FriendIcon, route: '/friend' },
    { key: 'chat', icon: ChatIcon, route: '/chat/list' },
    { key: 'profile', icon: ProfileIcon, route: '/myPage' },
  ] as const;


  const handleTabClick = (tab: 'home' | 'search' | 'friend' | 'chat' | 'profile', route: string) => {
    setActiveTab(tab);
    navigate(route);
  };

  const handleFloatingButtonClick = () => {
    navigate('/create-meeting');
  };

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-[78px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px]">
                <div className="flex justify-end pr-[18px]">
                    <button 
                        onClick={handleFloatingButtonClick}
                        className="w-[50px] h-[50px] bg-[#F45F3A] rounded-full flex items-center justify-center shadow-lg"
                    >
                        <img src={PlusIcon} alt='플로팅 버튼' />
                    </button>
                </div>
            </div>
            
            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] bg-white shadow-[0_-1px_0_#AFA9A9] rounded-t-lg">
            <div className="flex justify-around py-[18px]">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={item.key}
                            className="w-6 h-6 flex items-center justify-center cursor-pointer"
                            onClick={() => handleTabClick(item.key, item.route)}
                        >
                            <IconComponent 
                                fill={activeTab === item.key ? '#F45F3A' : '#AFA9A9'} 
                                width={24} 
                                height={24} 
                            />
                        </div>
                    );
                })}
            </div>
            </div>
        </>
    );
};

export default BottomNavBar;
