import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabMenu from '../../components/common/TabMenu';
import EachAlarmComponent from '../../components/alarm/EachAlarmComponent';
import { HeaderDetail } from '../../components/common/HeaderDetail';
import api from '../../services/axios';
import Spinner from '../../components/signup/langTest/Spinner';
import NoFriend from '../../assets/search/nofriend.svg';

// 화면에 표시할 알람 타입
interface DisplayAlarm {
    title: string;
    subtitle: string;
    timestamp: string;
    isUnread: boolean;
    profileImage?: string;
    linkTargetType: 'MEETING' | 'FRIEND';
    link: string;
    id: number; // notificationId 전달용
}

// API 응답 타입 선언
interface AlarmApiResponse {
    id: number;
    title: string;
    message: string;
    link: string;
    linkTargetType: 'MEETING' | 'FRIEND';
    targetId: number;
    createdAt: number[]; // 배열로 수정
    read: boolean;
}

// createdAt 배열을 사람이 읽을 수 있는 시간 문자열로 변환
function formatCreatedAtFromArray(arr: number[]): string {
    if (!arr || arr.length < 6) return '';
    const [year, month, day, hour, min, sec, ns] = arr;
    // 마지막 값이 나노초 단위라면 밀리초로 변환
    const ms = ns ? Math.floor(ns / 1000000) : 0;
    // UTC 기준으로 밀리초 계산
    const created = Date.UTC(year, month - 1, day, hour, min, sec) + ms;
    const now = Date.now();
    const diffMs = now - created;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
}

const AlarmPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState('모임');
    const [alarms, setAlarms] = useState<DisplayAlarm[]>([]);
    // 모임 알람의 프로필 이미지를 캐싱하기 위한 state
    const [meetingProfileCache, setMeetingProfileCache] = useState<{[meetingId: string]: string}>({});
    const [loading, setLoading] = useState(true); // 초기 true로 설정하여 플래시 방지
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const bottomRef = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     // SSE 연결 설정 (activeTab에 따라 다르게 연결하거나, 하나의 스트림으로 모든 타입 받기)
    //     const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/notifications/stream`, {
    //       withCredentials: true, 
    //     });

    //     eventSource.onopen = () => {
    //       console.log('SSE 연결 성공');
    //     };

    //     eventSource.onmessage = (event) => {
    //       console.log("보내주는 event",event);
    //       if (event.data === 'timeout' || !event.data) {
    //         // "timeout" 무시 (연결 유지용)
    //         return;
    //       }
    //       try {
    //         const newAlarm: AlarmApiResponse = JSON.parse(event.data);
    //         console.log('새 알람 푸시:', newAlarm);
            
    //         // DisplayAlarm으로 매핑
    //         const mappedAlarm: DisplayAlarm = {
    //           title: newAlarm.title,
    //           subtitle: newAlarm.message,
    //           timestamp: formatCreatedAtFromArray(newAlarm.createdAt),
    //           isUnread: !newAlarm.read,
    //           profileImage: undefined,
    //           linkTargetType: newAlarm.linkTargetType,
    //           link: newAlarm.link,
    //           id: newAlarm.id,
    //         };

    //         // 상태 업데이트 (기존 alarms에 추가)
    //         setAlarms((prev) => [mappedAlarm, ...prev]);
    //       } catch (e) {
    //         console.error('SSE 데이터 파싱 오류:', e);
    //       }
    //     };

    //     eventSource.onerror = (error) => {
    //       console.error('SSE 오류:', error);
    //       // 재연결 로직: EventSource는 자동 재연결 시도하지만, 필요 시 close 후 재시작
    //       eventSource.close();
    //       // setTimeout으로 재시도 로직 추가 가능
    //     };

    //     return () => {
    //       eventSource.close(); // cleanup
    //       console.log('SSE 연결 종료');
    //     };
    //   }, []); 

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const type = activeTab === '모임' ? 'MEETING' : 'FRIEND';
                const res = await api.get('/notifications/me', {
                    params: {
                        type,
                        page,
                    }
                });
                if (res.data.success && Array.isArray(res.data.data.content)) {
                    // 친구 알람은 actorImageUrl, 모임 알람은 meetingId로 profile_image 요청
                    const mappedPromises = res.data.data.content.map(async (item: any) => {
                        let profileImage: string | undefined = undefined;
                        if (item.linkTargetType === 'FRIEND') {
                            profileImage = item.actorImageUrl;
                        } else if (item.linkTargetType === 'MEETING') {
                            // link에서 meetingId 추출
                            const match = item.link.match(/\d+/);
                            const meetingId = match ? match[0] : '';
                            if (meetingId) {
                                // 캐시 확인
                                if (meetingProfileCache[meetingId]) {
                                    profileImage = meetingProfileCache[meetingId];
                                } else {
                                    try {
                                        const res = await api.get(`/meetings/private/${meetingId}`);
                                        profileImage = res.data.data.image;
                                        setMeetingProfileCache(prev => ({ ...prev, [meetingId]: profileImage }));
                                    } catch {
                                        profileImage = undefined;
                                    }
                                }
                            }
                        }
                        return {
                            title: item.title,
                            subtitle: item.message,
                            timestamp: formatCreatedAtFromArray(item.createdAt),
                            isUnread: !item.read,
                            profileImage,
                            linkTargetType: item.linkTargetType,
                            link: item.link,
                            id: item.id,
                        };
                    });
                    const mapped = await Promise.all(mappedPromises); // 여기서 await 추가하여 then 대신 동기화
                    setAlarms(prev => page === 0 ? mapped : [...prev, ...mapped]);
                    setHasMore(mapped.length === 20);
                    setLoading(false); // 데이터 처리 후 로딩 종료
                } else {
                    if (page === 0) setAlarms([]);
                    setHasMore(false);
                    setLoading(false); // else 경우 로딩 종료
                }
            } catch {
                if (page === 0) setAlarms([]);
                setHasMore(false);
                setLoading(false); // 에러 시 로딩 종료
            }
        };
        fetchAlarms();
    }, [activeTab, page]);

    // 탭 변경 시 페이지/리스트 초기화 및 로딩 재시작
    useEffect(() => {
        setPage(0);
        setAlarms([]);
        setHasMore(true);
        setLoading(true); // 탭 변경 시 로딩 상태 재설정
    }, [activeTab]);

    // 하단 감지용 IntersectionObserver로 페이징
    useEffect(() => {
        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    const handleNotificationClick = () => {
        // 알람 페이지에서는 알람 버튼 클릭 시 아무 동작 안 함
    };

    const handleAlarmClick = async (alarm: DisplayAlarm) => {
        if (!alarm.id) return;
        try {
            await api.post(`/notifications/${alarm.id}/read`);
        } catch (e) {
            console.log("읽음으로 전환 로직 오류",e);
        }
        if (alarm.linkTargetType === 'MEETING') {
            const match = alarm.link.match(/\d+/);
            const meetingId = match ? match[0] : '';
            if (meetingId) {
                navigate(`/club/${meetingId}`);
            }
        } else if (alarm.linkTargetType === 'FRIEND') {
            navigate('/friend/request');
        }
    };

    // 필터링된 알람을 렌더링 시 계산 (state 제거로 최적화)
    const filteredAlarms = alarms.filter(alarm => activeTab === '모임' ? alarm.linkTargetType === 'MEETING' : alarm.linkTargetType === 'FRIEND');

    return (
        <div className='flex flex-col h-screen bg-white'>
            <HeaderDetail
                title='알람' 
                showBorder={false}
                onBackClick={() => navigate(-1)}
                onNotificationClick={handleNotificationClick}
            />
            <div className="mt-[60px]">
                <TabMenu
                    firstTabText="모임"
                    secondTabText="친구"
                    activeTab={activeTab}
                    onFirstTabClick={() => setActiveTab('모임')}
                    onSecondTabClick={() => setActiveTab('친구')}
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {loading && page === 0 ? (
                    <div className='flex justify-center pt-[200px]'>
                        <Spinner text='알람 데이터 가져오는 중...'/>
                    </div>
                ) : filteredAlarms.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center gap-6 pt-[211px]">
                        <img src={NoFriend} alt="" />
                        <span className="text-2xl text-[#000] font-[600]">받은 알람이 없습니다</span>
                    </div>
                ) : (
                    <div>
                        {filteredAlarms.map((alarm, index) => (
                            <EachAlarmComponent
                                key={index}
                                title={alarm.title}
                                subtitle={alarm.subtitle}
                                timestamp={alarm.timestamp}
                                isUnread={alarm.isUnread}
                                profileImage={alarm.profileImage}
                                onClick={() => handleAlarmClick(alarm)}
                            />
                        ))}
                        {/* 페이징용 하단 감지 div */}
                        <div ref={bottomRef} style={{ height: '1px' }}></div>
                        {loading && page > 0 && (
                            <div className='flex justify-center py-4'>
                                <Spinner text='더 불러오는 중...'/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlarmPage;