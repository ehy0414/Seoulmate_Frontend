import React, { useState, useEffect } from 'react';
import { isDefaultFilter } from '../../utils/filterUtils';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import LevelSlider from '../../components/search/LevelSlider';
import { HeaderDetail } from '../../components/common/HeaderDetail';
import { filterAtom } from '../../store/filterAtom';
import type { FilterState } from '../../store/filterAtom';
import { AnimatePresence, motion } from 'framer-motion';

const FilterPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useAtom(filterAtom);
  
  // 페이지 진입 시 원래 값을 백업
  const [originalFilter, setOriginalFilter] = useState<FilterState>(filter);

  useEffect(() => {
    setOriginalFilter(filter);
  }, []);

  const handleBackClick = () => {
    // 뒤로가기 시 원래 값으로 복구
    setFilter(originalFilter);
    navigate(-1);
  };

  // 하나만 선택 가능: 한 슬라이더를 조정하면 다른 슬라이더는 전체로 초기화
  const handleKoreanLevelChange = (level: [number, number]) => {
    setFilter(prev => ({
      ...prev,
      koreanLevel: level,
      englishLevel: [0, 100]
    }));
  };

  const handleEnglishLevelChange = (level: [number, number]) => {
    setFilter(prev => ({
      ...prev,
      englishLevel: level,
      koreanLevel: [0, 100]
    }));
  };

  const handleApplyFilter = () => {
    // 현재 상태 그대로 유지하고 페이지 이동
    navigate(-1);
  };

  return (
    <div className="bg-white flex flex-col" style={{ height: '100dvh' }}>
      <HeaderDetail title="필터" alarm={false} onBackClick={handleBackClick} />
      <div className="mt-[60px] bg-white px-[18px] py-[20px] flex flex-col gap-10 flex-1">
        <LevelSlider
          title="한국어 레벨"
          level={filter.koreanLevel}
          onChange={handleKoreanLevelChange}
        />
        <LevelSlider
          title="영어 레벨"
          level={filter.englishLevel}
          onChange={handleEnglishLevelChange}
        />
      </div>
      {/* 적용하기 버튼 영역 */}
      <div className={`px-[18px] py-[16px] bg-white flex ${!isDefaultFilter(filter) ? 'gap-[17px]' : ''} w-full`}>
        <AnimatePresence mode="wait">
          {!isDefaultFilter(filter) && (
            <motion.button
              key="reset"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              onClick={() => setFilter({ koreanLevel: [0, 100], englishLevel: [0, 100] })}
              style={{ width: 129 }}
              className="h-[50px] bg-transparent border border-primary-600 text-primary-700 text-base font-medium rounded-[8px]"
            >
              초기화
            </motion.button>
          )}
          <motion.button
            key={isDefaultFilter(filter) ? 'apply-full' : 'apply'}
            layout
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onClick={handleApplyFilter}
            className={`h-[50px] bg-[#FF6E49] text-black-100 text-base font-medium rounded-[8px] ${isDefaultFilter(filter) ? 'w-full' : ''}`}
            style={!isDefaultFilter(filter) ? { width: 211 } : {}}
          >
            적용하기
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterPage;