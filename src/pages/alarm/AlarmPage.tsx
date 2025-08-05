import React from 'react';
import { NotFixedHeaderDetail } from '../../components/common/NotFixedHeaderDetail';
import TabMenu from '../../components/common/TabMenu';
import EachAlarmComponent from '../../components/alarm/EachAlarmComponent';

const AlarmPage = () => {
    const [activeTab, setActiveTab] = React.useState('모임');

    // 모임 알람 임시 데이터
    const meetingAlarms = [
        {
            title: "내 모임에 참여했습니다!",
            subtitle: "Nguyễn Văn Nam 님이 내 모임에 참여했습니다.",
            timestamp: "10분 전",
            isUnread: true,
            profileImage: undefined
        },
        {
            title: "모임 참가 신청이 승인되었습니다!",
            subtitle: "언어교환 모임에 참가 승인되었습니다.",
            timestamp: "3시간 전",
            isUnread: false,
            profileImage: undefined
        },
        {
            title: "모임이 곧 시작됩니다.",
            subtitle: "등산 동호회 모임이 30분 후 시작됩니다.",
            timestamp: "5시간 전",
            isUnread: false,
            profileImage: undefined
        },
        {
            title: "모임 후기를 작성해주세요!",
            subtitle: "요리 클래스 모임은 어떠셨나요?",
            timestamp: "1일 전",
            isUnread: false,
            profileImage: undefined
        }
    ];

    // 친구 알람 임시 데이터
    const friendAlarms = [
        {
            title: "새로운 친구 신청이 왔습니다!",
            subtitle: "김민수 님이 친구 신청을 보냈습니다.",
            timestamp: "30분 전",
            isUnread: true,
            profileImage: undefined
        },
        {
            title: "친구 신청이 승인되었습니다.",
            subtitle: "박지영 님과 친구가 되었습니다.",
            timestamp: "2시간 전",
            isUnread: true,
            profileImage: undefined
        },
        {
            title: "친구가 새 게시물을 올렸습니다.",
            subtitle: "이성훈 님이 새로운 활동을 공유했습니다.",
            timestamp: "4시간 전",
            isUnread: false,
            profileImage: undefined
        },
        {
            title: "생일 축하 메시지를 보내보세요!",
            subtitle: "최유진 님의 생일이 내일입니다.",
            timestamp: "6시간 전",
            isUnread: false,
            profileImage: undefined
        },
        {
            title: "친구가 회원님을 태그했습니다.",
            subtitle: "정수현 님이 게시물에 회원님을 태그했습니다.",
            timestamp: "2일 전",
            isUnread: false,
            profileImage: undefined
        }
    ];
    
    const handleNotificationClick = () => {
        // 알람 페이지에서는 알람 버튼 클릭 시 아무 동작 안 함
    };

    return (
        <div className='flex flex-col h-screen bg-white'>
            <NotFixedHeaderDetail 
                title='알람' 
                showBorder={false} 
                onNotificationClick={handleNotificationClick}
            />
            <TabMenu
                firstTabText="모임"
                secondTabText="친구"
                activeTab={activeTab}
                onFirstTabClick={() => setActiveTab('모임')}
                onSecondTabClick={() => setActiveTab('친구')}
            />
            
            <div className="flex-1 overflow-y-auto">
                {activeTab === '모임' ? (
                    <div>
                        {meetingAlarms.map((alarm, index) => (
                            <EachAlarmComponent
                                key={index}
                                title={alarm.title}
                                subtitle={alarm.subtitle}
                                timestamp={alarm.timestamp}
                                isUnread={alarm.isUnread}
                                profileImage={alarm.profileImage}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        {friendAlarms.map((alarm, index) => (
                            <EachAlarmComponent
                                key={index}
                                title={alarm.title}
                                subtitle={alarm.subtitle}
                                timestamp={alarm.timestamp}
                                isUnread={alarm.isUnread}
                                profileImage={alarm.profileImage}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default AlarmPage;