import * as React from "react";

interface ChargeFieldProps {
  value?: number | null;
  onChange?: (value: number| null) => void;
}

export const ChargeField: React.FC<ChargeFieldProps> = ({
  value = null,
  onChange
}) => {
  return (
    <div className="w-full text-sm font-medium leading-none">
      <div className="text-black-700">
        참가비
      </div>
      <div className="flex items-center px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 min-h-[45px]">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value ?? ''}
          onChange={(e) => {
            const inputValue = e.target.value;
            // 숫자가 아닌 문자 제거
            const numericValue = inputValue.replace(/[^0-9]/g, '');
            
            if (numericValue === '') {
              onChange?.(null);
            } else {
              const numValue = Number(numericValue);
              if (numValue >= 0) {
                onChange?.(numValue);
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
            if (numericText) {
              onChange?.(Number(numericText));
            }
          }}
          placeholder="모임에서 받을 참가비를 입력하세요."
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-black-300"
        />
      </div>
    </div>
  );
};
