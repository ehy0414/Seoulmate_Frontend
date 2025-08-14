import React, { useState } from 'react';

interface LanguageLevelSliderProps {
  koreanLevel: [number, number];
  englishLevel: [number, number];
  onKoreanLevelChange: (level: [number, number]) => void;
  onEnglishLevelChange: (level: [number, number]) => void;
}

const LanguageLevelSlider: React.FC<LanguageLevelSliderProps> = ({
  koreanLevel,
  englishLevel,
  onKoreanLevelChange,
  onEnglishLevelChange,
}) => {
  const [isDragging, setIsDragging] = useState<{
    type: 'korean' | 'english';
    handle: 'min' | 'max';
  } | null>(null);

  const handleSliderChange = (
    type: 'korean' | 'english',
    handle: 'min' | 'max',
    value: number
  ) => {
    const currentLevel = type === 'korean' ? koreanLevel : englishLevel;
    const onChange = type === 'korean' ? onKoreanLevelChange : onEnglishLevelChange;
    
    let newLevel: [number, number];
    if (handle === 'min') {
      newLevel = [Math.min(value, currentLevel[1]), currentLevel[1]];
    } else {
      newLevel = [currentLevel[0], Math.max(value, currentLevel[0])];
    }
    
    onChange(newLevel);
  };

  const getSliderPosition = (value: number) => {
    return (value / 100) * 327 + 15;
  };

  const SliderSection: React.FC<{
    title: string;
    level: [number, number];
    onChange: (level: [number, number]) => void;
    type: 'korean' | 'english';
  }> = ({ title, level, onChange, type }) => (
    <div className="flex flex-col gap-3">
      <div className="text-base font-medium text-black-700 font-sans">
        {title}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-1">
          <div className="flex p-2 flex-col justify-center items-center gap-2 rounded-[8px] border border-black-700">
            <div className="text-base font-bold text-black font-sans">
              {level[0]}
            </div>
          </div>
          <div className="text-base font-medium text-black font-sans">
            ~
          </div>
          <div className="flex p-2 flex-col justify-center items-center gap-2 rounded-[8px] border border-black-700">
            <div className="text-base font-bold text-black font-sans">
              {level[1]}
            </div>
          </div>  
          <div className="text-base font-medium text-black font-sans">
            점
          </div>
        </div>
        <div className="relative h-8 w-full">
          <svg
            width="357"
            height="30"
            viewBox="0 0 357 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8"
          >
            <g clipPath="url(#clip0)">
              <rect width="327" height="4" transform="translate(15 13)" fill="#E9E6E6"/>
              <rect 
                width={((level[1] - level[0]) / 100) * 327} 
                height="4" 
                transform={`translate(${getSliderPosition(level[0])} 13)`} 
                fill="#4C8ACD"
              />
            </g>
            <circle 
              cx={getSliderPosition(level[0])} 
              cy="15" 
              r="14.5" 
              fill="#FBFBFB" 
              stroke="#7A7272"
              style={{ cursor: 'pointer' }}
              onMouseDown={() => setIsDragging({ type, handle: 'min' })}
            />
            <circle 
              cx={getSliderPosition(level[1])} 
              cy="15" 
              r="14.5" 
              fill="#FBFBFB" 
              stroke="#7A7272"
              style={{ cursor: 'pointer' }}
              onMouseDown={() => setIsDragging({ type, handle: 'max' })}
            />
            <defs>
              <clipPath id="clip0">
                <rect width="327" height="4" fill="white" transform="translate(15 13)"/>
              </clipPath>
            </defs>
          </svg>
          
          <input
            type="range"
            min="0"
            max="100"
            value={level[0]}
            onChange={(e) => handleSliderChange(type, 'min', parseInt(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: 1 }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={level[1]}
            onChange={(e) => handleSliderChange(type, 'max', parseInt(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: 2 }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 bg-white">
      <SliderSection
        title="한국어 레벨"
        level={koreanLevel}
        onChange={onKoreanLevelChange}
        type="korean"
      />
      <SliderSection
        title="영어 레벨"
        level={englishLevel}
        onChange={onEnglishLevelChange}
        type="english"
      />
    </div>
  );
};

export default LanguageLevelSlider;
