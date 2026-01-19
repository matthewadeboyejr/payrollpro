import React from "react";
import { Field } from "react-final-form";
import { TextareaInputProps } from "../types/formFields";

const TextareaInput = ({
  label,
  name,
  placeholder,
  form,
  desc,
}: TextareaInputProps) => {
  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

  return (
    <div className="mb-3 flex flex-col flex-grow">
      <label htmlFor={name} className="text-xs pb-2">
        {label}
      </label>

      <div className="border border-gray-200 px-2 py-2 rounded-sm w-full">
        <Field
          name={name}
          component="textarea"
          placeholder={placeholder}
          className={` focus:outline-none focus:ring-focus  w-full `}
        />
      </div>

      {submitFailed && errors?.[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}

      {desc && <small className="text-[#7C7B7B] text-[14px]">{desc}</small>}
    </div>
  );
};

export default TextareaInput;
