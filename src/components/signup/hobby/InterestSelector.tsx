"use client";
import React, { useState } from 'react';
import { CategorySection } from './CategorySection';

const categories = {
  '스포츠': ['축구', '야구', '농구', '탁구', '당구', '복싱', '테니스', '스케이트보드', '스키/보드', '스케이트', '볼링', '요가', '필라테스', '클라이밍', '자전거', '러닝', '미식축구', '수영', '무술', '카레이싱', '크로스핏'],
  '파티': ['클러빙', '펍', '홈파티', '생일파티', '페스티벌'],
  '언어': ['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어', '독일어', '스웨덴어', '베트남어', '태국어', '미얀마어', '언어교환'],
  '엑티비티': ['시내', '시골/근교', '캠핑', '캐러반', '해외', '로드트립', '낚시', '트래킹', '등산', '서핑', '보드게임', '스포츠관람', '방탈출', '온천', '계곡', '바다'],
  '문화/예술': ['영화', '콘서트', '뮤지컬', '영화', '전시회', 'K-pop', '패션', '박물관', '갤러리', '쇼핑'],
  '취미': ['춤', '노래', '그림', '게임', '독서', '카페', '자기계발'],
  '음식/드링크': ['맛집투어', '한식', '스시', '동남아음식', '브런치', '디저트', '커피', '와인', '맥주', '채식', '칵테일', '위스키'],
  '음악': ['10년대', '팝송', 'EDM', '하우스', 'J-pop', 'K-pop', 'R&B', '레게', '락', '재즈', '인디', '힙합', '오페라', '클래식']
};

interface InterestSelectorProps {
  selectedItems: Set<string>;
  onItemToggle: (item: string) => void;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({ selectedItems, onItemToggle }) => {
  return (
    <main className="flex absolute flex-col justify-end items-center px-5 pt-4 pb-2 h-[1237px] top-[200px] w-[393px] max-sm:px-4 max-sm:pt-4 max-sm:pb-2">
      <div className="flex absolute flex-col gap-10 items-start h-[1212px] left-[18px] top-[17px] w-[357px] max-sm:left-4 max-sm:gap-1.5 max-sm:w-[calc(100%_-_32px)]">
        {Object.entries(categories).map(([categoryTitle, items]) => (
          <CategorySection
            key={categoryTitle}
            title={categoryTitle}
            items={items}
            selectedItems={selectedItems}
            onItemToggle={onItemToggle}
          />
        ))}
      </div>
    </main>
  );
};
