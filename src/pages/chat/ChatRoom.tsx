import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import NotFixedHeaderDetail from '../../components/common/NotFixedHeaderDetail';
import api from '../../services/axios';

/** =========================
 * Types
 * ======================= */
export interface Message {
  id?: string | number;
  sender: 'me' | 'friend';
  text: string;
  time: string;                 // HH:mm
  date: string;                 // YYYY년 MM월 DD일
  profileImg?: string;
  pending?: boolean;
  error?: boolean;
  _clientMessageId?: string;    // 낙관적 전송 매칭용
}

type ChatItem = {
  messageId: number;
  roomId: number;
  senderId: number;
  senderName: string;
  senderProfileImageUrl: string;
  type: string;
  content: string;
  createdAt: string;            // ISO
  mine: boolean;                // 서버 기준 송수신 여부
  clientMessageId?: string | null;
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

/** =========================
 * Utils
 * ======================= */
const getFormattedDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const getFormattedTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const scrollToBottom = (el: HTMLDivElement | null) => {
  if (!el) return;
  el.scrollTop = el.scrollHeight;
};

const isNearBottom = (el: HTMLDivElement | null, threshold = 60) => {
  if (!el) return true;
  const distance = el.scrollHeight - el.clientHeight - el.scrollTop;
  return distance <= threshold;
};

/** =========================
 * Component
 * ======================= */
const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const friendName = searchParams.get('name') || '알 수 없는 사용자';
  const roomId = Number(searchParams.get('roomId') ?? NaN);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  // STOMP refs
  const stompRef = useRef<Client | null>(null);
  const subRef = useRef<StompSubscription | null>(null);
  const connectedRef = useRef(false);

  // 중복 방지: 이미 반영된 messageId / clientMessageId 기록
  const seenServerIdsRef = useRef<Set<number | string>>(new Set());
  const seenClientIdsRef = useRef<Set<string>>(new Set());

  /** ----- 읽음 처리 ----- */
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

  /** ----- REST: ChatItem → Message (mine을 그대로 반영) ----- */
  const mapFromRest = useCallback((it: ChatItem): Message => {
    const d = new Date(it.createdAt);
    const isMine = Boolean(it.mine);
    return {
      id: it.messageId,
      sender: isMine ? 'me' : 'friend',
      text: it.content,
      time: getFormattedTime(d),
      date: getFormattedDate(d),
      profileImg: isMine ? undefined : it.senderProfileImageUrl,
      _clientMessageId: it.clientMessageId ?? undefined,
    };
  }, []);

  /** ----- STOMP: 신규 수신(내 입력 제외 전부 친구로 처리) ----- */
  const mapFromStompNew = useCallback((it: ChatItem): Message => {
    const d = new Date(it.createdAt);
    return {
      id: it.messageId,
      sender: 'friend', // 실시간 수신은 내 낙관적 메시지 교체를 제외하고 전부 친구로 표기
      text: it.content,
      time: getFormattedTime(d),
      date: getFormattedDate(d),
      profileImg: it.senderProfileImageUrl,
      _clientMessageId: it.clientMessageId ?? undefined,
    };
  }, []);

  /** ----- 초기 로딩 (REST) ----- */
  useEffect(() => {
    if (!roomId || Number.isNaN(roomId)) return;
    (async () => {
      try {
        const res = await api.get<ChatListResponse>(`/chat/rooms/${roomId}/messages`, { params: { size: 30 } });
        const items = res.data?.data?.items ?? [];
        items.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const mapped = items.map((it) => {
          if (it.messageId != null) seenServerIdsRef.current.add(it.messageId);
          if (it.clientMessageId) seenClientIdsRef.current.add(it.clientMessageId);
          return mapFromRest(it);
        });

        setMessages(mapped);
        // 최초 로딩 시 바닥으로
        requestAnimationFrame(() => scrollToBottom(containerRef.current));
      } catch (e) {
        console.error('초기 메시지 불러오기 실패:', e);
      }
    })();
  }, [roomId, mapFromRest]);

  /** ----- 스크롤 핀 상태 업데이트 ----- */
  const handleScroll = useCallback(() => {
    pinnedRef.current = isNearBottom(containerRef.current);
  }, []);

  /** ----- STOMP 연결/구독 ----- */
  useEffect(() => {
    if (!roomId || Number.isNaN(roomId)) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('https://seoulmate7.shop/ws'),
      reconnectDelay: 5000,
      debug: (msg) => console.log('[STOMP]', msg),

      onConnect: () => {
        connectedRef.current = true;
        console.log('[STOMP] connected');

        const destination = `/topic/room.${roomId}`;
        subRef.current = client.subscribe(destination, (frame: IMessage) => {
          try {
            const payload: ChatItem = JSON.parse(frame.body);
            console.log('[STOMP] <<< MESSAGE', payload);

            // 1) 서버 id 중복 방지
            if (payload.messageId != null && seenServerIdsRef.current.has(payload.messageId)) {
              return;
            }

            setMessages((prev) => {
              // 2) 낙관적 메시지 매칭 (clientMessageId 우선)
              let replaced = false;
              const next = prev.map((m) => {
                const sameClientId =
                  payload.clientMessageId &&
                  m._clientMessageId &&
                  payload.clientMessageId === m._clientMessageId;

                const nearSameTextAndMine =
                  !payload.clientMessageId && m.pending && m.sender === 'me' && m.text === payload.content;

                if ((sameClientId || nearSameTextAndMine) && m.pending) {
                  replaced = true;
                  if (payload.messageId != null) seenServerIdsRef.current.add(payload.messageId);
                  if (payload.clientMessageId) seenClientIdsRef.current.add(payload.clientMessageId);
                  // 교체 시에는 REST 규칙과 동일하게 mine 반영 → 보통 내 메시지면 'me'
                  return {
                    ...mapFromRest(payload),
                    pending: false,
                    error: false,
                  };
                }
                return m;
              });

              if (!replaced) {
                // 3) 신규 메시지 추가 (실시간 수신은 전부 친구로 표기)
                if (payload.messageId != null) seenServerIdsRef.current.add(payload.messageId);
                if (payload.clientMessageId) seenClientIdsRef.current.add(payload.clientMessageId);
                next.push(mapFromStompNew(payload));
              }

              return next;
            });
          } catch (err) {
            console.error('수신 메시지 파싱 실패:', err);
          }
        });
      },

      onStompError: (frame) => {
        console.error('[STOMP] error', frame.headers['message'], frame.body);
      },

      onWebSocketClose: (ev) => {
        connectedRef.current = false;
        console.warn('[STOMP] websocket closed', ev?.code, ev?.reason);
      },
    });

    stompRef.current = client;
    client.activate();

    return () => {
      try { subRef.current?.unsubscribe(); } catch {}
      subRef.current = null;

      try { client.deactivate(); } catch {}
      stompRef.current = null;
      connectedRef.current = false;

      console.log('[STOMP] deactivated');
    };
  }, [roomId, mapFromRest, mapFromStompNew]);

  /** ----- 메시지 추가 시 바닥 고정 ----- */
  useEffect(() => {
    if (pinnedRef.current) scrollToBottom(containerRef.current);
  }, [messages]);

  /** ----- 전송 ----- */
  const handleSend = useCallback(async () => {
    if (!input.trim() || !roomId) return;

    const text = input.trim();
    const now = new Date();
    const clientMessageId = `c-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;

    // 낙관적 UI (내가 보낸 텍스트만 'me')
    const optimistic: Message = {
      id: clientMessageId, // temp id
      sender: 'me',
      text,
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      pending: true,
      _clientMessageId: clientMessageId,
    };

    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    seenClientIdsRef.current.add(clientMessageId);

    try {
      const client = stompRef.current;
      if (!client || !connectedRef.current) throw new Error('STOMP not connected');

      const payload = {
        type: 'TEXT',
        content: text,
        clientMessageId, // 서버가 에코에 포함해주면 매칭 정확도 상승
      };

      console.log('[STOMP] >>> SEND', `/app/rooms/${roomId}/send`, payload);

      client.publish({
        destination: `/app/rooms/${roomId}/send`,
        body: JSON.stringify(payload),
        headers: { 'content-type': 'application/json' },
      });

      // 일정 시간 내 에코 수신이 없으면 실패 표기
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m._clientMessageId === clientMessageId && m.pending
              ? { ...m, pending: false, error: true }
              : m
          )
        );
      }, 8000);
    } catch (e) {
      console.error('메시지 전송 실패:', e);
      setMessages((prev) =>
        prev.map((m) =>
          m._clientMessageId === clientMessageId ? { ...m, pending: false, error: true } : m
        )
      );
    }
  }, [input, roomId]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  /** ----- 날짜별 그룹화 ----- */
  const groupedMessages = useMemo(() => {
    return messages.reduce<Record<string, Message[]>>((acc, msg) => {
      (acc[msg.date] ||= []).push(msg);
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
              const keyBase = msg._clientMessageId ?? msg.id ?? `${date}-${idx}`;
              return (
                <MessageBubble
                  key={`${date}-${msg.time}-${keyBase}`}
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
