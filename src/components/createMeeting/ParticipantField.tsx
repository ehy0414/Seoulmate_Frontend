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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={minParticipants ?? ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              // 숫자가 아닌 문자 제거
              const numericValue = inputValue.replace(/[^0-9]/g, '');
              
              if (numericValue === '') {
                onMinChange?.(null);
              } else {
                const numValue = Number(numericValue);
                // 1 이상의 양의 정수만 허용
                if (numValue >= 1) {
                  onMinChange?.(numValue);
                }
              }
            }}
            onKeyDown={(e) => {
              // 숫자, 백스페이스, 삭제, 탭, 화살표 키만 허용
              const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
              if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              // 붙여넣기 시 숫자만 허용
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericText = pastedText.replace(/[^0-9]/g, '');
              if (numericText && Number(numericText) >= 1) {
                onMinChange?.(Number(numericText));
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={maxParticipants ?? ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              // 숫자가 아닌 문자 제거
              const numericValue = inputValue.replace(/[^0-9]/g, '');
              
              if (numericValue === '') {
                onMaxChange?.(null);
              } else {
                const numValue = Number(numericValue);
                // 1 이상의 양의 정수만 허용
                if (numValue >= 1) {
                  onMaxChange?.(numValue);
                }
              }
            }}
            onKeyDown={(e) => {
              // 숫자, 백스페이스, 삭제, 탭, 화살표 키만 허용
              const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
              if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              // 붙여넣기 시 숫자만 허용
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericText = pastedText.replace(/[^0-9]/g, '');
              if (numericText && Number(numericText) >= 1) {
                onMaxChange?.(Number(numericText));
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
