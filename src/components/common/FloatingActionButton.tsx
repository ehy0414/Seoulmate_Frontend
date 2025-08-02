import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../../assets/common/plus.svg';

interface FloatingActionButtonProps {
    className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ className = '' }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create-meeting');
    };

    return (
        <div className={`fixed bottom-[78px] right-[18px] ${className}`}>
            <button 
                onClick={handleClick}
                className="w-[50px] h-[50px] bg-[#F45F3A] rounded-full flex items-center justify-center shadow-lg"
            >
                <img src={PlusIcon} alt='플로팅 버튼' />
            </button>
        </div>
    );
};

export default FloatingActionButton;