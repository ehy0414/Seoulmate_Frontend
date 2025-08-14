import { useState, useEffect, useMemo } from 'react';
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
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-hide flex flex-col justify-end">
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