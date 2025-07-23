import * as React from "react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'date';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value = '',
  onChange,
  type = 'text'
}) => {
  return (
    <div className="w-full text-sm leading-none">
      <label className="text-zinc-900">
        {label}
      </label>
      <div className="flex items-center px-4 mt-2 w-full rounded-md border border-solid bg-zinc-50 border-zinc-900 min-h-[45px] text-stone-300">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="self-stretch my-auto text-black-700 bg-transparent border-none outline-none w-full placeholder:text-stone-300"
        />
      </div>
    </div>
  );
};
