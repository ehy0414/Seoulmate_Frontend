import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/common/back-arrow.svg';

interface NoAlarmBackHeaderProps {
  title: string;
  onBackClick?: () => void;
}

const NoAlarmBackHeader: React.FC<NoAlarmBackHeaderProps> = ({ 
  title, 
  onBackClick 
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center px-[18px] w-full bg-white border-b border-solid border-black-300 h-[60px]">
      <button
        onClick={handleBackClick}
        className="flex justify-center items-center w-6 h-6"
      >
        <img src={BackArrow} alt="뒤로가기"/>
      </button>
      <div className="text-base font-bold text-black-700 mx-auto pr-6">
        {title}
      </div>
    </div>
  );
};

export default NoAlarmBackHeader;
