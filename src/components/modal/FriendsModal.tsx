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

  // (이하 로직은 변경 없음)
  // ... (드래그, useEffect 등 기존 로직) ...
  const updateHeight = (deltaY: number) => {
    const sensitivity = 1;
    const newHeight = Math.min(
      Math.max(30, startHeight.current - (deltaY * sensitivity * 100) / window.innerHeight),
      100
    );
    setHeight(newHeight);
  };

  const finishDrag = () => {
    dragging.current = false;
    startY.current = null;

    if (height < 40) {
      onClose();
    } else if (height > 70) {
      setHeight(100);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isVisible]);

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
      // 👉 여기에 inset-0 클래스를 추가하여 화면 전체를 덮도록 수정
      className={`fixed z-40 inset-0 bg-black-700 bg-opacity-30 transition-opacity duration-300 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="fixed bottom-0 left-1/2 w-full bg-white rounded-t-[24px] shadow-xl transition-transform duration-300 overflow-hidden"
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
          className="absolute top-[10px] left-1/2 h-[30px] w-full -translate-x-1/2 cursor-grab z-10"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="w-[50px] h-1 bg-stone-300 rounded-xl mx-auto mt-[14px]" />
        </div>

        {/* 모달 콘텐츠 */}
        <Friends />
      </div>
    </div>
  );
};