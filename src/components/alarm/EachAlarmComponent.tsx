import React from 'react';

interface EachAlarmComponentProps {
  title: string;
  subtitle: string;
  timestamp: string;
  isUnread: boolean;
  profileImage: string | undefined;
  onClick?: () => void;
}

const EachAlarmComponent: React.FC<EachAlarmComponentProps> = ({
  title,
  subtitle,
  timestamp,
  isUnread,
  profileImage,
  onClick
}) => {
  return (
    <div
      className="flex w-full px-[18px] py-4 items-start justify-between border-b-[0.5px] border-black-400 cursor-pointer"
      onClick={onClick}
    >
      {/* Profile Avatar */}
      <div className="w-[50px] h-[50px] flex-shrink-0  bg-black-200 rounded-full flex items-center justify-center">
        {profileImage ? (
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <svg 
            width="50" 
            height="50" 
            viewBox="0 0 50 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect width="50" height="50" rx="25" fill="#E9E6E6"/>
            <path 
              d="M25 30C26.9968 30 28.9488 29.4135 30.6091 28.3147C32.2694 27.2159 33.5635 25.6541 34.3276 23.8268C35.0918 21.9996 35.2917 19.9889 34.9022 18.0491C34.5126 16.1093 33.551 14.3275 32.1391 12.9289C30.7271 11.5304 28.9281 10.578 26.9697 10.1922C25.0112 9.8063 22.9812 10.0043 21.1364 10.7612C19.2915 11.5181 17.7147 12.7998 16.6054 14.4443C15.496 16.0888 14.9038 18.0222 14.9038 20C14.9038 22.6522 15.9675 25.1957 17.8609 27.0711C19.7543 28.9464 22.3223 30 25 30ZM25 32.8571C18.7422 32.8571 6.25 36.6857 6.25 44.2857V50H43.75V44.2857C43.75 36.6857 31.2578 32.8571 25 32.8571Z" 
              fill="#AFA9A9"
            />
          </svg>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-start justify-center flex-1 mx-5">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="w-full text-black text-base font-medium font-sans">
            {title}
          </div>
          <div className="w-full text-black text-sm font-[300]  leading-[19px]">
            {subtitle}
          </div>
        </div>

        {/* Timestamp */}
        <div className="w-full text-black text-xs font-medium font-sans mt-2">
          {timestamp}
        </div>
      </div>

      {/* Unread Indicator */}
      <div className="flex items-start justify-center">
        {isUnread && (
          <svg 
            width="6" 
            height="6" 
            viewBox="0 0 6 6" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[6px] h-[6px] flex-shrink-0 mt-1"
          >
            <circle cx="3" cy="3" r="3" fill="#F45F3A"/>
          </svg>
        )}
      </div>
    </div>
  );
};

export default EachAlarmComponent;
