"use client";
import React from 'react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  nextDisabled: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  nextDisabled
}) => {

  return (
    <nav className="fixed mx-4 bottom-0 z-40 w-[360px] bg-white pb-4 pt-4 flex gap-5 ">
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
          nextDisabled ? 'bg-primary-700' : 'bg-stone-200'
        }`}
        onClick={onNext}
        disabled={!nextDisabled}
        type="button"
      >
        <span className={`relative text-base font-medium ${
          nextDisabled ? 'text-white' : 'text-neutral-400'
        }`}>
          <span className={`text-base ${nextDisabled ? 'text-white' : 'text-neutral-400'}`}>
            다음           
          </span>
        </span>
      </button>
    </nav>
  );
};
