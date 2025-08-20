"use client";
import React, { useEffect, useRef, useState } from "react";
import Friends from "./Friends";

interface FriendsModalProps {
  onClose: () => void;
  isVisible: boolean;
  requestId: number;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  isVisible,
  onClose,
  requestId
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const startHeight = useRef<number>(60);
  const dragging = useRef(false);

  const [height, setHeight] = useState(90);

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
    if (height < 40) onClose();
    else if (height > 75) setHeight(100);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.width = "";
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed z-40 inset-0 bg-black-700 bg-opacity-30 transition-opacity duration-300 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="fixed bottom-0 left-1/2 w-full bg-white rounded-t-[24px] shadow-xl transition-transform duration-300 overflow-hidden"
        style={{
          maxWidth: "clamp(360px, 100vw, 430px)",
          height: height === 100 ? "100dvh" : `${height}vh`,
          transform: `${isVisible ? "translate(-50%, 0)" : "translate(-50%, 100%)"}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={dragBarRef}
          className="absolute top-0 left-0 w-full h-[50px] bg-white rounded-t-[24px] flex justify-center items-center"
        >
          <div className="w-[50px] h-1 bg-stone-300 rounded-xl" />
        </div>

        <div className="h-full overflow-y-auto scrollbar-hide px-2 pb-6">
          {/* requestId 전달 */}
          <Friends requestId={requestId} />
        </div>
      </div>
    </div>
  );
};
