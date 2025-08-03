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
}: SelectInputProps) => {
  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

  return (
    <div className="mb-3 flex flex-col w-full">
      <label htmlFor={name} className="font-medium text-black pb-2">
        {label}
      </label>
      <Field
        name={name}
        className="relative border border-gray-200 px-2 py-2 rounded-sm focus:outline-none focus:ring-focus"
        component="select"
        disabled={readonly}
        multiple={multiple}
      >
        <option value="">select</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {submitFailed && errors[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}
      {desc && <small className="text-gray-500">{desc}</small>}
    </div>
  );
};

export default SelectInput;
