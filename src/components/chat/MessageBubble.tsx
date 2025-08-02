// src/components/chat/MessageBubble.tsx
import React from 'react';

interface Props {
  message: {
    sender: 'me' | 'friend';
    text: string;
    time: string;
  };
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-md text-sm ${
          isMe
            ? 'bg-primary-700 text-white rounded-bl-none mb-[4px]'
            : 'bg-[#F3F2F2] text-black-700 rounded-br-none mb-[4px]'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <div className={`text-xs text-black-400 text-right mt-1`}>
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
