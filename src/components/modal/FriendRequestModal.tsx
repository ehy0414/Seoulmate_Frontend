"use client";
import * as React from "react";
import { useState, useEffect } from "react";

interface FriendRequestModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  friendName?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  message?: string;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
  isOpen = false,
  onClose,
  friendName = "톰",
  onCancel,
  onConfirm,
  message
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const defaultMessage = `${friendName} 님에게 친구 신청을 하시겠습니까?`;
  const displayMessage = message || defaultMessage;

  if (!isVisible) return null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Modal Content */}
        <div className="flex relative flex-col gap-3 items-center p-4 mx-auto my-0 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[286px] animate-in fade-in-0 zoom-in-95 duration-200">

          {/* Friend Name Title */}
          <header
            id="modal-title"
            className="relative self-stretch text-sm font-semibold leading-5 text-center text-black"
          >
            {friendName}
          </header>

          {/* Confirmation Message */}
          <p
            id="modal-description"
            className="relative self-stretch text-xs text-center text-stone-700 max-md:text-xs max-sm:text-xs"
          >
            {displayMessage}
          </p>

          {/* Action Buttons */}
          <div className="flex relative gap-3 items-center ">
            {/* Cancel Button */}
            <button
              className="flex relative justify-center items-center rounded-lg border border-primary-700 border-solid cursor-pointer bg-zinc-50 h-[38px] w-[123px] hover:bg-primary-100 transition-colors"
              onClick={handleCancel}
              type="button"
            >
              <span className="relative text-xs font-bold text-primary-700 ">
                취소
              </span>
            </button>

            {/* Confirm Button */}
            <button
              className="flex relative justify-center items-center bg-orange-400 rounded-lg cursor-pointer h-[38px] w-[120px] max-md:h-9 max-md:w-[108px] max-sm:w-full max-sm:h-[34px] hover:bg-orange-500 transition-colors"
              onClick={handleConfirm}
              type="button"
            >
              <span className="relative text-xs font-bold text-zinc-50 max-md:text-xs max-sm:text-xs">
                확인
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Example usage component
export const FriendRequestModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log('친구 신청을 보냈습니다!');
    // 실제 친구 신청 로직 구현
  };

  const handleCancel = () => {
    console.log('친구 신청을 취소했습니다.');
  };

  return (
    <div className="p-8">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        친구 신청 모달 열기
      </button>

      <FriendRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        friendName="톰"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default FriendRequestModal;
