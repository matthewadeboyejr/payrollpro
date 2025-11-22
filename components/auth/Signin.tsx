import React, { useEffect } from "react";
import SigninForm from "../forms/SigninForm";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { signinConstraints } from "../forms/contraints/contraints";
import { useRouter } from "next/navigation";
import { SigninFormValues, FormValidationResult } from "../types/formFields";
import { useLoginUserMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "../ui/ShowAlert";
import { useDispatch } from "react-redux";
import {
  updateUser,
  userData,
  userIsAuthenticated,
  userToken,
  userRefreshToken,
} from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/hooks";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useAppSelector(userData);
  const token = useAppSelector(userToken);
  const refreshToken = useAppSelector(userRefreshToken);
  const isAuthenticated = useAppSelector(userIsAuthenticated);

  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

  const onSubmit = async (values: SigninFormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const result = await loginUser(payload).unwrap();

      if (result?.code === 200) {
        showAlert("Login Success", result?.message, "success");

        dispatch(
          updateUser({
            user: result?.data?.user,
            token: result?.data?.token,
            refreshToken: result?.data?.refreshToken,
            error: null,
            isAuthenticated: true,
          })
        );
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Login failed. Please try again.";
      showAlert("Login Error", errorMessage, "error");
    }
  };

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isSuccess, router, isAuthenticated]);

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
