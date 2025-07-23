"use client";
import React from 'react';

interface NavigationButtonsProps {
  selectedCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  selectedCount,
  onPrevious,
  onNext
}) => {
  const isNextEnabled = selectedCount >= 3 && selectedCount <= 10;

  return (
    <nav className="fixed mx-14 bottom-0 z-40 w-[380px] bg-white pb-4 pt-4 flex gap-10 ">
      <button
        className="flex relative shrink-0 justify-center items-center rounded-md border border-orange-400 border-solid bg-zinc-50 h-[50px] w-[129px]"
        onClick={onPrevious}
        type="button"
      >
        <span className="relative text-base font-medium text-primary-700">
          <span className="text-base text-primary-700">이전</span>
        </span>
      </button>
      <button
        className={`flex relative shrink-0 justify-center items-center rounded-md h-[50px] w-[211px] ${
          isNextEnabled ? 'bg-primary-700' : 'bg-stone-200'
        }`}
        onClick={onNext}
        disabled={!isNextEnabled}
        type="button"
      >
        <span className={`relative text-base font-medium ${
          isNextEnabled ? 'text-white' : 'text-neutral-400'
        }`}>
          <span className={`text-base ${isNextEnabled ? 'text-white' : 'text-neutral-400'}`}>
            다음 ({selectedCount}/10)
          </span>
        </span>
      </button>
    </nav>
  );
};
