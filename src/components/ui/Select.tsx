import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  placeholder = "انتخاب کنید",
  className = "",
  onChange,
  value,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(
    typeof value === "string" || typeof value === "number" ? value : undefined
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof value === "string" || typeof value === "number") {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          className={`w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-md text-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 flex items-center justify-between ${className}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          {...props}>
          <span className={selectedOption ? "text-gray-300" : "text-gray-500"}>{displayText}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-4 py-3 text-right text-gray-300 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none transition-colors duration-200 ${
                  selectedValue === option.value ? "bg-slate-700 text-yellow-400" : ""
                }`}
                onClick={() => handleSelect(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Select };
