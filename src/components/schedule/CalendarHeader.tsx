export default function CalendarHeader() {
    return (
      <div className="px-4 pt-4">
        <h2 className="text-center text-lg font-bold">모임 일정</h2>
        <div className="flex justify-center mt-2">
          <div className="flex gap-6">
            <button className="text-primary-700 border-b-2 border-primary-700 pb-1">주최</button>
            <button className="text-black-400">참여</button>
          </div>
        </div>
      </div>
    );
  }
  