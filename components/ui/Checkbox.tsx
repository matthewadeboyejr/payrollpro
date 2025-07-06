import { Field } from "react-final-form";
import { TextInputProps } from "../types/formFields";

const Checkbox = ({ name, form, label }: TextInputProps) => {
  const typedForm = form as {
    getState: () => { submitFailed: boolean; errors: Record<string, string> };
  };
  const { submitFailed, errors } = typedForm.getState();
  return (
    <div className="flex flex-row gap-2">
      <Field
        name={name}
        type="checkbox"
        component="input"
        className="focus:ring-focus text-accent check-box"
      />
      {label && <p className="text-sm text-gray-600">{label}</p>}

      {submitFailed && errors[name] && (
        <small className="text-red-600">{errors[name]}</small>
      )}
    </div>
  );
};

export default Checkbox;
