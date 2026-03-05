// SelectInput.js
import { Field } from "react-final-form";
import { SelectInputProps } from "../types/formFields";

const SelectInput = ({
  label,
  name,
  options,
  form,
  readonly,
  multiple,
  desc,
  onChange,
}: SelectInputProps) => {
  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

  return (
    <div className="mb-3 flex flex-col w-full">
      <label htmlFor={name} className="text-xs pb-2 dark:text-gray-300">
        {label}
      </label>
      <Field name={name} disabled={readonly} multiple={multiple}>
        {({ input }) => (
          <select
            {...input}
            className="relative border border-gray-200 px-2 py-2 rounded-sm focus:outline-none focus:ring-focus bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            disabled={readonly}
            multiple={multiple}
            onChange={(e) => {
              input.onChange(e);
              onChange?.(e);
            }}
          >
            <option value="">select</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      {submitFailed && errors[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}
      {desc && <small className="text-gray-500">{desc}</small>}
    </div>
  );
};

export default SelectInput;
