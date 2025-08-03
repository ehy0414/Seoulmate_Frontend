// src/pages/ChatRoom.tsx
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import notificationIcon from '../../assets/chat/notification-icon.png';

interface Message {
  sender: 'me' | 'friend';
  text: string;
  time: string; // HH:mm
  date: string; // YYYY년 MM월 DD일
}

const getFormattedDate = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getFormattedTime = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const friendName = searchParams.get('name') || '알 수 없음';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // 초기 mock 메시지
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        sender: 'friend',
        text: '친구추가 받아!',
        time: '23:48',
        date: '2025년 7월 23일',
      },
      {
        sender: 'me',
        text: '넵..',
        time: '23:48',
        date: '2025년 7월 23일',
      },
      {
        sender: 'me',
        text: '음 그렇구나 길게치면 자동으로 엔터가 되는구나 근데 이건 좀 짧나?',
        time: '23:48',
        date: '2025년 7월 23일',
      },
      {
        sender: 'me',
        text: '짧게도 테스트',
        time: '23:48',
        date: '2025년 7월 23일',
      },
      {
        sender: 'friend',
        text: '길게 치면 이렇게 뜨네요 얼마나 더 길게 쳐야 느낌을 알 수 있을까',
        time: '23:48',
        date: '2025년 7월 23일',
      },
      {
        sender: 'friend',
        text: '애도 짧게 테스트',
        time: '23:48',
        date: '2025년 7월 23일',
      },
    ];
    setMessages(mockMessages);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const newMessage: Message = {
      sender: 'me',
      text: input.trim(),
      time: getFormattedTime(now),
      date: getFormattedDate(now),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const groupedMessages = messages.reduce<{ [date: string]: Message[] }>((acc, msg) => {
    if (!acc[msg.date]) acc[msg.date] = [];
    acc[msg.date].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black-200">
        <div className="text-lg font-semibold">{friendName}</div>
        <button>
          <img src={notificationIcon} alt="Notifications" className="w-[24px] h-[24px]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-hide">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-sm text-black-400 my-2">{date}</div>
            {msgs.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ChatRoom;