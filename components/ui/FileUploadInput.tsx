import React, { useRef } from "react";
import { Field } from "react-final-form";
import { FiUpload, FiFile, FiX } from "react-icons/fi";

interface FileUploadInputProps {
  label: string;
  name: string;
  readonly?: boolean;
  accept?: string;
}

const FileUploadInput = ({ label, name, readonly, accept = "image/*,application/pdf" }: FileUploadInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="mb-3 flex flex-col flex-grow w-full">
      <label className="text-xs pb-2 dark:text-gray-300 font-medium">
        {label}
      </label>

      <Field name={name}>
        {({ input: { value, onChange } }) => (
          <div className={`relative border border-dashed border-gray-300 rounded-md p-4 transition-all hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-700/50 ${readonly ? 'opacity-70 pointer-events-none' : 'cursor-pointer'}`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, onChange)}
              className="hidden"
              accept={accept}
              disabled={readonly}
            />

            {!value ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 py-2"
              >
                <FiUpload className="text-gray-400" size={20} />
                <span className="text-xs text-gray-500 dark:text-gray-400">Click to upload receipt</span>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FiFile className="text-blue-500 shrink-0" size={16} />
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate font-medium">
                    {value instanceof File ? value.name : "Uploaded Attachment"}
                  </span>
                </div>
                {!readonly && (
                  <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="p-1 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-red-500"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default FileUploadInput;
