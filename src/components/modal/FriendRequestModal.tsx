"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

interface FriendRequestModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  friendName?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  message?: string;
  id?: number;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
  isOpen = false,
  onClose,
  friendName,
  onCancel,
  onConfirm,
  message,
  id
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const navigate = useNavigate();

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

  const handleConfirm = async() => {
    try {
      await api.post('/friends/requests', { receiverId: id });
      onConfirm?.();
      handleClose();
    } catch (error) {
      console.error("친구 신청 실패", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as any).response?.data?.code === 'FRIEND4001'
      ) {
        alert("자기 자신에게 친구 신청을 할 수 없습니다.");
        handleClose();
      }
    }
    
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
              className="flex relative justify-center items-center bg-primary-700 rounded-lg cursor-pointer h-[38px] w-[120px] hover:bg-primary-800 transition-colors"
              onClick={handleConfirm}
              type="button"
            >
              <span className="relative text-xs font-bold text-zinc-50 ">
                확인
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequestModal;
