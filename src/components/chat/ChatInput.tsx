import React from 'react';
import SendIcon from '../../assets/chat/send_icon.png';

interface Props {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<Props> = ({ input, setInput, handleSend, handleKeyPress }) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; 
    handleKeyPress(e); 
  };
  return (
    <div className="border-t border-black-200 px-4 py-3 flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 border border-black-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        placeholder="메시지 보내기"
      />
      <button
        onClick={handleSend}
        className="ml-3 text-primary-700 text-xl"
      >
        <img src={SendIcon} alt="Send" className="w-[45px] h-[45px]" />
      </button>
    </div>
  );
};

export default ChatInput;
