import React from 'react';
import LanguageIcon from '../../assets/category/category-language.svg?react';
import ArtIcon from '../../assets/category/category-art.svg?react';
import Calendar from '../../assets/common/calender.svg?react';

interface QuickActionButtonProps {
  type: 'schedule' | 'hobby' | 'language';
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ type, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'schedule':
        return (
          <Calendar/>
        );
      case 'hobby':
        return (
          <ArtIcon fill='#FCE134'/>
        );
      case 'language':
        return (
          <LanguageIcon fill='#FCE134'/>
        );
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'schedule':
        return '모임 일정';
      case 'hobby':
        return '내 취미';
      case 'language':
        return '내 언어레벨';
    }
  };

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex h-20 flex-col justify-center items-center flex-shrink-0 w-[98px] gap-2`}
      >
        <div>{getIcon()}</div>
        <div className="self-stretch text-black text-center text-sm font-light leading-[19px]">
          {getLabel()}
        </div>
      </button>
    </div>
  );
};

const QuickActionButtons: React.FC = () => {
  const handleScheduleClick = () => {
    console.log('Schedule clicked');
  };

  const handleHobbyClick = () => {
    console.log('Hobby clicked');
  };

  const handleLanguageClick = () => {
    console.log('Language clicked');
  };

  return (
    <div className="flex w-full px-[18px] py-4 items-center gap-8 border-b-[3px] border-[#F3F2F2] h-28">
      <QuickActionButton type="schedule" onClick={handleScheduleClick} />
      <QuickActionButton type="hobby" onClick={handleHobbyClick} />
      <QuickActionButton type="language" onClick={handleLanguageClick} />
    </div>
  );
};

export default QuickActionButtons;
