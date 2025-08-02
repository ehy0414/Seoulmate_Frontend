import React from 'react';

interface CategoryIconProps {
  iconSvg: string;
  label: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconSvg, label }) => {
  return (
    <button className="flex flex-col gap-3 justify-center items-center rounded-3xl border-solid shadow-sm bg-zinc-50 border-[0.5px] border-black-400 h-[74px] w-[74px] max-sm:h-[70px] max-sm:w-[70px]">
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
