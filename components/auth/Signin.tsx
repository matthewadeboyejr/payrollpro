import React from "react";
import SigninForm from "../forms/SigninForm";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { signinConstraints } from "../forms/contraints/contraints";
import { useRouter } from "next/navigation";
import { SigninFormValues, FormValidationResult } from "../types/formFields";

const Signin = () => {
  const router = useRouter();

  const onSubmit = (values: SigninFormValues) => {
    console.log("Signin values:", values);
    router.push("/dashboard");
  };

  const validateForm = (
    values: SigninFormValues
  ): FormValidationResult | undefined => {
    return validate(values, signinConstraints) || undefined;
  };

  return (
    <div>
      <Form<SigninFormValues>
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form, submitting }) => (
          <SigninForm
            handleSubmit={handleSubmit}
            submitting={submitting}
            form={form}
          />
        )}
      />
    </div>
  );
};

export default Signin;
