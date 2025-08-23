import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoFixedHeaderSeoulmate from '../../components/common/NoFixedHeaderSeoulmate';
import TabMenu from '../../components/common/TabMenu';
import BottomNavBar from '../../components/common/BottomNavBar';
import ChatListBox from '../../components/chat/ChatListBox';
import api from '../../services/axios';

type ChatRoom = {
    roomId: number;
    type: string;
    title: string;
    roomImageUrl: string;
    partnerUserId: number;
    lastMessageType: string;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
};

const ChatList = () => {
  const [activeTab, setActiveTab] = useState('그룹 채팅');
  const [groupChats, setGroupChats] = useState<ChatRoom[]>([]);
  const [personalChats, setPersonalChats] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 그룹 채팅 데이터 불러오기
    const fetchGroupChats = async () => {
      try {
        const res = await api.get('/chat/rooms', {
          params: { type: 'GROUP', page: 0, size: 20 }
        });
        if (res.data.success) {
          setGroupChats(res.data.data);
        }
      } catch (error) {
        console.error('그룹 채팅 불러오기 실패:', error);
      }
    };

    // 개인 채팅 데이터 불러오기
    const fetchPersonalChats = async () => {
      try {
        const res = await api.get('/chat/rooms', {
          params: { type: 'DIRECT', page: 0, size: 20 }
        });
        if (res.data.success) {
          setPersonalChats(res.data.data);
        }
      } catch (error) {
        console.error('개인 채팅 불러오기 실패:', error);
      }
    };

    fetchGroupChats();
    fetchPersonalChats();
  }, []);

  const handleGroupChatClick = () => {
    setActiveTab('그룹 채팅');
  };

  const handlePersonalChatClick = () => {
    setActiveTab('개인 채팅');
  };

  const handleChatRoomClick = (roomId: number, chatName: string) => {
    navigate(`/chat?roomId=${roomId}&name=${encodeURIComponent(chatName)}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <NoFixedHeaderSeoulmate title="서울메이트" alarm={false} />
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
            {groupChats.map((chat) => (
              <ChatListBox
                key={chat.roomId}
                name={chat.title}
                lastMessage={chat.lastMessage}
                timestamp={chat.lastMessageAt}
                unreadCount={chat.unreadCount}
                onClick={() => handleChatRoomClick(chat.roomId, chat.title)}
              />
            ))}
          </div>
        ) : (
          <div>
            {personalChats.map((chat) => (
              <ChatListBox
                key={chat.roomId}
                name={chat.title}
                lastMessage={chat.lastMessage}
                timestamp={chat.lastMessageAt}
                unreadCount={chat.unreadCount} 
                onClick={() => handleChatRoomClick(chat.roomId, chat.title)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNavBar menu="chat" />
    </div>
  );
};

export default ChatList;
