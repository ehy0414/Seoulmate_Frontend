import * as React from "react";

interface HobbyChipsProps {
  hobbies: string[];
}

export const HobbyChips: React.FC<HobbyChipsProps> = ({ hobbies }) => {
  return (
    <section className="flex flex-wrap gap-2 content-center items-center self-stretch max-sm:justify-center">
      {hobbies.map((hobby, index) => (
        <div
          key={index}
          className="flex justify-center items-center px-3 py-1.5 bg-red-100 rounded-[100px]"
        >
          <span className="text-xs text-center text-red-500">
            {hobby}
          </span>
        </div>
      ))}
    </section>
  );
};
