import React, { useState, useRef, useEffect } from "react";
import { Field } from "react-final-form";
import { SelectInputProps } from "../types/formFields";
import { FiChevronDown, FiX } from "react-icons/fi";

interface SearchableSelectInputProps extends SelectInputProps {
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const SearchableSelectInput = ({
  label,
  name,
  options,
  form,
  readonly,
  desc,
  onChange,
  onSearch,
  isLoading = false,
  placeholder = "Search...",
}: SearchableSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions(options || []);
    } else {
      const filtered = (options || []).filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Call onSearch callback when search term changes (for async search)
  useEffect(() => {
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(searchTerm);
      }, 300); // Debounce async search
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getSelectedLabel = (value: string) => {
    if (!value) return "";
    const option = options?.find((opt) => opt.value === value);
    return option?.label || "";
  };

  return (
    <div className="mb-3 flex flex-col w-full relative" ref={dropdownRef}>
      <label htmlFor={name} className="text-xs pb-2">
        {label}
      </label>
      <Field name={name} disabled={readonly}>
        {({ input }) => (
          <div className="relative">
            <button
              type="button"
              onClick={() => !readonly && setIsOpen(!isOpen)}
              disabled={readonly}
              className={`w-full relative border border-gray-200 px-2 py-2 rounded-sm focus:outline-none focus:ring-focus text-left flex items-center justify-between ${
                readonly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
            >
              <span className={input.value ? "text-gray-900" : "text-gray-500"}>
                {input.value ? getSelectedLabel(input.value) : "Select..."}
              </span>
              <div className="flex items-center gap-2">
                {input.value && !readonly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      input.onChange("");
                      onChange?.({
                        target: { value: "" },
                      } as React.ChangeEvent<HTMLSelectElement>);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={16} />
                  </button>
                )}
                <FiChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {isOpen && !readonly && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg max-h-60 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Loading...
                    </div>
                  ) : filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          input.onChange(option.value);
                          onChange?.({
                            target: { value: option.value },
                          } as React.ChangeEvent<HTMLSelectElement>);
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                          input.value === option.value
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No options found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Field>
      {submitFailed && errors[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}
      {desc && <small className="text-gray-500">{desc}</small>}
    </div>
  );
};

export default SearchableSelectInput;
