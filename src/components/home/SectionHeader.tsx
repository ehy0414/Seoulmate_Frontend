import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="self-stretch text-2xl font-bold text-zinc-900 w-full">
      {title}
    </h2>
  );
};
