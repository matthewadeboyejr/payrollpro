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

import { persistor } from "@/redux/store";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isNavigating, setIsNavigating] = React.useState(false);

  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (values: SigninFormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const result = await loginUser(payload).unwrap();

      if (result?.code === 200 && result?.data?.token) {
        setIsNavigating(true);
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

        // Ensure state is persisted before navigation
        await persistor.flush();

        // Show success message
        showAlert("Login Success", result?.message, "success");

        // Navigate after state update
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      setIsNavigating(false);
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
            submitting={submitting || isNavigating}
            form={form}
          />
        )}
      />
    </div>
  );
};

export default Signin;
