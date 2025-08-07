"use client";
import React, { useEffect, useRef, useState } from "react";
import Friends from "./Friends";

interface FriendsModalProps {
  onClose: () => void;
  isVisible: boolean;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  isVisible,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const startHeight = useRef<number>(60);
  const dragging = useRef(false);

  const [height, setHeight] = useState(90);

  // 드래그에 따라 높이 업데이트 (실시간 반영)
  const updateHeight = (deltaY: number) => {
    const sensitivity = 1;
    const newHeight = Math.min(
      Math.max(30, startHeight.current - (deltaY * sensitivity * 100) / window.innerHeight),
      100
    );
    setHeight(newHeight);
  };

  // 드래그 종료 시점 처리: 높이에 따라 닫기 또는 자동 조절
  const finishDrag = () => {
    dragging.current = false;
    startY.current = null;

    if (height < 40) {
      // 1/3 이하이면 모달 닫기
      onClose();
    } else if (height > 70) {
      // 2/3 이상이면 100%로 확장
      setHeight(100);
    } else {
      // 그 외는 현재 높이 유지 (변화 없음)
    }
  };

  useEffect(() => {
    if (isVisible) {
      // 모달이 열렸을 때 body 스크롤 막기
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // 모바일에서 더 확실히 방지
    } else {
      // 모달이 닫히면 다시 허용
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복구
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
}, [isVisible]);

  // 모달창이 닫혔을 때 height값을 다시 90으로 설정 
  // onClose때 setHeight(90)으로 하면 짧은 순간의 리렌더링돼서 깜빡임 현상을 없애려고 추가
  useEffect(() => {
    const modalEl = modalRef.current;

    const handleTransitionEnd = () => {
      if (!isVisible) {
        setHeight(90);
      }
    };

    modalEl?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      modalEl?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isVisible]);



  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (dragBarRef.current?.contains(e.target as Node)) {
        dragging.current = true;
        startY.current = e.touches[0].clientY;
        startHeight.current = height;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current || startY.current === null) return;
      const deltaY = e.touches[0].clientY - startY.current;
      updateHeight(deltaY);
    };

    const handleTouchEnd = () => {
      if (!dragging.current) return;
      finishDrag();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (dragBarRef.current?.contains(e.target as Node)) {
        dragging.current = true;
        startY.current = e.clientY;
        startHeight.current = height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current || startY.current === null) return;
      const deltaY = e.clientY - startY.current;
      updateHeight(deltaY);
    };

    const handleMouseUp = () => {
      if (!dragging.current) return;
      finishDrag();
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [height, onClose]);

  return (
    <div
      className={`fixed z-50 bg-black bg-opacity-30 transition-opacity duration-300 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="fixed bottom-0 left-1/2 w-full border-2 border-solid bg-white rounded-t-[24px] shadow-xl transition-transform duration-300 overflow-hidden"
        style={{
          width: "full",
          maxWidth: "clamp(360px, 100vw, 430px)",
          height: height === 100 ? "100dvh" : `${height}vh`,
          transform: `${isVisible ? "translate(-50%, 0)" : "translate(-50%, 100%)"}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 드래그 손잡이 (클릭 영역 확장) */}
        <div
          ref={dragBarRef}
          className="absolute top-[10px] left-1/2 w-[70px] h-[30px] -translate-x-1/2 cursor-pointer z-10"
          // 배경은 투명하지만 클릭 영역 확장
          style={{ backgroundColor: "transparent" }}
        >
          <div className="w-[50px] h-1 bg-stone-300 rounded-xl mt-[14px]" />
        </div>

        {/* 모달 콘텐츠 */}
        <Friends />
      </div>
    </div>
  );
};
