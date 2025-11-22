import React from "react";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { signupConstraints } from "../forms/contraints/contraints";
import SignupForm from "../forms/SignupForm";
import { SignupFormValues, FormValidationResult } from "../types/formFields";
//import { useRegisterUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "../ui/ShowAlert";

const Signup = () => {
  //const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const onSubmit = async (values: SignupFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    // TODO: Implement registration when API is ready
    // try {
    //   const result = await registerUser(payload).unwrap();
    //   console.log("result", result);
    // } catch (err: unknown) {
    //   const error = err as { data?: { message?: string }; message?: string };
    //   console.error("Signup error:", error?.data);
    //   const errorMessage =
    //     error?.data?.message ||
    //     error?.message ||
    //     "Registration failed. Please try again.";
    //   showAlert("Registration Error", errorMessage, "error");
    // }
    console.log("Signup payload:", payload);
    showAlert(
      "Info",
      "Registration functionality is not yet implemented",
      "info"
    );
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
