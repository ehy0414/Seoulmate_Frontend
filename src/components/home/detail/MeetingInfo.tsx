import * as React from "react";

interface MeetingInfoProps {
  title: string;
  location: string;
  datetime: string;
  price: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

export const MeetingInfo: React.FC<MeetingInfoProps> = ({
  title,
  location,
  datetime,
  price,
  description,
  imageUrl,
  imageAlt = ""
}) => {
  return (
    <section className="flex left-0 flex-col shrink-0 items-center mt-1 bg-white w-full max-w-[clamp(360px,100vw,430px)]">
      <div className="flex relative flex-col justify-center items-end w-full">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="relative h-[200px] w-full"
        />
      </div>

      <header className="flex justify-between items-center w-full pt-3 px-4 text-2xl font-semibold">
        <h1 className="self-stretch my-auto">{title}</h1>
      </header>

      <section className="mt-5 w-full text-xs font-medium px-4">
        <div className="flex gap-2 items-center w-full whitespace-nowrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a5c028220ed289be0288c8644ffad73ecfd1e484?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            alt="위치 아이콘"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">{location}</span>
        </div>

        <div className="flex gap-2 items-center mt-2 w-full">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/636d965f6e25f1b8f936f66e618387444168713f?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            alt="날짜 아이콘"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">{datetime}</span>
        </div>

        <div className="flex gap-2 items-center mt-2 w-full whitespace-nowrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/08cafc6b4a2dbf6fe453c08742ba15f8e79b9c20?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
            alt="가격 아이콘"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">{price}</span>
        </div>

        <hr className="mt-5"/>

        <div className="flex relative flex-col gap-10 items-start self-stretch py-5">
            <p className=" self-stretch text-sm font-medium leading-5 text-black">
            {description}
            </p>
        </div>
      </section>
      
    </section>
  );
};
