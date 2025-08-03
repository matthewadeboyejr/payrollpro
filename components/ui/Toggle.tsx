import React from "react";
import { Field } from "react-final-form";

interface ToggleProps {
  name: string;
  label: string;
  description?: string;
}

const Toggle = ({ name, label, description }: ToggleProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div>
        <h3 className="text-sm font-semibold">{label}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="flex items-center justify-end">
        <Field name={name} type="checkbox">
          {({ input }) => (
            <label className="inline-flex items-center cursor-pointer">
              <input {...input} type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-300 bg-gray-200 rounded-full px-2 py-1">
                {input.checked ? "Enabled" : "Disabled"}
              </span>
            </label>
          )}
        </Field>
      </div>
    </div>
  );
};

export default Toggle;
