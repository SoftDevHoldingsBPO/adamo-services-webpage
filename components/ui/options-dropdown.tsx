"use client";

import { useOnClickOutside } from "usehooks-ts";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ChevronIcon } from "../icon";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface OptionsDropdownProps {
  options: DropdownOption[];
  value: string;
  placeholder?: string;
  dropdownClassName?: string;
  isError?: boolean;
  onChange: (value: string) => void;
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  options,
  value,
  placeholder,
  dropdownClassName,
  isError,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  // @ts-expect-error
  useOnClickOutside(ref, () => setIsOpen(false));

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = (option: DropdownOption) => {
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div
      data-lenis-prevent
      className={cn("relative", isOpen ? "z-30" : "z-10")}
      ref={ref}
    >
      <button
        className={cn(
          "p-3 outline outline-neutral-200 rounded-lg w-full text-left flex items-center justify-between active:outline-neutral-600 active:ring-[5px] active:ring-neutral-200",
          selectedOption ? "text-primary" : "text-neutral-400",
          isError &&
            "outline-destructive shadow-[0px_0px_0px_4px_rgba(239,68,68,0.1)]",
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2 text-base">
          {selectedOption?.icon && selectedOption.icon}
          {selectedOption?.label || placeholder}
        </span>
        <ChevronIcon className="text-neutral-500 shrink-0" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-[calc(100%+4px)] left-0 w-full bg-white shadow border border-border rounded-lg z-20",
            dropdownClassName,
          )}
        >
          <div className="max-h-[195px] overflow-auto divide-y divide-neutral-100">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-x-2 text-base",
                  option.value === value
                    ? "text-primary font-medium"
                    : "text-neutral-700",
                )}
                onClick={() => handleSelect(option)}
              >
                {option.icon && option.icon}
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
