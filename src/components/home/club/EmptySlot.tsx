export const EmptySlot = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[38px] cursor-pointer">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/eb291469a2f4f78cfeec626212626c3bcec72080"
        alt="참여하기"
        className="w-10 h-10 object-contain "
      />
      <div className="mt-2 text-xs font-light text-neutral-400 text-center w-[42px]">
        참여하기
      </div>
    </div>
  );
};
