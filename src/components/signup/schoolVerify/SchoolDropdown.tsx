"use client";

import { useEffect, useRef, useState } from "react";

interface SchoolDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const schools = [
  "가톨릭대학교",
  "감리교신학대학교",
  "강서대학교",
  "건국대학교",
  "경기대학교(서울캠퍼스)",
  "경희대학교",
  "고려대학교",
  "광운대학교",
  "국민대학교",
  "국제언어대학원대학교",
  "국제예술대학교",
  "동국대학교",
  "동덕여자대학교",
  "동양미래대학교",
  "명지대학교",
  "명지전문대학",
  "배화여자대학교",
  "백석예술대학교",
  "삼육대학교",
  "삼육보건대학교",
  "상명대학교",
  "서강대학교",
  "서경대학교",
  "서울과학기술대학교",
  "서울교육대학교",
  "서울기독대학교",
  "서울대학교",
  "서울여자간호대학교",
  "서울여자대학교",
  "서울한영대학교",
  "서일대학교",
  "성공회대학교",
  "성균관대학교",
  "성신여자대학교",
  "세종대학교",
  "숙명여자대학교",
  "숭의여자대학교",
  "숭실대학교",
  "연세대학교",
  "이화여자대학교",
  "인덕대학교",
  "장로회신학대학교",
  "중앙대학교",
  "총신대학교",
  "추계예술대학교",
  "한국성서대학교",
  "한국외국어대학교",
  "한성대학교",
  "한양대학교",
  "한양여자대학교",
  "홍익대학교",
  "정화예술대학교",
  "전주대학교"
];


export function SchoolDropdown({
  value,
  onChange,
  placeholder = "학교를 선택해주세요.",
}: SchoolDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  

    const handleSelect = (school: string) => {
        onChange?.(school);
        setIsOpen(false);
    };

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div    ref={dropdownRef}
                className="flex flex-col mx-auto gap-2 justify-center items-center rounded-lg h-[70px] top-[249px] w-[357px] pb-5">
            <label
                htmlFor="school-select"
                className="self-stretch text-sm leading-5 text-zinc-900 max-sm:text-sm"
            >
                학교
            </label>

            <div className="relative w-full">
                <button
                id="school-select"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex shrink-0 justify-between items-center px-4 py-0 rounded-lg border border-solid bg-zinc-50 border-stone-700 h-[45px] w-[357px] max-md:w-full max-sm:px-3 max-sm:py-0 max-sm:w-full max-sm:h-10"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                >
                <span
                    className={`text-sm leading-5 ${
                    value ? "text-zinc-900" : "text-stone-300"
                    }`}
                >
                    {value || placeholder}
                </span>

                <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                    }`}
                    style={{ width: "12px", height: "10px" }}
                >
                    <path
                    d="M4.589 6.90678C4.78784 7.19378 5.21216 7.19378 5.411 6.90678L9.65246 0.784747C9.8822 0.453146 9.64488 0 9.24147 0H0.758534C0.355124 0 0.117797 0.453147 0.347537 0.784747L4.589 6.90678Z"
                    fill="#000000"
                    />
                </svg>
                </button>

                {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                    role="listbox"
                >
                    {schools.map((school) => (
                    <button
                        key={school}
                        onClick={() => handleSelect(school)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 ${
                        value === school ? "bg-zinc-100 font-medium" : ""
                        }`}
                        role="option"
                    >
                        {school}
                    </button>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}
