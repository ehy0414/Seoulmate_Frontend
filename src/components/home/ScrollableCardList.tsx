import React from 'react';

interface ScrollableCardListProps {
  children: React.ReactNode;
}

export const ScrollableCardList: React.FC<ScrollableCardListProps> = ({ children }) => {
  return (
    <div className="flex overflow-x-scroll snap-x snap-proximity scrollbar-hide w-full gap-4 items-center self-stretch ">
      {children}
    </div>
  );
};
