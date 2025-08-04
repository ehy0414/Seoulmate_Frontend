import { useState } from 'react';
import NoFixedHeaderSeoulmate from '../../components/common/NoFixedHeaderSeoulmate';
import TabMenu from '../../components/common/TabMenu';
import BottomNavBar from '../../components/common/BottomNavBar';
import ChatListBox from '../../components/chat/ChatListBox';

const ChatList = () => {
    const [activeTab, setActiveTab] = useState('그룹 채팅');

    const handleGroupChatClick = () => {
        setActiveTab('그룹 채팅');
    };

    const handlePersonalChatClick = () => {
        setActiveTab('개인 채팅');
    };

    // 임시 그룹 채팅 데이터
    const groupChatData = [
        { name: "서울 맛집 탐방", lastMessage: "다음 주 홍대 맛집 투어 어떠세요?", timestamp: "08/04 15:30", unreadCount: "3" },
        { name: "한강 피크닉", lastMessage: "날씨 좋으니까 한강에서 만나요!", timestamp: "08/04 14:22", unreadCount: "1" },
        { name: "언어교환 모임", lastMessage: "오늘 영어 회화 연습 할까요?", timestamp: "08/04 13:15", unreadCount: "5" },
        { name: "등산 동호회", lastMessage: "이번 주말 북한산 등산 참여하실분?", timestamp: "08/03 18:20", unreadCount: "7" },
        { name: "요리 클래스", lastMessage: "다음 주 파스타 만들기 수업 신청하세요!", timestamp: "08/03 14:55", unreadCount: "2" },
        { name: "서울 맛집 탐방", lastMessage: "다음 주 홍대 맛집 투어 어떠세요?", timestamp: "08/04 15:30", unreadCount: "3" },
        { name: "한강 피크닉", lastMessage: "날씨 좋으니까 한강에서 만나요!", timestamp: "08/04 14:22", unreadCount: "1" },
        { name: "언어교환 모임", lastMessage: "오늘 영어 회화 연습 할까요?", timestamp: "08/04 13:15", unreadCount: "5" },
        { name: "등산 동호회", lastMessage: "이번 주말 북한산 등산 참여하실분?", timestamp: "08/03 18:20", unreadCount: "7" },
        { name: "요리 클래스", lastMessage: "다음 주 파스타 만들기 수업 신청하세요!", timestamp: "08/03 14:55", unreadCount: "2" }
    ];

    // 임시 개인 채팅 데이터
    const personalChatData = [
        { name: "김민수", lastMessage: "안녕하세요! 반갑습니다.", timestamp: "08/04 12:45", unreadCount: "2" },
        { name: "박지영", lastMessage: "내일 카페에서 만날까요?", timestamp: "08/04 11:30", unreadCount: "1" },
        { name: "이성훈", lastMessage: "프로젝트 관련해서 논의하고 싶어요", timestamp: "08/03 16:10", unreadCount: "4" },
        { name: "최유진", lastMessage: "오늘 정말 수고 많았어요~", timestamp: "08/03 13:40", unreadCount: "1" },
        { name: "독서 모임", lastMessage: "이번 달 책은 '82년생 김지영'입니다", timestamp: "08/03 10:25", unreadCount: "6" }
    ];

    return (
        <div className='flex flex-col h-screen bg-white'>
            <NoFixedHeaderSeoulmate title="서울메이트" alarm={false}/>
            <TabMenu
                firstTabText="그룹 채팅"
                secondTabText="개인 채팅"
                activeTab={activeTab}
                onFirstTabClick={handleGroupChatClick}
                onSecondTabClick={handlePersonalChatClick}
            />
            
            <div className="flex-1 overflow-y-auto pb-[60px]">
                {activeTab === '그룹 채팅' ? (
                    <div>
                        {groupChatData.map((chat, index) => (
                            <ChatListBox
                                key={index}
                                name={chat.name}
                                lastMessage={chat.lastMessage}
                                timestamp={chat.timestamp}
                                unreadCount={chat.unreadCount}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        {personalChatData.map((chat, index) => (
                            <ChatListBox
                                key={index}
                                name={chat.name}
                                lastMessage={chat.lastMessage}
                                timestamp={chat.timestamp}
                                unreadCount={chat.unreadCount}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            <BottomNavBar
                menu="chat"
            />
        </div>
    );
};

export default ChatList;