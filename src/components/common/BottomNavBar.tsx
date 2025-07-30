import React, { useState } from 'react';
import HomeIcon from '../../assets/common/bottom-navbar-home.svg?react';
import SearchIcon from '../../assets/common/bottom-navbar-search.svg?react';
import FriendIcon from '../../assets/common/bottom-navbar-friend.svg?react';
import ChatIcon from '../../assets/common/bottom-navbar-chat.svg?react';
import ProfileIcon from '../../assets/common/bottom-navbar-profile.svg?react';

const BottomNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-[clamp(360px,100vw,430px)] mx-auto bg-white shadow-[0_-1px_0_#AFA9A9] rounded-t-lg">
            <div className="flex justify-around py-[18px]">
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveTab('home')}
                >
                    <HomeIcon fill={activeTab === 'home' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveTab('search')}
                >
                    <SearchIcon fill={activeTab === 'search' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveTab('friend')}
                >
                    <FriendIcon fill={activeTab === 'friend' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveTab('chat')}
                >
                    <ChatIcon fill={activeTab === 'chat' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveTab('profile')}
                >
                    <ProfileIcon fill={activeTab === 'profile' ? '#F45F3A' : '#AFA9A9'} width={24} height={24} />
                </div>
            </div>
        </div>
    );
};

export default BottomNavBar;