import React, { useEffect, memo } from 'react';

interface Props {
  message: {
    sender: 'me' | 'friend';
    text: string;
    time: string;
    name?: string;        // ✅ 그룹일 때 표시
    profileImg?: string;
    pending?: boolean;
    error?: boolean;
  };
  marginTop?: string;
  isGroup?: boolean;      // ✅ 그룹 채팅 여부
}

/**
 * 그룹 채팅(UI 참고)
 * - 상대방 메시지에서, 보낸 사람이 바뀌는 첫 버블(부모가 marginTop='mt-5'로 주는 상황)에만 이름을 노출
 * - 이름은 아바타 위/좌측에 작은 글씨로 표시
 */
const MessageBubble: React.FC<Props> = memo(({ message, marginTop, isGroup = false }) => {
  const isMe = message.sender === 'me';
  const showName = !isMe && isGroup && marginTop === 'mt-5';

  useEffect(() => {
    if (message.pending) console.log(`[MessageBubble] "${message.text}" → 전송 중...`);
    if (message.error) console.log(`[MessageBubble] "${message.text}" → 전송 실패`);
  }, [message.pending, message.error, message.text]);

  // 좌측(상대방) 레이아웃: 아바타 + (이름 + 말풍선 + 시각)
  if (!isMe) {
    return (
      <div className={`flex items-start justify-start gap-2 ${marginTop ?? ''}`}>
        {/* 아바타 */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-black-400 shrink-0">
          {message.profileImg ? (
            <img src={message.profileImg} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-black-400 rounded-full" />
          )}
        </div>

        {/* 이름 + 버블 + 시간 */}
        <div className="flex flex-col items-start">
          {showName && (
            <div className="text-xs text-black-500 ml-1 mb-1">{message.name ?? ''}</div>
          )}
          <div className="flex items-end gap-2">
            <div className="max-w-[70%] px-4 py-2 rounded-md text-sm bg-[#F3F2F2] text-black-700 rounded-bl-none">
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
            <div className="text-xs text-black-400 mb-[4px]">{message.time}</div>
          </div>
        </div>
      </div>
    );
  }

  // 우측(내 메시지) 레이아웃: 시간 + 말풍선
  return (
    <div className={`flex items-end justify-end gap-2 ${marginTop ?? ''}`}>
      <div className="text-xs text-black-400 mb-[4px]">{message.time}</div>
      <div className="max-w-[70%] px-4 py-2 rounded-md text-sm bg-primary-700 text-white rounded-br-none">
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';
export default MessageBubble;
