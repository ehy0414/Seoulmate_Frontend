import * as React from "react";
import { MenuIcon } from "./MenuIcon";

interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  badge: string;
  description: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  name,
  badge,
  description
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
            <div className="flex justify-center items-center px-2 py-1 bg-primary-700 rounded-[100px]">
              <span className="text-xs font-bold text-center text-zinc-50">
                {badge}
              </span>
            </div>

            <div>
              <img src="" alt="국기 사진" className="h-4"/>
            </div>
            
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
