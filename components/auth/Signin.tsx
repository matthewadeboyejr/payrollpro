import React from "react";
import SigninForm from "../forms/SigninForm";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { signinConstraints } from "../forms/contraints/contraints";
import { useRouter } from "next/navigation";
import { SigninFormValues, FormValidationResult } from "../types/formFields";
import { useLoginUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "../ui/ShowAlert";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/slice/user.slice";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (values: SigninFormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const result = await loginUser(payload).unwrap();

      if (result?.code === 200 && result?.data?.token) {
        // Update Redux state first (synchronous update)
        dispatch(
          updateUser({
            user: result?.data?.user,
            token: result?.data?.token,
            refreshToken: result?.data?.refreshToken,
            error: null,
            isAuthenticated: true,
          })
        );

        // Show success message
        showAlert("Login Success", result?.message, "success");

        // Navigate after state update
        // Use Promise to ensure state is processed before navigation
        Promise.resolve().then(() => {
          router.replace("/dashboard");
        });
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "Login failed. Please try again.";
      showAlert("Login Error", errorMessage, "error");
    }
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
