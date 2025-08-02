import * as React from "react";
import { FriendsModal } from "../modal/FriendsModal";
import { EmptySlot } from "./EmptySlot";

interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  title?: string;
  maxParticipants: number; // 추가
}


const ParticipantItem: React.FC<{
  participant: Participant;
  onClick?: () => void;
}> = ({ participant, onClick }) => {
  return (
    <div
      className="flex relative flex-col gap-2 justify-center items-center w-[38px] max-sm:min-w-[38px] cursor-pointer"
      onClick={onClick}
    >
      <img
        src={participant.imageUrl}
        alt={`${participant.nickname} 프로필`}
        className="relative w-10 h-10 border-solid border-[0.5px] border-neutral-400 rounded-[50px]"
      />
      <span className="relative self-stretch text-xs font-semibold text-center text-black w-[40px]">
        {participant.nickname}
      </span>

      
    </div>
  );
};

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  title = "참여하는 사람",
  maxParticipants
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const totalSlots = Math.min(maxParticipants, 999); // 안정성
  const filledSlots = participants.length;
  const emptySlots = totalSlots - filledSlots;

  // 전체 슬롯 배열 (ParticipantItem + EmptySlot)
  const slotComponents = [
    ...participants.map((p) => (
      <ParticipantItem key={p.id} participant={p} onClick={openModal} />
    )),
    ...Array.from({ length: emptySlots }, (_, i) => (
      <EmptySlot key={`empty-${i}`} />
    ))
  ];

  // 5개씩 자르기
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < slotComponents.length; i += 5) {
    rows.push(slotComponents.slice(i, i + 5));
  }

  return (
    <>
      <section className="flex flex-col gap-3 items-start self-stretch">
        <div className="flex gap-3 items-center self-stretch">
          <h3 className="text-sm font-medium leading-5 text-black">{title}</h3>
          <p className="text-xs font-bold leading-5 text-primary-700">({filledSlots}/{slotComponents.length})</p>
        </div>

        <div className="flex flex-col gap-5 p-5 rounded-lg border border-solid bg-zinc-50 border-stone-200 w-full">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-center self-stretch"
            >
              {row}
              {/* 이 줄은 5개 채워졌으니 공백 채울 필요 없음 */}
            </div>
          ))}
        </div>
      </section>

      {/* 모달 */}
      <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
};
