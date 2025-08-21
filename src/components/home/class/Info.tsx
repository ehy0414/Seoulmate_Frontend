import { useState } from "react";
import { FriendsModal } from "../../modal/FriendsModal";

interface InfoProps {
  hostName?: string;
  hostImage?: string;
  hostId?: number;
}

function Info({ hostName, hostImage, hostId }: InfoProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
    <section    onClick={openModal}
                className="flex w-full gap-4 items-center self-stretch px-5 py-2 text-base font-bold text-black-700 whitespace-nowrap border-b border-solid border-b-stone-300 cursor-pointer">
      <img
        src={hostImage}
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px] "
        alt="Profile"
      />
      <div className="flex gap-3 items-center self-stretch my-auto">
        <span className="self-stretch my-auto ">
          {hostName || "호스트 이름"}
        </span>
      </div>

    </section>

    <FriendsModal isVisible={isModalVisible} onClose={closeModal} requestId={hostId ?? 0}/>
    </>
  );
}

export default Info;
