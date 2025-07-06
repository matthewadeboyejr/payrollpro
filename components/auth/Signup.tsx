import React from "react";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { signupConstraints } from "../forms/contraints/contraints";
import SignupForm from "../forms/SignupForm";
import { SignupFormValues, FormValidationResult } from "../types/formFields";

const Signup = () => {
  const onSubmit = (values: SignupFormValues) => {
    console.log("Signup values:", values);
  };

  const validateForm = (
    values: SignupFormValues
  ): FormValidationResult | undefined => {
    return validate(values, signupConstraints) || undefined;
  };

  return (
    <div>
      <Form<SignupFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form, submitting }) => (
          <SignupForm
            handleSubmit={handleSubmit}
            submitting={submitting}
            form={form}
          />
        )}
      />
    </div>
  );
};

export default Signup;
