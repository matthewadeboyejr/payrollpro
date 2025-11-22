import React, { useEffect } from "react";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { useRouter } from "next/navigation";
import { signupConstraints } from "../forms/contraints/contraints";
import SignupForm from "../forms/SignupForm";
import { SignupFormValues, FormValidationResult } from "../types/formFields";
//import { useRegisterUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "../ui/ShowAlert";

const Signup = () => {
  const router = useRouter();

  //const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const onSubmit = async (values: SignupFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    try {
      const result = await registerUser(payload).unwrap();
      console.log("result", result);
    } catch (err: any) {
      console.error("Signup error:", err?.data);
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      showAlert("Registration Error", errorMessage, "error");
    }
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
