import React, { useRef, useState, useEffect } from 'react';

interface LevelSliderProps {
  title: string;
  level: [number, number];
  onChange: (level: [number, number]) => void;
}

const LevelSlider: React.FC<LevelSliderProps> = ({
  title,
  level,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [inputValues, setInputValues] = useState({
    min: level[0].toString(),
    max: level[1].toString()
  });

  // level prop이 변경되면 inputValues 동기화
  useEffect(() => {
    setInputValues({
      min: level[0].toString(),
      max: level[1].toString()
    });
  }, [level]);

  const handleSliderChange = (
    handle: 'min' | 'max',
    value: number
  ) => {
    let newLevel: [number, number];
    if (handle === 'min') {
      newLevel = [Math.min(value, level[1]), level[1]];
    } else {
      newLevel = [level[0], Math.max(value, level[0])];
    }
    
    onChange(newLevel);
    
    // 입력값도 동기화
    setInputValues({
      min: newLevel[0].toString(),
      max: newLevel[1].toString()
    });
  };

  const handleSliderClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let clickX: number;
    
    // 마우스 이벤트인지 터치 이벤트인지 구분
    if ('clientX' in e) {
      // 마우스 이벤트
      clickX = e.clientX - rect.left;
    } else {
      // 터치 이벤트
      clickX = e.touches[0].clientX - rect.left;
    }
    
    const sliderWidth = rect.width;
    
    // 4% 여백을 고려한 실제 사용 가능한 영역
    const usableWidth = sliderWidth * 0.92; // 92% (100% - 8%)
    const leftMargin = sliderWidth * 0.04; // 4%
    
    // 클릭 위치를 0-100 범위로 변환
    const clickPosition = Math.max(0, Math.min(100, 
      ((clickX - leftMargin) / usableWidth) * 100
    ));
    
    // 현재 핸들들의 위치와의 거리 계산
    const distanceToMin = Math.abs(clickPosition - level[0]);
    const distanceToMax = Math.abs(clickPosition - level[1]);
    
    // 더 가까운 핸들을 움직임
    if (distanceToMin < distanceToMax) {
      handleSliderChange('min', Math.round(clickPosition));
    } else {
      handleSliderChange('max', Math.round(clickPosition));
    }
  };

  const handleInputChange = (handle: 'min' | 'max', value: string) => {
    // 숫자만 허용 (0-9만 입력 가능)
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // 입력값을 상태에 저장
    setInputValues(prev => ({
      ...prev,
      [handle]: numericValue
    }));
    
    // 빈 문자열인 경우 슬라이더는 업데이트하지 않음
    if (numericValue === '') {
      return;
    }
    
    const numValue = Number(numericValue);
    
    // 0-100 범위로 제한
    const clampedValue = Math.max(0, Math.min(100, Math.floor(numValue)));
    
    // 슬라이더 값 업데이트
    if (handle === 'min') {
      onChange([clampedValue, level[1]]);
    } else {
      onChange([level[0], clampedValue]);
    }
  };

  const handleInputBlur = (handle: 'min' | 'max', value: string) => {
    // 숫자만 남기기
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // 포커스를 잃을 때 빈 값이면 기본값으로 설정
    if (numericValue === '') {
      if (handle === 'min') {
        onChange([0, level[1]]);
        setInputValues(prev => ({ ...prev, min: '0' }));
      } else {
        onChange([level[0], 100]);
        setInputValues(prev => ({ ...prev, max: '100' }));
      }
      return;
    }
    
    const numValue = Number(numericValue);
    const clampedValue = Math.max(0, Math.min(100, Math.floor(numValue)));
    
    // 범위 검증 후 값 설정
    if (handle === 'min') {
      // 최솟값이 최댓값보다 크면 0~100으로 되돌리기
      if (clampedValue > level[1]) {
        onChange([0, 100]);
        setInputValues({ min: '0', max: '100' });
      }
    } else {
      // 최댓값이 최솟값보다 작으면 0~100으로 되돌리기
      if (clampedValue < level[0]) {
        onChange([0, 100]);
        setInputValues({ min: '0', max: '100' });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-medium text-black-700 font-sans">
        {title}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-1">
          <div className="flex p-2 flex-col justify-center items-center gap-2 rounded-[8px] border border-black-700">
            <input
              type="text"
              value={inputValues.min}
              onChange={(e) => handleInputChange('min', e.target.value)}
              onBlur={(e) => handleInputBlur('min', e.target.value)}
              placeholder="0"
              className="text-base font-bold text-black font-sans bg-transparent border-none outline-none w-8 text-center placeholder-black"
            />
          </div>
          <div className="text-base font-medium text-black font-sans">
            ~
          </div>
          <div className="flex p-2 flex-col justify-center items-center gap-2 rounded-[8px] border border-black-700">
            <input
              type="text"
              value={inputValues.max}
              onChange={(e) => handleInputChange('max', e.target.value)}
              onBlur={(e) => handleInputBlur('max', e.target.value)}
              placeholder="100"
              className="text-base font-bold text-black font-sans bg-transparent border-none outline-none w-8 text-center placeholder-black"
            />
          </div>  
          <div className="text-base font-medium text-black font-sans">
            점
          </div>
        </div>
        <div className="relative h-8 w-full" ref={sliderRef} onClick={handleSliderClick} onTouchStart={handleSliderClick}>
          {/* 슬라이더 트랙 (배경 바) */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
          
          {/* 활성 구간 (파란색 바) */}
          <div 
            className="absolute top-1/2 h-1 bg-blue-500 rounded-full transform -translate-y-1/2 pointer-events-none"
            style={{
              left: `${4 + (level[0] / 100) * (100 - 8)}%`,
              width: `${((level[1] - level[0]) / 100) * (100 - 8)}%`
            }}
          ></div>
          
          {/* 왼쪽 핸들 (최소값) */}
          <div 
            className="absolute top-1/2 w-[30px] h-[30px] bg-white border rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 pointer-events-none shadow-md hover:shadow-lg transition-shadow"
            style={{ 
              left: `${4 + (level[0] / 100) * (100 - 8)}%`,
              borderColor: 'rgba(122, 114, 114, 1)'
            }}
          ></div>
          
          {/* 오른쪽 핸들 (최대값) */}
          <div 
            className="absolute top-1/2 w-[30px] h-[30px] bg-white border rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 pointer-events-none shadow-md hover:shadow-lg transition-shadow"
            style={{ 
              left: `${4 + (level[1] / 100) * (100 - 8)}%`,
              borderColor: 'rgba(122, 114, 114, 1)'
            }}
          ></div>
          
          {/* 개별 핸들 드래그 영역 */}
          <div
            className="absolute top-0 w-8 h-full cursor-pointer"
            style={{ 
              left: `calc(${4 + (level[0] / 100) * (100 - 8)}% - 16px)`,
              zIndex: 3
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              const handleDrag = (moveEvent: MouseEvent) => {
                if (!sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const moveX = moveEvent.clientX - rect.left;
                const usableWidth = rect.width * 0.92;
                const leftMargin = rect.width * 0.04;
                const newValue = Math.max(0, Math.min(100, 
                  ((moveX - leftMargin) / usableWidth) * 100
                ));
                handleSliderChange('min', Math.round(newValue));
              };

              const stopDrag = () => {
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', stopDrag);
              };

              document.addEventListener('mousemove', handleDrag);
              document.addEventListener('mouseup', stopDrag);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const moveX = moveEvent.touches[0].clientX - rect.left;
                const usableWidth = rect.width * 0.92;
                const leftMargin = rect.width * 0.04;
                const newValue = Math.max(0, Math.min(100, 
                  ((moveX - leftMargin) / usableWidth) * 100
                ));
                handleSliderChange('min', Math.round(newValue));
              };

              const stopTouchDrag = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', stopTouchDrag);
              };

              document.addEventListener('touchmove', handleTouchMove);
              document.addEventListener('touchend', stopTouchDrag);
            }}
          />
          
          <div
            className="absolute top-0 w-8 h-full cursor-pointer"
            style={{ 
              left: `calc(${4 + (level[1] / 100) * (100 - 8)}% - 16px)`,
              zIndex: 4
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              const handleDrag = (moveEvent: MouseEvent) => {
                if (!sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const moveX = moveEvent.clientX - rect.left;
                const usableWidth = rect.width * 0.92;
                const leftMargin = rect.width * 0.04;
                const newValue = Math.max(0, Math.min(100, 
                  ((moveX - leftMargin) / usableWidth) * 100
                ));
                handleSliderChange('max', Math.round(newValue));
              };

              const stopDrag = () => {

                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', stopDrag);
              };

              document.addEventListener('mousemove', handleDrag);
              document.addEventListener('mouseup', stopDrag);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const moveX = moveEvent.touches[0].clientX - rect.left;
                const usableWidth = rect.width * 0.92;
                const leftMargin = rect.width * 0.04;
                const newValue = Math.max(0, Math.min(100, 
                  ((moveX - leftMargin) / usableWidth) * 100
                ));
                handleSliderChange('max', Math.round(newValue));
              };

              const stopTouchDrag = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', stopTouchDrag);
              };

              document.addEventListener('touchmove', handleTouchMove);
              document.addEventListener('touchend', stopTouchDrag);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelSlider;
