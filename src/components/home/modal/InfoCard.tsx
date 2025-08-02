import * as React from "react";

interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  items: InfoItem[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ items }) => {
  return (
    <section className="flex flex-col justify-center items-start self-stretch rounded-lg border border-solid bg-zinc-50 border-stone-200">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col gap-2.5 items-start self-stretch px-5 py-4 ${
            index < items.length - 1
              ? "border-solid border-b-[0.5px] border-b-stone-200"
              : "border-b-[none]"
          }`}
        >
          <h3 className="self-stretch text-sm font-bold leading-5 text-black">
            {item.label}
          </h3>
          <p className="self-stretch text-sm leading-5 text-stone-700">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
};
