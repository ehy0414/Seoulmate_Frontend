import { useState, useEffect, useRef } from "react";
import DropdownTriangle from '../../assets/common/dropdown-triangle.svg?react';

// 스크롤바 숨기기 스타일
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface LanguageDropdownProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const languages = [
  "한국어",
  "영어",
  "일본어",
  "중국어",
  "베트남어"
];

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  value = [],
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (language: string) => {
    const currentValues = value || [];
    let newValues;
    
    if (currentValues.includes(language)) {
      // 이미 선택된 경우 제거
      newValues = currentValues.filter(item => item !== language);
    } else {
      // 선택되지 않은 경우 추가
      newValues = [...currentValues, language];
    }
    
    onChange?.(newValues);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setRotation(prev => prev + 180);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>{hideScrollbarStyle}</style>
      <div className="flex flex-col justify-center w-full text-sm font-medium" ref={dropdownRef}>
      <div className="text-black-700">
        언어
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="flex justify-between items-center h-[45px] px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 text-black-300"
        >
          <span className={`self-stretch my-auto ${value && value.length > 0 ? "text-black-700" : "text-stone-300"}`}>
            {value && value.length > 0 ? value.join(', ') : "모임에서 사용할 언어를 선택해주세요"}
          </span>
          <DropdownTriangle
            className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2] fill-stone-200 transition-transform duration-200"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-4 bg-white border border-black-600 rounded-[8px] shadow-lg z-10 max-h-[225px] overflow-y-auto hide-scrollbar"
            role="listbox"
          >
            {languages.map((language) => {
              const isSelected = value?.includes(language) || false;
              return (
                <button
                  key={language}
                  onClick={() => handleSelect(language)}
                  className={`w-full text-black-700 flex text-left px-4 h-[45px] bg-black-100 text-sm border-b-[0.5px] border-black-700 items-center gap-3`}
                  role="option"
                >
                  <div 
                    className={`w-5 h-5 rounded-[4px] flex items-center justify-center ${
                      isSelected 
                        ? "bg-primary-700 border-primary-700" 
                        : "border border-black-600"
                    }`}
                  >
                    {isSelected && (
                      <svg 
                        className="w-2.5 h-2.5 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        /> 
                      </svg>
                    )}
                  </div>
                  <span>{language}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
};
