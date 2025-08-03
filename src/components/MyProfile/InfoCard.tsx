import React from 'react';

interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  items: InfoItem[];
}

const InfoCard: React.FC<InfoCardProps> = ({ items }) => {
  return (
    <div className="flex w-full flex-col justify-center items-start rounded-[8px] border border-black-200 bg-black-100">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`flex py-4 px-[18px] flex-col items-start gap-[10px] self-stretch ${
            index < items.length - 1 ? 'border-b-[0.5px] border-black-200' : ''
          }`}
        >
          <div className="self-stretch text-black text-sm font-semibold leading-[19px]">
            {item.label}
          </div>
          <div className="self-stretch text-black-600 text-sm font-medium leading-[19px]">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
