import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
  alarm: boolean;
}

export const HeaderSeoulmate: React.FC<TopBarProps> = ({ title, alarm }) => {
  const navigate = useNavigate();

  const handleAlarmClick = () => {
    navigate('/alarm');
  };
  return (
    <header className="fixed top-0 px-[18px] flex justify-between items-center bg-white border-b border-solid border-b-black-300 h-[60px] w-full max-w-[clamp(360px,100vw,430px)]">
      <h1 className="text-2xl font-yangjin text-primary-700 cursor-pointer">
        {title}
      </h1>
      <div>
        {alarm ? <div
          onClick={handleAlarmClick}
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"I658:3332;106:650\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"alarm-icon\" style=\"display: flex; width: 40px; height: 40px; padding: 8px; justify-content: center; align-items: center; gap: 8px; flex-shrink: 0\"> <path d=\"M12 21.5C12.6193 21.5008 13.2235 21.3086 13.7285 20.9502C14.2335 20.5917 14.6143 20.0849 14.818 19.5H9.182C9.38566 20.0849 9.76648 20.5917 10.2715 20.9502C10.7765 21.3086 11.3807 21.5008 12 21.5ZM19 15.086V10.5C19 7.283 16.815 4.573 13.855 3.758C13.562 3.02 12.846 2.5 12 2.5C11.154 2.5 10.438 3.02 10.145 3.758C7.185 4.574 5 7.283 5 10.5V15.086L3.293 16.793C3.10545 16.9805 3.00006 17.2348 3 17.5V18.5C3 18.7652 3.10536 19.0196 3.29289 19.2071C3.48043 19.3946 3.73478 19.5 4 19.5H20C20.2652 19.5 20.5196 19.3946 20.7071 19.2071C20.8946 19.0196 21 18.7652 21 18.5V17.5C20.9999 17.2348 20.8946 16.9805 20.707 16.793L19 15.086Z\" stroke=\"#1A1A1A\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path> </svg>",
          }}
          className='cursor-pointer'
        /> : ``}
      </div>
    </header>
  );
};
