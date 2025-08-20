import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ClubCardProps {
  image: string;
  title: string;
  place: string;
  date: string;
  altText?: string;
  id: number;
  onClick?: () => void;
  startTime?: string;
}

export const ClubCard: React.FC<ClubCardProps> = ({
  image,
  title,
  place,
  date,
  altText = "",
  id,
  onClick,
  startTime
}) => {
  return (
    <article className="w-[176px] flex flex-col shrink-0 gap-3 justify-center items-start p-2 rounded-lg border-solid shadow-sm bg-zinc-50 border-[0.5px] border-black-300 cursor-pointer"
              onClick={onClick}>
      <img
        src={image}
        alt={altText}
        className="w-40 rounded-lg h-[100px] "
      />
      <div className="flex flex-col gap-2 justify-end items-center self-stretch">
        <h3 className="overflow-hidden w-40 text-sm font-medium leading-5 text-ellipsis text-zinc-900 max-sm:w-[150px]">
          {title}
        </h3>
        <div className="flex flex-col gap-2 items-center justify-end self-stretch">
          <div className="flex gap-3 items-end self-stretch w-full">
            <div className="flex flex-col gap-1 justify-center items-start flex-[1_0_0] ">
              <p className="overflow-hidden text-xs font-medium text-ellipsis text-neutral-400 ">
                {place}
              </p>
              <time className="overflow-hidden text-xs font-medium text-ellipsis text-neutral-400">
                {date}
              </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};