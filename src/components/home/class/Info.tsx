import { useState } from "react";
import { FriendsModal } from "../../modal/FriendsModal";

function Info() {
    const [isModalVisible, setModalVisible] = useState(false);
      const openModal = () => setModalVisible(true);
      const closeModal = () => setModalVisible(false);

  return (
    <section    onClick={openModal}
                className="flex w-full gap-4 items-center self-stretch px-5 py-2 text-base font-bold text-black-700 whitespace-nowrap border-b border-solid border-b-stone-300 cursor-pointer">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/5f420141e6afbc9e2286d91773cc8fae1a83f670?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px] "
        alt="Profile"
      />
      <div className="flex gap-3 items-center self-stretch my-auto">
        <span className="self-stretch my-auto ">
          현지
        </span>
      </div>

      <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
    </section>
  );
}

export default Info;
