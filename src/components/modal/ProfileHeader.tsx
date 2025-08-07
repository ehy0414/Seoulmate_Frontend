import * as React from "react";
import { MenuIcon } from "./MenuIcon";

interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  description: string;
  flagSrc?: string | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  name,
  description,
  flagSrc
}) => {
  return (
    <section className="flex gap-7 items-start self-stretch">
      <img
        src={profileImage}
        alt=""
        className="border-solid border-[0.5px] border-neutral-400 h-[100px] rounded-[50px] w-[100px]"
      />
      <div className="flex gap-2 items-start px-0 py-3 flex-[1_0_0]">
        <div className="flex flex-col gap-2 items-start flex-[1_0_0]">
          <div className="flex gap-3 items-center max-sm:justify-center">
            <h1 className="text-base font-bold text-black">
              {name}
            </h1>

            {flagSrc ? (
              <img
                src={flagSrc}
                alt={`${name}의 국기`}
                className="w-6 h-4 object-cover rounded-sm"
                onError={(e) => {
                  e.currentTarget.style.display = "none"; // 또는 대체 이미지 표시
                }}
              />
            ) : null}

            
          </div>
          <p className="self-stretch text-sm leading-5 text-black">
            {description}
          </p>
        </div>
        <div>
          <MenuIcon />
        </div>
      </div>
    </section>
  );
};
