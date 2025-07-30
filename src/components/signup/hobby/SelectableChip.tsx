"use client";
import React from 'react';

interface SelectableChipProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

export const SelectableChip: React.FC<SelectableChipProps> = ({ label, isSelected, onToggle }) => {
  return (
    <button
      className={`flex relative justify-center items-center px-3 py-1.5 border border-solid rounded-[100px] max-sm:px-2.5 max-sm:py-1 transition-colors ${
        isSelected
          ? 'bg-primary-700 border-primary-700'
          : 'bg-zinc-50 border-neutral-400'
      }`}
      onClick={onToggle}
      type="button"
    >
      <span className={`relative text-xs font-medium text-center max-sm:text-xs ${
        isSelected ? 'text-white' : 'text-stone-700'
      }`}>
        {label}
      </span>
    </button>
  );
};
