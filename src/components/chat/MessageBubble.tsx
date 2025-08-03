import React from 'react';

interface Props {
  message: {
    sender: 'me' | 'friend';
    text: string;
    time: string;
    profileImg?: string;
  };
  marginTop?: string;
}

const MessageBubble: React.FC<Props> = ({ message, marginTop }) => {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'} gap-2 ${marginTop}`}>
      {!isMe && (
        <>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-black-400 shrink-0">
            {message.profileImg ? (
              <img
                src={message.profileImg}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black-400 rounded-full" />
            )}
          </div>

          <div className="max-w-[70%] px-4 py-2 rounded-md text-sm bg-[#F3F2F2] text-black-700 rounded-br-none">
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          </div>

          <div className="text-xs text-black-400 mb-[4px]">{message.time}</div>

        </>
      )}

      {isMe && (
        <>
          <div className="text-xs text-black-400 mb-[4px]">{message.time}</div>

          <div className="max-w-[70%] px-4 py-2 rounded-md text-sm bg-primary-700 text-white rounded-bl-none">
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageBubble;
