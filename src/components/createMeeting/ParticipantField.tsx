import * as React from "react";

interface ParticipantFieldProps {
  minParticipants?: number | null;
  maxParticipants?: number | null;
  onMinChange?: (value: number | null) => void;
  onMaxChange?: (value: number | null) => void;
}

export const ParticipantField: React.FC<ParticipantFieldProps> = ({
  minParticipants = null,
  maxParticipants = null,
  onMinChange,
  onMaxChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">
        인원수
      </div>
      <div className="flex items-center gap-3 mt-2">
        {/* 최소 인원 입력 */}
        <div className="flex items-center px-4 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
          <input
            type="number"
            value={minParticipants ?? ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === '') {
                onMinChange?.(null);
              } else {
                const numValue = Number(inputValue);
                // 1 이상의 양의 정수만 허용
                if (numValue >= 1 && Number.isInteger(numValue)) {
                  onMinChange?.(numValue);
                }
              }
            }}
            onKeyDown={(e) => {
              // 음수, 소수점, e, + 등의 입력 방지
              if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault();
              }
            }}
            placeholder="최소인원"
            className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
          />
        </div>
        
        {/* 구분자 */}
        <div className="text-black-600 text-base font-medium">~</div>
        
        {/* 최대 인원 입력 */}
        <div className="flex items-center px-4 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
          <input
            type="number"
            value={maxParticipants ?? ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === '') {
                onMaxChange?.(null);
              } else {
                const numValue = Number(inputValue);
                // 1 이상의 양의 정수만 허용
                if (numValue >= 1 && Number.isInteger(numValue)) {
                  onMaxChange?.(numValue);
                }
              }
            }}
            onKeyDown={(e) => {
              // 음수, 소수점, e, + 등의 입력 방지
              if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault();
              }
            }}
            placeholder="최대인원"
            className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
          />
        </div>
      </div>
      <div className="text-xs text-black-400 font-[500] mt-2">
        모임에 참여할 최소, 최대 인원 수를 입력하세요.
      </div>
    </div>
  );
};
