import React from 'react';
import PlusIcon from '../../assets/common/plus.svg';
import { useNavigate } from 'react-router-dom';

interface FloatingActionButtonProps {
    onClick?: () => void;
    className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, className = '' }) => {
    const navigate = useNavigate();
    return (
        <div className={`fixed bottom-[78px] right-[18px] ${className}`}>
            <button 
                onClick={onClick}
                className="w-[50px] h-[50px] bg-[#F45F3A] rounded-full flex items-center justify-center shadow-lg"
            >
                <img src={PlusIcon} onClick={()=>navigate('/create-meeting')} />
            </button>
        </div>
    );
};

export default FloatingActionButton;