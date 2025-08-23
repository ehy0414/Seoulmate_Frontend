"use client";
// 1. useRef와 useEffect를 import합니다.
import React, { useState, useRef, useEffect } from 'react';
import { ProgressBar } from '../../components/signup/ProgressBar';
import { InterestSelector } from '../../components/signup/hobby/InterestSelector';
import { NavigationButtons } from '../../components/signup/NavigationButtons';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import api from '../../services/axios';

export const HobbySelectionPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const navigate:NavigateFunction = useNavigate();

  // 2. 동적 padding을 위한 상태와 측정을 위한 ref를 생성합니다.
  const [mainPaddingTop, setMainPaddingTop] = useState(200);
  const contentRef = useRef<HTMLDivElement>(null); // 높이를 측정할 컨텐츠 영역의 ref

  // 3. 취미 목록이 변경될 때마다 높이를 재계산하는 로직을 추가합니다.
  useEffect(() => {
    if (contentRef.current) {
      const topOffset = 100; // top-[100px] 클래스에 해당하는 값
      const contentHeight = contentRef.current.offsetHeight; // ref가 달린 요소의 실제 높이
      const bottomMargin = 0; // 헤더와 메인 컨텐츠 사이의 여유 공간

      // 최종적으로 필요한 padding-top을 계산하여 상태를 업데이트합니다.
      setMainPaddingTop(topOffset + contentHeight + bottomMargin);
    }
  }, [selectedItems]); // selectedItems가 변경될 때마다 실행

  const handleItemToggle = (item: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else if (newSet.size < 10) {
        newSet.add(item);
      }
      return newSet;
    });
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemToRemove);
      return newSet;
    });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleNext = async() => {
    if (selectedItems.size >= 3 && selectedItems.size <= 10) {
      const data = {
        hobbies: Array.from(selectedItems)
      }
      try {
        await api.post("/signup/select-hobby", data);
        navigate("/signUp/school");
      } catch (error) {
        console.error("전송 실패:", error);
        alert("전송 중 문제가 발생했습니다.");
      }
    } else {
      alert("다시 시도해주세요!");
    }
  };

  return (
    <main
      className="flex flex-col items-center px-6 pb-24 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]"
      style={{ paddingTop: `${mainPaddingTop}px` }}
    >

      <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-44">
        <ProgressBar currentStep={3} />

        <div ref={contentRef} className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
          <div className=" text-2xl font-bold text-zinc-900">
            <h1>관심사를 선택해주세요!</h1>
          </div>
          {selectedItems.size > 0 && (
            <div className="mt-4 pt-1 bg-white">
              <div className="flex flex-wrap gap-2 mt-4">
                {Array.from(selectedItems).map((item) => (
                  <button
                    key={item}
                    className="flex items-center px-3 py-1.5 bg-primary-700 border-primary-700 text-gray-100 rounded-full text-xs cursor-pointer"
                    onClick={() => handleRemoveItem(item)}
                  >
                    {item}
                    <span className="ml-1.5 text-xs">x</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="absolute h-3.5 text-xs font-medium left-0 text-neutral-400 top-[140px] w-full">
          <span className="text-xs text-neutral-400">
            최소 3개 최대 10개를 선택해주세요.
          </span>
        </p>
      </header>

      <InterestSelector
        selectedItems={selectedItems}
        onItemToggle={handleItemToggle}
      />

      <NavigationButtons
        selectedCount={selectedItems.size}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onCount={true}
      />
    </main>
  );
};

export default HobbySelectionPage;