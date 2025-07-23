import * as React from "react";

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
  return (
    <div className="flex flex-col justify-center w-full text-sm leading-none rounded-md h-[70px]">
      <label className="text-black">
        {label}
      </label>
      <div className="flex gap-10 justify-between items-center px-4 mt-2 w-full rounded-md border border-solid bg-zinc-50 border-stone-700 min-h-[45px] text-stone-300">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full"
        >
          <option value="" disabled className="text-stone-300">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};
