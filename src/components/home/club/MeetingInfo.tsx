import * as React from "react";
import { useState } from "react";

interface MeetingInfoProps {
  title: string;
  hobby: string;
  location: string;
  datetime: string;
  price: string;
  description: string;
  imageUrls: string[]; // 여러 장의 이미지
  extraContent?: React.ReactNode;
  type: "club" | "class";

  // ✅ club 전용 props
  language?: string;
  score?: number;
}

export const MeetingInfo: React.FC<MeetingInfoProps> = ({
  title,
  hobby,
  location,
  datetime,
  price,
  description,
  imageUrls,
  extraContent,
  type,
  language,
  score
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="flex flex-col shrink-0 items-center mt-1 bg-white w-full ">
      {/* 이미지 슬라이더 */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <img
          src={imageUrls[currentIndex]}
          alt={`미팅 이미지 ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-all duration-300"
        />
      </div>

      {/* 도트 인디케이터 */}
        <div className="flex py-3 left-1/2 gap-2">
          {imageUrls.map((_, i) => (
            <button
              key={i}
              className={`w-[6px] h-[6px] rounded-full transition-all duration-200 ${
                currentIndex === i ? "bg-orange-500" : "bg-gray-300"
              }`}
              onClick={() => goToIndex(i)}
            />
          ))}
        </div>
                
      {extraContent}

      {/* 미팅 정보 */}
      <header className="flex justify-between px-4 items-center w-full pt-3 text-2xl font-semibold">
        <h1 className="self-stretch my-auto">{title}</h1>
        {type === "club" && (
          <h1 className="self-stretch my-auto text-xs text-primary-700 bg-primary-200 px-3 py-2 rounded-lg border-solid border-black-200">{hobby}</h1>
        )}
      </header>

      <section className="mt-5 w-full px-4 text-xs font-medium">
        <div className="flex gap-2 items-center w-full whitespace-nowrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a5c028220ed289be0288c8644ffad73ecfd1e484"
            alt="위치 아이콘"
            className="object-contain w-6 aspect-square"
          />
          <span>{location}</span>
        </div>

        <div className="flex gap-2 items-center mt-2 w-full">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/636d965f6e25f1b8f936f66e618387444168713f"
            alt="날짜 아이콘"
            className="object-contain w-6 aspect-square"
          />
          <span>{datetime}</span>
        </div>

        <div className="flex gap-2 items-center mt-2 w-full whitespace-nowrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/08cafc6b4a2dbf6fe453c08742ba15f8e79b9c20"
            alt="가격 아이콘"
            className="object-contain w-6 aspect-square"
          />
          <span>{price}</span>
        </div>

        {/* 🔹 클럽일 때만 표시 */}
        {type === "club" && (
          <div className="flex gap-2 items-center mt-2 w-full whitespace-nowrap">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1f380f88963d7d3c628a95b7768457514738de77"
              alt="Language info icon"
              className="object-contain w-6 aspect-square"
            />
            <p>{language == "KOREAN" ? `한국어 ${score}` : `영어 ${score}`}</p>
          </div>
        )}

        <hr className="mt-5" />

        <div className="py-5">
          <p className="text-sm font-medium leading-5 text-black">
            {description}
          </p>
        </div>
      </section>
    </section>
  );
};
