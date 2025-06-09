import { ICountry } from "country-state-city";
import { useOnClickOutside } from "usehooks-ts";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ChevronIcon, SearchIcon } from "../icon";
import { Input } from "./input";

interface CountryDropdownProps {
  options: ICountry[];
  value: string;
  triggerPlaceholder?: string;
  placeholder?: string;
  dropdownClassName?: string;
  onChange: (value: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  options,
  value,
  triggerPlaceholder,
  placeholder,
  dropdownClassName,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  // @ts-expect-error
  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setSearch("");
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (option: ICountry) => {
    setIsOpen(false);
    onChange(option.name);
  };

  return (
    <div data-lenis-prevent className="relative z-10" ref={ref}>
      <button
        className={cn(
          "p-3 outline outline-neutral-200 rounded-lg w-full text-left flex items-center justify-between active:outline-neutral-600 active:ring-[5px] active:ring-neutral-200",
          value ? "text-primary" : "text-neutral-400",
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || triggerPlaceholder}

        <ChevronIcon className="text-neutral-500" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-[calc(100%+4px)] left-0 w-full bg-white shadow border border-border rounded-lg",
            dropdownClassName,
          )}
        >
          <div className="p-3 border-b border-neutral-100">
            <Input
              leftIcon={<SearchIcon className="text-neutral-400" />}
              ref={inputRef}
              type="text"
              placeholder={placeholder || "Search..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Options List */}
          <div className="max-h-[195px] overflow-auto divide-y divide-neutral-100">
            {filteredOptions.map((option) => (
              <div
                key={option.isoCode}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-x-2"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-neutral-400">
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
