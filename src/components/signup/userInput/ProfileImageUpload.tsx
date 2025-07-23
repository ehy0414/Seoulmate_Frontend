import * as React from "react";

export const ProfileImageUpload: React.FC = () => {
  return (
    <section className="flex justify-center items-center py-5 bg-white">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/c98cc0f189cd4596ac0218ccc3940df161af7907?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
        className="object-contain self-stretch my-auto w-20 rounded-none aspect-square"
        alt="Profile image upload"
      />
    </section>
  );
};
