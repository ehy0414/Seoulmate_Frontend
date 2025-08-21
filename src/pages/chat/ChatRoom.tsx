import { useState, useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import NotFixedHeaderDetail from '../../components/common/NotFixedHeaderDetail';
import api from '../../services/axios';

export interface Message {
  id?: string | number;          // 서버 id 또는 temp id
  sender: 'me' | 'friend';
  text: string;
  time: string;                  // HH:mm
  date: string;                  // YYYY년 MM월 DD일
  pending?: boolean;             // 전송 중 표시
  error?: boolean;               // 전송 실패 표시
}

type ChatItem = {
  messageId: number;
  roomId: number;
  senderId: number;
  senderName: string;
  senderProfileImageUrl: string;
  type: string;
  content: string;
  createdAt: string; // ISO
  mine: boolean;
};

type ChatListResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    items: ChatItem[];
    nextCursor: number | null;
    hasMore: boolean;
  };
};

const getFormattedDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const getFormattedTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const friendName = searchParams.get('name') || '알 수 없는 사용자';
  const roomIdParam = searchParams.get('roomId');
  const roomId = roomIdParam ? Number(roomIdParam) : null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(true);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.clientHeight - el.scrollTop;
    return distance <= 60;
  };

  const handleScroll = () => {
    isPinnedRef.current = isNearBottom();
  };

  // ✅ 화면 진입 시 읽음 처리 호출
  useEffect(() => {
    if (!roomId || Number.isNaN(roomId)) return;
    (async () => {
      try {
        await api.patch(`/chat/rooms/${roomId}/read`);
      } catch (e) {
        console.error('읽음 처리 실패:', e);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    if (!roomId || Number.isNaN(roomId)) return;

    (async () => {
      try {
        const res = await api.get<ChatListResponse>(`/chat/rooms/${roomId}/messages`, {
          params: { size: 30 },
        });
        const items = res.data?.data?.items ?? [];
        items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        const mapped: Message[] = items.map((it) => {
          const d = new Date(it.createdAt);
          return {
            id: it.messageId,
            sender: it.mine ? 'me' : 'friend',
            text: it.content,
            time: getFormattedTime(d),
            date: getFormattedDate(d),
          };
        });

        setMessages(mapped);
      } catch (e) {
        console.error('메시지 불러오기 실패:', e);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isPinnedRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !roomId) return;

    const now = new Date();
    const tempId = `temp-${Date.now()}`;

    const optimisticMsg: Message = {
      id: tempId,
      sender: 'me',
      text: input.trim(),
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      pending: true,
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setInput('');

    try {
      const res = await api.post(`/chat/rooms/${roomId}/messages`, {
        type: 'TEXT',
        content: optimisticMsg.text,
      });

      const saved: ChatItem | undefined = res.data?.data;
      if (!saved) {
        throw new Error('Empty data');
      }

      const d = new Date(saved.createdAt);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? {
                id: saved.messageId,
                sender: 'me',
                text: saved.content,
                time: getFormattedTime(d),
                date: getFormattedDate(d),
                pending: false,
                error: false,
              }
            : m
        )
      );
    } catch (e) {
      console.error('메시지 전송 실패:', e);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, pending: false, error: true } : m))
      );
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const groupedMessages = useMemo(() => {
    return messages.reduce<Record<string, Message[]>>((acc, msg) => {
      if (!acc[msg.date]) acc[msg.date] = [];
      acc[msg.date].push(msg);
      return acc;
    }, {});
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white w-[393px]">
      <NotFixedHeaderDetail title={friendName} onBackClick={() => navigate(-1)} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 py-2 space-y-4 flex flex-col"
      >
        <div className="mt-auto" />
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-sm text-black-400 my-2">{date}</div>
            {msgs.map((msg, idx) => {
              const prev = idx > 0 ? msgs[idx - 1] : null;
              const isSameSender = prev && prev.sender === msg.sender;
              const marginTop = isSameSender ? 'mt-1' : 'mt-5';

              return (
                <MessageBubble
                  key={`${date}-${msg.time}-${msg.id ?? idx}`}
                  message={msg}
                  marginTop={marginTop}
                />
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
