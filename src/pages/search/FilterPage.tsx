import React, { useState } from 'react';
import LanguageLevelSlider from '../../components/search/LanguageLevelSlider';
import { HeaderDetail } from '../../components/common/HeaderDetail';

const FilterPage: React.FC = () => {
  const [koreanLevel, setKoreanLevel] = useState<[number, number]>([0, 100]);
  const [englishLevel, setEnglishLevel] = useState<[number, number]>([0, 100]);

  return (
    <div className="bg-white">
      <HeaderDetail title="필터" alarm={false} />
      <div className="mt-[60px] bg-white px-[18px] py-[20px]">
        <LanguageLevelSlider
          koreanLevel={koreanLevel}
          englishLevel={englishLevel}
          onKoreanLevelChange={setKoreanLevel}
          onEnglishLevelChange={setEnglishLevel}
        />
      </div>
    </div>
  );
};

export default FilterPage;
