import React, { useState, useRef, useEffect } from "react";
import api from "../../services/axios";

export const MenuIcon: React.FC<{ userId: number }> = ({ userId }) => {
  // 팝업창의 표시 여부를 관리하는 상태
  const [isPopupOpen, setPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setPopupOpen(prev => !prev);
  };

  const deleteFriend = async() => {
    try {
      const response = await api.delete(`/friends/${userId}`);
      if(response.status === 200) {
        alert("친구가 삭제되었습니다.");
        setPopupOpen(false); // 성공 시에만 팝업 닫기
      }
    } catch (error) {
      console.error("친구 삭제 실패", error);
      alert("친구 삭제에 실패했습니다.");
    }
  };

  // 팝업 바깥 영역을 클릭하면 팝업이 닫히도록 하는 로직 (변경 없음)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    // React.Fragment(<></>)를 사용하여 여러 요소를 함께 렌더링
    <>
      {/* 1. 아이콘과 팝업 메뉴를 위한 컨테이너 */}
      <div ref={menuRef} className="relative inline-block">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon cursor-pointer"
          onClick={togglePopup}
        >
          <circle cx="8" cy="2" r="1.5" fill="#4E4646" />
          <circle cx="8" cy="8" r="1.5" fill="#4E4646" />
          <circle cx="8" cy="14" r="1.5" fill="#4E4646" />
        </svg>

        {/* isPopupOpen이 true일 때만 팝업창을 렌더링 */}
        {isPopupOpen && (
          // 팝업 메뉴: z-index를 높여 배경 위에 오도록 함 (z-50)
          <div
            className="absolute top-full right-2 mt-2 w-max rounded-[4px] bg-white shadow-lg border border-gray-200 z-50"
          >
            <button
              onClick={deleteFriend}
              // 잘못된 클래스 'text-black-700'을 'text-black'으로 수정
              className="w-full px-4 py-2 text-left text-xs font-medium text-black bg-transparent hover:bg-gray-100 rounded-[4px]"
            >
              친구삭제
            </button>
          </div>
        )}
      </div>

      {/* 2. 어두운 배경(Backdrop): isPopupOpen이 true일 때 별도로 렌더링 */}
      {isPopupOpen && (
        // 잘못된 클래스 'bg-black-700'을 'bg-black'으로 수정하고 z-index를 40으로 설정
        <div className="fixed inset-0 bg-black-700 bg-opacity-10 z-40 " />
      )}
    </>
  );
};