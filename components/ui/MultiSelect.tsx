// MultiSelect.tsx
import { useState, useRef, useEffect } from "react";
import { Field } from "react-final-form";
import { SelectInputProps } from "../types/formFields";
import { FiX, FiChevronDown } from "react-icons/fi";

const MultiSelect = ({
  label,
  name,
  options,
  form,
  readonly,
  desc,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

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

  return (
    <div className="mb-3 flex flex-col w-full relative" ref={dropdownRef}>
      <label htmlFor={name} className="font-medium text-black pb-2">
        {label}
      </label>

      <Field
        name={name}
        type="checkbox"
        format={(value) => (Array.isArray(value) ? value : [])}
        parse={(value) => value}
      >
        {({ input }) => {
          const selectedValues = Array.isArray(input.value) ? input.value : [];

          const handleToggleOption = (optionValue: string) => {
            if (readonly) return;

            const newValues = selectedValues.includes(optionValue)
              ? selectedValues.filter((v) => v !== optionValue)
              : [...selectedValues, optionValue];

            input.onChange(newValues);
          };

          const handleRemoveOption = (
            optionValue: string,
            e: React.MouseEvent
          ) => {
            e.stopPropagation();
            if (readonly) return;

            const newValues = selectedValues.filter((v) => v !== optionValue);
            input.onChange(newValues);
          };

          const selectedLabels = selectedValues
            .map((val) => options?.find((opt) => opt.value === val)?.label)
            .filter(Boolean);

          return (
            <>
              {/* Selected values display */}
              <div
                className={`relative border border-gray-200 px-3 py-2 rounded-sm min-h-[42px] flex items-center flex-wrap gap-2 cursor-pointer bg-white ${
                  readonly
                    ? "bg-gray-50 cursor-not-allowed"
                    : "hover:border-gray-300"
                } ${isOpen ? "border-blue-500 ring-1 ring-blue-500" : ""}`}
                onClick={() => !readonly && setIsOpen(!isOpen)}
              >
                {selectedLabels.length === 0 ? (
                  <span className="text-gray-400 text-sm">
                    Select options...
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-2 w-full">
                    {selectedLabels.map((label, index) => {
                      const value = selectedValues[index];
                      return (
                        <span
                          key={value}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {label}
                          {!readonly && (
                            <FiX
                              className="cursor-pointer hover:text-blue-900"
                              onClick={(e) => handleRemoveOption(value, e)}
                              size={14}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}
                <FiChevronDown
                  className={`ml-auto transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </div>

              {/* Dropdown with checkboxes */}
              {isOpen && !readonly && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    {options && options.length > 0 ? (
                      options.map((option) => {
                        const isSelected = selectedValues.includes(
                          option.value
                        );
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleOption(option.value)}
                              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-focus"
                            />
                            <span className="text-sm text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        );
                      })
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No options available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Field>

      {submitFailed && errors[name] && (
        <small className="text-red-600 mt-1">{errors[name]}</small>
      )}
      {desc && <small className="text-gray-500 mt-1">{desc}</small>}
    </div>
  );
};

export default MultiSelect;
