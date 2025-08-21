import { useState } from "react";
import { FriendsModal } from "../../modal/FriendsModal";
import { EmptySlot } from "./EmptySlot";

interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  title?: string;
  maxParticipants: number;
  type: "club" | "class";
}

const ParticipantItem: React.FC<{
  participant: Participant;
  onClick?: (id: string) => void;
}> = ({ participant, onClick }) => {
  return (
    <div
      className="flex relative flex-col gap-2 justify-center items-center w-[38px] max-sm:min-w-[38px] cursor-pointer"
      onClick={() => onClick?.(participant.id)} // 클릭 시 해당 id 전달
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
  maxParticipants,
  type
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // ✅ 선택된 유저 id

  const openModal = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  const totalSlots = Math.min(maxParticipants, 999);
  const filledSlots = participants.length;
  const emptySlots = totalSlots - filledSlots;

  const slotComponents = [
    ...participants.map((p) => (
      <ParticipantItem key={p.id} participant={p} onClick={openModal} />
    )),
    ...Array.from({ length: emptySlots }, (_, i) => (
      <EmptySlot key={`empty-${i}`} />
    ))
  ];

  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < slotComponents.length; i += 5) {
    rows.push(slotComponents.slice(i, i + 5));
  }

  return (
    <section className="flex flex-col gap-3 items-start self-stretch w-full pb-10">
      <div className="flex gap-3 items-center self-stretch w-full">
        <h3 className="text-sm font-medium leading-5 text-black">{title}</h3>
        <p className="text-xs font-bold leading-5 text-primary-700">
          ({filledSlots}/{maxParticipants})
        </p>
      </div>

      <div className="flex flex-col gap-5 p-5 rounded-lg border border-solid bg-zinc-50 border-stone-200 w-full">
        {participants.length === 0 ? (
          <p className="text-sm text-gray-500 text-center w-full">
            아직 참여자가 없습니다.
          </p>
        ) : (
          rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-center self-stretch"
            >
              {row}
            </div>
          ))
        )}
      </div>

      {/* 🔹 클럽일 때만 표시 */}
      {type === "club" && (
        <p className="text-xs font-bold text-primary-700">
          8명 이상 참여해야 모임이 열려요.
        </p>
      )}

      {/* 모달 (선택된 id만 넘김) */}
      {selectedId && (
        <FriendsModal
          isVisible={isModalVisible}
          onClose={closeModal}
          requestId={Number(selectedId)}
        />
      )}
    </section>
  );
};
