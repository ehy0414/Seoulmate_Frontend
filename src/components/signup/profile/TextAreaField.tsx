import * as React from "react";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  value = '',
  onChange,
  maxLength = 120
}) => {
  return (
    <div className="w-full">
      <label className="text-sm leading-none text-zinc-900">
        {label}
      </label>
      <div className="flex gap-10 justify-between items-center px-4 mt-2 w-full rounded-md border border-solid bg-zinc-50 border-zinc-900 min-h-[45px] text-stone-300">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="self-stretch my-auto text-sm leading-none text-black-700 bg-transparent border-none outline-none w-full resize-none placeholder:text-stone-300"
          rows={1}
        />
        <span className="self-stretch my-auto text-xs text-stone-300">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};
