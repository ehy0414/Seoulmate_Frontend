import React, { useState } from 'react';
import BottomNavBar from '../../components/common/BottomNavBar';
import TabMenu from '../../components/common/TabMenu';
import SearchIcon from '../../assets/common/bottom-navbar-search.svg?react';
import ActiveSearchClub from '../../components/search/ActiveSearchClub';
import ActiveSearchFriend from '../../components/search/ActiveSearchFriend';
import ActiveSearchResult from '../../components/search/ActiveSearchResult';
import BackArrow from '../../assets/common/back-arrow.svg';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import { useNavigate } from 'react-router-dom';

const SearchHobby: React.FC = () => {
    const [activeTab, setActiveTab] = useState('모임');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const handleFirstTabClick = () => setActiveTab('모임');
    const handleSecondTabClick = () => setActiveTab('친구');

    return (
        <div className=" w-full max-w-[clamp(360px,100vw,430px)] mx-auto bg-white min-h-screen">
            {/* 검색창 */}
            <div className="px-2.5 py-2.5 flex items-center  gap-[4.07vw]">
                <img src={BackArrow} onClick={()=>navigate(-1)} />
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
            <TabMenu
                firstTabText="모임"
                secondTabText="친구"
                activeTab={activeTab}
                onFirstTabClick={handleFirstTabClick}
                onSecondTabClick={handleSecondTabClick}
            />

            {activeTab === '모임' ? (
                <ActiveSearchClub />
            ) : (
                searchValue.trim() === ''
                    ? <ActiveSearchFriend />
                    : <ActiveSearchResult />
            )}
            


            {/* 하단 네비게이션바 */}
            <BottomNavBar menu="search"/>
        </div>
    );
};

export default SearchHobby;
