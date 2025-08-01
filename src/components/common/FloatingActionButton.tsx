import React from 'react';
import PlusIcon from '../../assets/common/plus.svg';

interface FloatingActionButtonProps {
    onClick?: () => void;
    className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, className = '' }) => {
    return (
        <div className={`fixed bottom-[78px] right-[18px] ${className}`}>
            <button 
                onClick={onClick}
                className="w-[50px] h-[50px] bg-[#F45F3A] rounded-full flex items-center justify-center shadow-lg"
            >
                <img src={PlusIcon} alt='플로팅 버튼' />
            </button>
        </div>
    );
};

export default FloatingActionButton;