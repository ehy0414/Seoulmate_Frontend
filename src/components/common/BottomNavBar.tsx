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

  const handleTabClick = (tab: 'home' | 'search' | 'friend' | 'chat' | 'profile') => {
    setActiveTab(tab);

    switch (tab) {
      case 'home':
        // navigate('/');
        break;
      case 'search':
        navigate('/search/hobby');
        break;
      case 'friend':
        // navigate('/friend');
        break;
      case 'chat':
        // navigate('/chat');
        break;
      case 'profile':
        navigate('/myPage');
        break;
    }
  };

  const handleFloatingButtonClick = () => {
    navigate('/create-meeting');
  };

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-[78px] right-1/2 transform translate-x-[50%] max-w-[430px] w-full">
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
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-[clamp(360px,100vw,430px)] mx-auto bg-white shadow-[0_-1px_0_#AFA9A9] rounded-t-lg">
            <div className="flex justify-around py-[18px]">
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTabClick('home')}
                >
                    <HomeIcon fill={activeTab === 'home' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTabClick('search')}
                >
                    <SearchIcon fill={activeTab === 'search' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTabClick('friend')}
                >
                    <FriendIcon fill={activeTab === 'friend' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTabClick('chat')}
                >
                    <ChatIcon fill={activeTab === 'chat' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTabClick('profile')}
                >
                    <ProfileIcon fill={activeTab === 'profile' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
            </div>
            </div>
        </>
    );
};

export default BottomNavBar;
