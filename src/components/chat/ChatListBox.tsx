import React from 'react';

interface ChatListBoxProps {
  name?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  profileImage?: string;
  onClick?: () => void;
}

const ChatListBox: React.FC<ChatListBoxProps> = ({
  name = "name",
  lastMessage = "마지막 채팅 내용",
  timestamp = "07/30 14:08",
  unreadCount = 0,
  profileImage,
  onClick
}) => {
    return (
        <div 
            className='flex w-full px-[18px] py-4 items-center gap-5 border-b-[0.5px] border-black-400 h-[82px] cursor-pointer hover:bg-gray-50 transition-colors'
            onClick={onClick}
        >
            {/* Profile Image */}
            <div className='w-[50px] h-[50px] flex-shrink-0 rounded-full bg-black-200 flex items-center justify-center overflow-hidden'>
                {profileImage ? (
                    <img 
                        src={profileImage} 
                        alt={`${name} 프로필`}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="50" height="50" rx="25" fill="#E9E6E6"/>
                        <path d="M25 30C26.9968 30 28.9488 29.4135 30.6091 28.3147C32.2694 27.2159 33.5635 25.6541 34.3276 23.8268C35.0918 21.9996 35.2917 19.9889 34.9022 18.0491C34.5126 16.1093 33.551 14.3275 32.1391 12.9289C30.7271 11.5304 28.9281 10.578 26.9697 10.1922C25.0112 9.8063 22.9812 10.0043 21.1364 10.7612C19.2915 11.5181 17.7147 12.7998 16.6054 14.4443C15.496 16.0888 14.9038 18.0222 14.9038 20C14.9038 22.6522 15.9675 25.1957 17.8609 27.0711C19.7543 28.9464 22.3223 30 25 30ZM25 32.8571C18.7422 32.8571 6.25 36.6857 6.25 44.2857V50H43.75V44.2857C43.75 36.6857 31.2578 32.8571 25 32.8571Z" fill="#AFA9A9"/>
                    </svg>
                )}
            </div>

            {/* Chat Content */}
            <div className='flex justify-end items-start gap-5 flex-1'>
                <div className='flex flex-col items-start gap-1 flex-1'>
                    {/* Name */}
                    <div className='self-stretch text-black text-[16px] font-medium text-base font-sans'>
                        {name}
                    </div>
                    {/* Last Message */}
                    <div className='self-stretch text-black text-[14px] font-light leading font-sans'>
                        {lastMessage}
                    </div>
                </div>

                {/* Info Section */}
                <div className='flex flex-col justify-center items-end gap-1'>
                    {/* Timestamp */}
                    <div className='text-black font-light text-[12px]'>
                        {timestamp}
                    </div>
                    {/* Notification Badge */}
                    <div className='flex h-[18px] px-0 py-[2px] justify-center items-center rounded-full bg-primary-700'>
                        <div className='w-[30px] flex-shrink-0 text-black-100 text-center font-light text-xs'>
                            {unreadCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatListBox;
    