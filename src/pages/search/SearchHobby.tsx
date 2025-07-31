import React, { useState } from 'react';
import BottomNavBar from '../../components/common/BottomNavBar';
import SearchIcon from '../../assets/common/bottom-navbar-search.svg?react';
import ActiveSearchClub from '../../components/search/ActiveSearchClub';
import ActiveSearchFriend from '../../components/search/ActiveSearchFriend';
import ActiveSearchResult from '../../components/search/ActiveSearchResult';



const SearchHobby: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'club' | 'friend'>('club');
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className=" w-full max-w-[clamp(360px,100vw,430px)] mx-auto bg-white min-h-screen">
            {/* 검색창 */}
            <div className="px-2.5 py-2.5 flex items-center  gap-[4.07vw]">
                <img src='/src/assets/common/back-arrow.svg' />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="찾고싶은 취미, 유저를 검색하세요"
                    className="font-[500] w-full bg-black-100 border border-black-700 rounded-[8px] px-4 py-[13px] text-black-700 text-sm outline-none placeholder:text-black-300"
                />
                <SearchIcon fill='#1a1a1a' className='w-6 h-6 flex-shrink-0' />
            </div>

            {/* 메뉴바 */}
            <div className="flex relative">
                {/* 애니메이션되는 하단 선 */}
                <div 
                    className={`absolute bottom-0 w-1/2 h-[3px] bg-[#F45F3A] transition-transform duration-300 ease-in-out ${
                        activeTab === 'friend' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                />
                
                <button
                    onClick={() => setActiveTab('club')}
                    className={`flex-1 py-3 text-center text-sm ${
                        activeTab === 'club'
                            ? 'text-black-700 font-[600]'
                            : 'text-black-600 font-[500] border-b border-gray-200'
                    }`}
                >       
                    모임
                </button>
                <button
                    onClick={() => setActiveTab('friend')}
                    className={`flex-1 py-3 text-center text-sm ${
                        activeTab === 'friend'
                            ? 'text-black-700 font-[600]'
                            : 'text-black-600 font-[500] border-b border-gray-200'
                    }`}
                >
                    친구
                </button>
            </div>
            {activeTab === 'club' ? (
                <ActiveSearchClub />
            ) : (
                searchValue.trim() === ''
                    ? <ActiveSearchFriend />
                    : <ActiveSearchResult />
            )}
            

            {/* FAB 플러스 버튼 */}
            <div className="fixed bottom-[78px] right-[18px]">
                <button className="w-[50px] h-[50px] bg-[#F45F3A] rounded-full flex items-center justify-center shadow-lg">
                    <img src='/src/assets/common/plus.svg' />
                </button>
            </div>

            {/* 하단 네비게이션바 */}
            <BottomNavBar />
        </div>
    );
};

export default SearchHobby;
