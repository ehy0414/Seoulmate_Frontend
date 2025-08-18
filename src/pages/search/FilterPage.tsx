import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import LevelSlider from '../../components/search/LevelSlider';
import { HeaderDetail } from '../../components/common/HeaderDetail';
import { filterAtom } from '../../store/filterAtom';
import type { FilterState } from '../../store/filterAtom';

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

  const handleKoreanLevelChange = (level: [number, number]) => {
    setFilter(prev => ({
      ...prev,
      koreanLevel: level
    }));
  };

  const handleEnglishLevelChange = (level: [number, number]) => {
    setFilter(prev => ({
      ...prev,
      englishLevel: level
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
      
      {/* 적용하기 버튼 */}
      <div className="px-[18px] py-[16px] bg-white">
        <button
          onClick={handleApplyFilter}
          className="w-full h-[50px] bg-[#FF6E49] text-black-100 text-base font-medium rounded-[8px]"
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default FilterPage;
