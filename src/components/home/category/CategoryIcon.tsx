import React from 'react';

interface CategoryIconProps {
  iconSvg: string;
  label: string;
  onClick: () => void;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconSvg, label, onClick }) => {
  return (
    <button className="flex flex-col gap-3 justify-center mx-auto items-center rounded-3xl border-solid shadow-sm bg-zinc-50 border-[0.5px] border-black-400 h-[74px] w-[74px] cursor-pointer"
            onClick={onClick}>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: iconSvg,
          }}
        />
      </div>
      <span className="self-stretch text-xs font-bold text-center text-black">
        {label}
      </span>
    </button>
  );
};
