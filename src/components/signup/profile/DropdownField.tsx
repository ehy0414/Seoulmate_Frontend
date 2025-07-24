import { useState, useEffect, useRef } from "react";

interface DropdownFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[];
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  placeholder,
  value = '',
  onChange,
  options = []
}) => {
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
    <div
      className="flex flex-col justify-center w-full text-sm leading-none rounded-md h-[70px]"
      ref={dropdownRef}
    >
      <label
        htmlFor="country-select"
        className="self-stretch text-sm leading-5 text-zinc-900 max-sm:text-sm pb-1"
      >
        {label}
      </label>

      <div className="relative w-full">
        <button
          id="country-select"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex shrink-0 justify-between items-center px-4 py-0 rounded-lg border border-solid bg-zinc-50 border-stone-700 h-[45px] w-[357px] max-md:w-full max-sm:px-3 max-sm:py-0 max-sm:w-full max-sm:h-10"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span
            className={`text-sm leading-5 ${value ? "text-zinc-900" : "text-stone-300"}`}
          >
            {value || placeholder}
          </span>

          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
            className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-stone-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 ${
                  value === option ? "bg-zinc-100 font-medium" : ""
                }`}
                role="option"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
