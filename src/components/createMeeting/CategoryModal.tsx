import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopLine from '../../assets/common/modal-top-button.svg?react';
interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
  selectedCategories: string[];
}

const categories = {
  '스포츠': ['축구', '야구', '농구', '탁구', '당구', '복싱', '테니스', '스케이트보드', '스키/보드', '스케이트', '볼링', '요가', '필라테스', '클라이밍', '자전거', '러닝', '미식축구', '수영', '무술', '카레이싱', '크로스핏'],
  '파티': ['클러빙', '펍', '홈파티', '생일파티', '페스티벌'],
  '언어': ['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어', '독일어', '스웨덴어', '베트남어', '태국어', '미얀마어', '언어교환'],
  '엑티비티': ['시내', '시골/근교', '캠핑', '캐러반', '해외', '로드트립', '낚시', '트래킹', '등산', '서핑', '보드게임', '스포츠관람', '방탈출', '온천', '계곡', '바다'],
  '문화/예술': ['영화', '콘서트', '뮤지컬', '드라마', '전시회', 'K-pop', '패션', '박물관', '갤러리', '쇼핑'],
  '취미': ['춤', '노래', '그림', '게임', '독서', '카페', '자기계발'],
  '음식/드링크': ['맛집투어', '한식', '스시', '동남아음식', '브런치', '디저트', '커피', '와인', '맥주', '채식', '칵테일', '위스키'],
  '음악': ['10년대', '팝송', 'EDM', '하우스', 'J-pop', 'K-pop', 'R&B', '레게', '락', '재즈', '인디', '힙합', '오페라', '클래식']
};

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedCategories
}) => {
  const [showToast, setShowToast] = useState(false);
  const [height, setHeight] = useState(90);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const startHeight = useRef<number>(90);
  const dragging = useRef(false);

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
  const finishDrag = useCallback(() => {
    dragging.current = false;
    startY.current = null;

    if (height < 40) {
      // 1/3 이하이면 모달 닫기
      onClose();
    } else if (height > 70) {
      // 2/3 이상이면 90%로 고정
      setHeight(90);
    } else {
      // 그 외는 현재 높이 유지
    }
  }, [height, onClose]);

  // 모달이 열릴 때 body 스크롤 방지 및 모달 높이 초기화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // 모바일에서 더 확실히 방지
      setHeight(90); // 모달이 열릴 때마다 높이를 90%로 초기화
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // 드래그 이벤트 리스너
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
  }, [height, onClose, finishDrag]);

  const handleSelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      // 이미 선택된 경우 해제
      onSelect(category);
    } else if (selectedCategories.length < 5) {
      // 5개 미만일 때만 추가
      onSelect(category);
    } else {
      // 5개 이상일 때 토스트 메시지 표시
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000); // 1초 후 사라짐
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-end" // 하단 정렬
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 배경 오버레이 */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* 모달 콘텐츠 */}
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-t-lg w-full overflow-hidden mx-auto max-w-md" // 상단 둥글게, 중앙 정렬
            style={{
              height: `${height === 100 ? '100vh' : `${height}vh`}`,
            }}
            initial={{ y: "100%" }} // 아래에서 시작
            animate={{ y: 0 }} // 위로 슬라이드
            exit={{ y: "100%" }} // 아래로 슬라이드 아웃
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* 드래그 핸들 영역 (확장된 클릭 영역) */}
            {/* <div
              ref={dragBarRef}
              className="absolute top-[10px] left-1/2 w-[70px] h-[30px] -translate-x-1/2 cursor-pointer z-20"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="w-[50px] h-1 bg-stone-300 rounded-xl mx-auto mt-[14px]" />
            </div> */}

            {/* 고정된 Top Button */}
            <div ref={dragBarRef} className="sticky top-0 bg-white z-10">
              <div className="flex h-[33px] justify-center items-center" onClick={onClose}>
                <TopLine/>
              </div>
            </div>
            {/* 카테고리 리스트 */}
            <div className="px-[18px] pb-5 overflow-y-auto" style={{ height: `calc(${height}vh - 33px)` }}>
              <div className="space-y-[4.69vh] pt-[4.58vh]">
                {Object.entries(categories).map(([categoryTitle, items]) => (
                  <div key={categoryTitle}>
                    <h3 className="text-sm font-semibold text-[#000] mb-3">{categoryTitle}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSelect(item)}
                          className={`px-3 py-1.5 text-sm rounded-full border transition-colors font-[500] ${
                            selectedCategories.includes(item)
                              ? "bg-primary-700 border-primary-700 text-black-100"
                              : "bg-black-100 border-black-400 text-black-600"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 토스트 메시지 */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  className="absolute bottom-2 left-[18px] right-[18px] font-base bg-black-500 text-black-100 px-4 py-[15.5px] rounded-lg z-20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-base font-medium">카테고리는 5개까지만 선택 가능합니다.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
