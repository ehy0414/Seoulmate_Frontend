import React from 'react';

interface ClubMiniCardProps {
  image: string;
  title: string;
  place: string;
  date: string;
  altText?: string;
  onClick: () => void;
}

export const ClubMiniCard: React.FC<ClubMiniCardProps> = ({
  image,
  title,
  place,
  date,
  altText = "",
  onClick
}) => {
  return (
    <article  className="flex gap-4 items-center p-2 rounded-lg border-solid shadow-sm bg-zinc-50 border-[0.5px] border-black-300 w-full cursor-pointer"
              onClick={onClick}>
      <img
        src={image}
        alt={altText}
        className="shrink-0 w-20 h-20 rounded-lg"
      />
      <div className="flex gap-3 justify-center items-start flex-[1_0_0]">
        <div className="flex flex-col gap-2.5 items-start flex-[1_0_0]">
          <h3 className="overflow-hidden self-stretch text-base font-medium text-ellipsis text-zinc-900">
            {title}
          </h3>
          <div className="flex flex-col gap-1 items-start self-stretch">
            <p className="overflow-hidden self-stretch text-sm font-medium leading-5 text-ellipsis text-neutral-400">
              {place}
            </p>
            <time className="overflow-hidden self-stretch text-sm font-medium leading-5 text-ellipsis text-neutral-400">
              {date}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
};
