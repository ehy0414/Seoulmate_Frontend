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

  const isEmpty = input.trim() === '';

  return (
    <div className="flex items-center mx-[16px] my-[18px]">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 border border-black-700 rounded-[8px] h-[45px] px-[16px] py-[13px] text-sm focus:outline-none"
        placeholder="메시지 보내기"
      />
      <button
        onClick={handleSend}
        className="ml-3 text-primary-700 text-xl"
        disabled={isEmpty}
      >
        <img src={SendIcon} alt="Send" className={`w-[45px] h-[45px] ${isEmpty ? 'grayscale' : ''}`} />
      </button>
    </div>
  );
};

export default ChatInput;
