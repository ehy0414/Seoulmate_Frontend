"use client";
import React from 'react';
import { SelectableChip } from './SelectableChip';

interface CategorySectionProps {
  title: string;
  items: string[];
  selectedItems: Set<string>;
  onItemToggle: (item: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  selectedItems,
  onItemToggle
}) => {
  return (
    <section className="flex relative flex-col gap-3 items-start self-stretch">
      <h3 className="relative self-stretch text-sm font-semibold leading-5 text-black">
        <span className="text-sm font-bold text-black">{title}</span>
      </h3>
      <div className="flex relative flex-wrap gap-2 content-center items-center self-stretch max-sm:left-4 max-sm:gap-1.5 max-sm:w-[calc(100%_-_32px)]">
        {items.map((item) => (
          <SelectableChip
            key={item}
            label={item}
            isSelected={selectedItems.has(item)}
            onToggle={() => onItemToggle(item)}
          />
        ))}
      </div>
    </section>
  );
};
