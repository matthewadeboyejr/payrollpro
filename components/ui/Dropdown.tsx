import { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../types/dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { BiChevronDown } from "react-icons/bi";

const DropdownComponent = ({ options, label, size, value }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropLabel, setDropLabel] = useState(value || label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: { title: string; onClick: () => void }) => {
    setDropLabel(item.title);
    setIsOpen(false);
    if (item.onClick) {
      item.onClick();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center rounded border border-[#2663eb] px-3 py-3 cursor-pointer ${
          sizeClasses[size || "lg"]
        }  font-medium hover:bg-gray-50 transition-colors`}
      >
        <span className="text-sm font-semibold min-w-[50px] text-[#2663eb]">
          {dropLabel}
        </span>
        <BiChevronDown className="text-[#2663eb]" size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-[200px] overflow-y-auto">
          {options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(option)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm"
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;

export const Dropdown = ({ options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: { title: string; onClick: () => void }) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative " ref={dropdownRef}>
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineDotsVertical color="black" size={20} />
      </button>
      {isOpen && (
        <div className="absolute top-full  right-0 mt-1 w-fit bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-[200px] overflow-y-auto">
          {options?.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(option);
              }}
              className="w-full text-nowrap text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm"
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
