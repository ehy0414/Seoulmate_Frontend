"use client";
import React, { useState } from 'react';
import { ProgressBar } from '../components/signup/ProgressBar';
import { InterestSelector } from '../components/signup/hobby/InterestSelector';
import { NavigationButtons } from '../components/signup/NavigationButtons';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

export const HobbySelectionPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const navigate:NavigateFunction = useNavigate();

  // 취미 최대 10개까지 선택하는 토글
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

  // 취미 삭제 핸들러
  const handleRemoveItem = (itemToRemove: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemToRemove);
      return newSet;
    });
  };

  // 이전으로 가기 핸들러
  const handlePrevious = () => {
    console.log('Previous clicked');
    navigate(-1);
  };

  // 다음 버튼 핸들러 (서버로 List형식의 hobbies 보냄)
  const handleNext = async() => {
    if (selectedItems.size >= 3 && selectedItems.size <= 10) {
      console.log('Next clicked with items:', Array.from(selectedItems));
      const data = {
        hobbies: Array.from(selectedItems)
      }
      try {
        // await axios.post("/signup/select-hobby", data);
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
    <div className="relative mx-auto my-0 bg-white h-[1650px] max-w-[clamp(360px,100vw,430px)]">
      <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-28">
        <ProgressBar currentStep={3} />

        <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
          <div className=" text-2xl font-bold text-zinc-900">
            <h1>관심사를 선택해주세요!</h1>
          </div>
          {selectedItems.size > 0 && (
            <div className="mt-4 pt-1">
              <div className="flex flex-wrap gap-2 mt-4">
                {Array.from(selectedItems).map((item) => (
                  <button
                    key={item}
                    className="flex items-center px-3 py-1.5 max-sm:px-2.5 max-sm:py-1 bg-primary-700 border-primary-700 text-gray-100 rounded-full text-xs cursor-pointer"
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
    </div>
  );
};

export default HobbySelectionPage;