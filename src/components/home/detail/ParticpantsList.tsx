import * as React from "react";

interface Participant {
  id: string;
  imageUrl: string;
  nickname: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  title?: string;
}

const ParticipantItem: React.FC<{ participant: Participant }> = ({ participant }) => {
  return (
    <div className="flex relative flex-col gap-2 justify-center items-center w-[38px] max-sm:min-w-[38px]">
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
  const firstRowParticipants = participants.slice(0, 5);
  const secondRowParticipants = participants.slice(5, 10);

  return (
    <section className="flex relative flex-col gap-3 items-start self-stretch">
      <div className="flex relative gap-3 items-center self-stretch">
        <h3 className="relative text-sm font-medium leading-5 text-black">
          {title}
        </h3>
      </div>

      <div className="flex relative flex-col gap-5 items-start self-stretch p-5 rounded-lg border border-solid bg-zinc-50 border-stone-200">
        {firstRowParticipants.length > 0 && (
          <div className="flex relative justify-between items-center self-stretch max-sm:flex-wrap max-sm:gap-2.5">
            {firstRowParticipants.map((participant) => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </div>
        )}

        {secondRowParticipants.length > 0 && (
          <div className="flex relative gap-8 items-center self-stretch max-sm:flex-wrap max-sm:gap-2.5">
            {secondRowParticipants.map((participant) => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
