import { useState } from "react";
import { CategoryModal } from "./CategoryModal";
import DropVector from '../../assets/common/dropdown-triangle.svg';
interface CategoryDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value = '',
  onChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 선택된 카테고리들을 배열로 관리
  const selectedCategories = value ? value.split(', ').filter(Boolean) : [];

  const handleSelect = (category: string) => {
    let newCategories = [...selectedCategories];
    
    if (newCategories.includes(category)) {
      // 이미 선택된 경우 제거
      newCategories = newCategories.filter(item => item !== category);
    } else if (newCategories.length < 5) {
      // 최대 5개까지만 추가
      newCategories.push(category);
    }
    
    // 쉼표로 연결하여 문자열로 변환
    const newValue = newCategories.join(', ');
    onChange?.(newValue);
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full text-sm font-medium">
        <div className="text-black-700">
          카테고리
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex justify-between items-center h-[45px] px-4 mt-2 w-full rounded-[8px] border bg-black-100 border-black-700 text-black-300"
        >
          <span className={`self-stretch my-auto ${value ? "text-black-700" : "text-stone-300"}`}>
            {value || "모임에 맞는 카테고리를 선택하세요. (최대 5개)"}
          </span>
          <img
            src={DropVector}
            className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2] fill-stone-200"
            alt="Open category modal"
          />
        </button>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        selectedCategories={selectedCategories}
      />
    </>
  );
};
