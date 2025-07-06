import { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../types/dropdown";

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
    <div className="relative text-black" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center rounded border px-3 h-[40px] cursor-pointer ${
          sizeClasses[size || "lg"]
        } font-[Urbanist] font-normal hover:bg-gray-50 transition-colors`}
      >
        <span className="text-[12px] font-[Urbanist] min-w-[50px]">
          {dropLabel}
        </span>
        <svg
          width="25"
          height="25"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`pl-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M10.1666 7.16602L7.99998 9.49935L5.83331 7.16602"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
