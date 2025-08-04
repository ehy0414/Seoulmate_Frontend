import * as React from "react";
import { FriendsModal } from "../../modal/FriendsModal";

interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  title?: string;
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
      <span className="relative self-stretch text-xs font-semibold text-center text-black">
        {participant.nickname}
      </span>
    </div>
  );
};
export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  title = "참여하는 친구"
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // 👉 5개씩 나눠서 행(row) 배열로 만들기
  const rows: Participant[][] = [];
  for (let i = 0; i < participants.length; i += 5) {
    rows.push(participants.slice(i, i + 5));
  }

  return (
    <>
      <section className="flex flex-col gap-3 items-start self-stretch">
        <div className="flex gap-3 items-center self-stretch">
          <h3 className="text-sm font-medium leading-5 text-black">{title}</h3>
        </div>

        <div className="flex flex-col gap-5 p-5 rounded-lg border border-solid bg-zinc-50 border-stone-200 w-full">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-center self-stretch"
            >
              {row.map((participant) => (
                <ParticipantItem
                  key={participant.id}
                  participant={participant}
                  onClick={openModal}
                />
              ))}
              {/* 빈칸 채우기: 줄이 5명이 안되면 공백 채움 */}
              {Array.from({ length: 5 - row.length }).map((_, i) => (
                <div key={i} className="w-[38px]" />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 모달 */}
      <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
};
