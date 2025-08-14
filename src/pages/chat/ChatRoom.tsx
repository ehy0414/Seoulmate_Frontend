import { useState, useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import { chatMockMessages, type Message } from '../../mock/chat/chatMockData';
import NotFixedHeaderDetail from '../../components/common/NotFixedHeaderDetail';

const getFormattedDate = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getFormattedTime = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const friendName = searchParams.get('name') || '알 수 없는 사용자';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setMessages(chatMockMessages);
  }, []);

  // 스크롤 핸들링을 위한 ref
  const containerRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(true); // 현재 하단에 가까운지 상태 저장

  // 하단에 가까운지 판단 (여유 60px 임계값)
  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.clientHeight - el.scrollTop;
    return distance <= 60;
  };

  // 스크롤 핸들러: 유저가 스크롤을 올렸는지/내렸는지에 따라 pinned 상태 업데이트
  const handleScroll = () => {
    isPinnedRef.current = isNearBottom();
  };

  // 새 메시지가 생기면, 유저가 하단 근처일 때만 맨 아래로 스크롤
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isPinnedRef.current) {
      el.scrollTop = el.scrollHeight; // 맨 아래로 고정
    }
  }, [messages]);


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

  const groupedMessages = useMemo(() => {
       return messages.reduce<{ [date: string]: Message[] }>((acc, msg) => {
       if (!acc[msg.date]) acc[msg.date] = [];
       acc[msg.date].push(msg);
       return acc;
     }, {});
   }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white w-[393px]">
      <NotFixedHeaderDetail
        title={friendName}
        onBackClick={() => navigate(-1)} 
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[1000px] overflow-y-auto scrollbar-hide px-4 py-2 space-y-4 flex flex-col"
      >        
        <div className="mt-auto" />
        {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              <div className="text-center text-sm text-black-400 my-2">{date}</div>
                {msgs.map((msg, idx) => {
                  const prev = idx > 0 ? msgs[idx - 1] : null;
                  const isSameSender = prev && prev.sender === msg.sender;

                  const marginTop = isSameSender ? 'mt-1' : 'mt-5'; // 4px or 20px
                  return (
                    <MessageBubble key={idx} message={msg} marginTop={marginTop} />
                  );
                })}
            </div>
          ))}
      </div>

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