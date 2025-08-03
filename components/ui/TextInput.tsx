import React, { useState } from "react";
import { Field } from "react-final-form";
import { TextInputProps } from "../types/formFields";
import { FiEye, FiEyeOff } from "react-icons/fi";

const TextInput = ({
  label,
  name,
  type,
  placeholder,
  form,
  classes,
  readonly,
  desc,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3 flex flex-col flex-grow">
      <label htmlFor={name} className="font-medium text-black pb-2">
        {label}
      </label>

      <div className="relative border border-gray-200 px-2 py-2 rounded-sm ">
        <Field
          name={name}
          type={inputType}
          component="input"
          placeholder={placeholder}
          readOnly={readonly}
          className={` focus:outline-none focus:ring-focus  ${classes}`}
        />

        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 "
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff color="grey" /> : <FiEye color="grey" />}
          </button>
        )}
      </div>

      {submitFailed && errors?.[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}

      {desc && <small className="text-[#7C7B7B] text-[14px]">{desc}</small>}
    </div>
  );
};

export default TextInput;
