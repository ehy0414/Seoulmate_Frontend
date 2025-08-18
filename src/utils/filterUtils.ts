import type { FilterState } from '../store/filterAtom';

// 필터가 기본값인지 확인하는 함수
export const isDefaultFilter = (filter: FilterState): boolean => {
  return filter.koreanLevel[0] === 0 && 
         filter.koreanLevel[1] === 100 && 
         filter.englishLevel[0] === 0 && 
         filter.englishLevel[1] === 100;
};

// 필터 텍스트를 생성하는 함수
export const generateFilterText = (filter: FilterState): string[] => {
  const texts: string[] = [];
  
  // 한국어 레벨 텍스트 생성
  const { koreanLevel, englishLevel } = filter;
  
  if (koreanLevel[0] !== 0 || koreanLevel[1] !== 100) {
    if (koreanLevel[0] === koreanLevel[1]) {
      texts.push(`한국어 ${koreanLevel[0]}점`);
    } else if (koreanLevel[0] === 0) {
      texts.push(`한국어 ${koreanLevel[1]}점 이하`);
    } else if (koreanLevel[1] === 100) {
      texts.push(`한국어 ${koreanLevel[0]}점 이상`);
    } else {
      texts.push(`한국어 ${koreanLevel[0]}점 이상 ${koreanLevel[1]}점 미만`);
    }
  }
  
  // 영어 레벨 텍스트 생성
  if (englishLevel[0] !== 0 || englishLevel[1] !== 100) {
    if (englishLevel[0] === englishLevel[1]) {
      texts.push(`영어 ${englishLevel[0]}점`);
    } else if (englishLevel[0] === 0) {
      texts.push(`영어 ${englishLevel[1]}점 이하`);
    } else if (englishLevel[1] === 100) {
      texts.push(`영어 ${englishLevel[0]}점 이상`);
    } else {
      texts.push(`영어 ${englishLevel[0]}점 이상 ${englishLevel[1]}점 미만`);
    }
  }
  
  return texts;
};
