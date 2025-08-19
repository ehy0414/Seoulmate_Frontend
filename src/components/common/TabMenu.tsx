import React from 'react';

interface TabMenuProps {
  firstTabText: string;
  secondTabText: string;
  activeTab: string;
  onFirstTabClick: () => void;
  onSecondTabClick: () => void;
}

const TabMenu: React.FC<TabMenuProps> = ({
  firstTabText,
  secondTabText,
  activeTab,
  onFirstTabClick,
  onSecondTabClick
}) => {
  return (
    <div className="flex relative">
      {/* 애니메이션되는 하단 선 */}
      <div 
        className={`absolute bottom-0 w-1/2 h-[3px] bg-[#F45F3A] transition-transform duration-300 ease-in-out ${
          activeTab === secondTabText ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      
      <button
        onClick={onFirstTabClick}
        className={`flex-1 py-3 text-center text-sm ${
          activeTab === firstTabText
            ? 'text-black-700 font-[600]'
            : 'text-black-600 font-[500] border-b border-black-400'
        }`}
      >       
        {firstTabText}
      </button>
      <button
        onClick={onSecondTabClick}
        className={`flex-1 py-3 text-center text-sm ${
          activeTab === secondTabText
            ? 'text-black-700 font-[600]'
            : 'text-black-600 font-[500] border-b border-black-400'
        }`}
      >
        {secondTabText}
      </button>
    </div>
  );
};

export default TabMenu;
