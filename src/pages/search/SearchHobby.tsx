import React, { useState, useEffect } from 'react';
import BottomNavBar from '../../components/common/BottomNavBar';
import TabMenu from '../../components/common/TabMenu';
import SearchIcon from '../../assets/common/bottom-navbar-search.svg?react';
import ActiveSearchClub from '../../components/search/ActiveSearchClub';
import ActiveSearchFriend from '../../components/search/ActiveSearchFriend';
import ActiveSearchResult from '../../components/search/ActiveSearchResult';
import BackArrow from '../../assets/common/back-arrow.svg';
import { useNavigate } from 'react-router-dom';

const SearchHobby: React.FC = () => {
    const [activeTab, setActiveTab] = useState('모임');
    const [searchValue, setSearchValue] = useState('');
    // 검색 트리거: 버튼 클릭 시 증가시켜 즉시 검색
    const [searchTrigger, setSearchTrigger] = useState(0);
    const navigate = useNavigate();
    const handleFirstTabClick = () => setActiveTab('모임');
    const handleSecondTabClick = () => setActiveTab('친구');

    // 탭 변경 시 input값 초기화
    useEffect(() => {
        setSearchValue('');
    }, [activeTab]);

    // 페이지 진입 시 최상단으로 스크롤
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className=" w-full max-w-[clamp(360px,100vw,430px)] mx-auto bg-white min-h-screen">
            {/* 검색창 */}
            <div className={`px-2.5 py-2.5 flex items-center gap-[16px] ${searchValue.trim() !== '' ? 'sticky top-0 z-20 bg-white' : ''}`}>
                <img src={BackArrow} onClick={()=>navigate(-1)} />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="찾고싶은 모임, 유저를 검색하세요"
                    className="font-[500] w-full bg-black-100 border border-black-700 rounded-[8px] px-4 py-[13px] text-black-700 text-sm outline-none placeholder:text-black-300"
                />
                <SearchIcon fill='#1a1a1a' className='w-6 h-6 flex-shrink-0 cursor-pointer' onClick={() => setSearchTrigger(t => t + 1)} />
            </div>

            {/* 메뉴바 */}
            <div className={`${searchValue.trim() !== '' ? 'sticky top-[67.6px] z-10 bg-white' : ''}`}> 
                <TabMenu
                    firstTabText="모임"
                    secondTabText="친구"
                    activeTab={activeTab}
                    onFirstTabClick={handleFirstTabClick}
                    onSecondTabClick={handleSecondTabClick}
                />
            </div>

            {activeTab === '모임' ? (
                <ActiveSearchClub searchValue={searchValue} searchTrigger={searchTrigger} />
            ) : (
                searchValue.trim() === ''
                    ? <ActiveSearchFriend />
                    : <ActiveSearchResult searchValue={searchValue} searchTrigger={searchTrigger}/>
            )}

            {/* 하단 네비게이션바 */}
            <BottomNavBar menu="search"/>
        </div>
    );
};

export default SearchHobby;
