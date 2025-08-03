import React from 'react';

interface HobbyChipsProps {
  hobbies: string[];
}

const HobbyChips: React.FC<HobbyChipsProps> = ({ hobbies }) => {
  return (
    <div className="flex justify-center items-center align-top gap-2 self-stretch flex-wrap">
      {hobbies.map((hobby, index) => (
        <div 
          key={index} 
          className="flex py-[6px] px-3 justify-center items-center rounded-[100px] bg-primary-200"
        >
          <div className="text-primary-700 text-center text-xs font-medium">
            {hobby}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HobbyChips;
