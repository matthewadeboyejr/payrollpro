"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SetPasswordForm from "../../components/forms/SetPasswordForm";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { setPasswordConstraints } from "../../components/forms/contraints/contraints";
import {
  SetPasswordFormValues,
  FormValidationResult,
} from "../../components/types/formFields";
import { useSetPasswordMutation } from "@/services/api/constants/auth.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const SetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [setPassword, { isSuccess }] = useSetPasswordMutation();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      validateToken();
    } else {
      setIsValidToken(false);
      setIsLoading(false);
    }
  }, [searchParams]);

  const validateToken = async () => {
    try {
      setIsValidToken(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Token validation failed:", error);
      setIsValidToken(false);
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: SetPasswordFormValues) => {
    if (!token) return;

    try {
      const payload = {
        token,
        password: values.password,
      };

      await setPassword(payload).unwrap();
    } catch (err: unknown) {
      const error = err as { data?: string; message?: string };
      const errorMessage =
        error?.data ||
        error?.message ||
        "Password reset failed. Please try again.";
      showAlert("Error", errorMessage, "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Success", "Password reset successfully", "success");
      router.push("/auth?message=password-reset-success");
    }
  }, [isSuccess, router]);

  const validateForm = (
    values: SetPasswordFormValues
  ): FormValidationResult | undefined => {
    return validate(values, setPasswordConstraints) || undefined;
  };

  if (isLoading) {
    return (
      <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating reset token...</p>
        </div>
      </main>
    );
  }

  if (!isValidToken) {
    return (
      <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Invalid or Expired Link
            </h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. Please request
              a new password reset.
            </p>
            <button
              onClick={() => router.push("/auth/forget-auth")}
              className="primary-btn w-full"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
      <div className="w-full md:w-1/2 max-w-md">
        <div className="bg-white rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Set New Password
            </h2>
            <p className="text-gray-600">
              Please enter your new password below
            </p>
          </div>

          <Form<SetPasswordFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <SetPasswordForm
                handleSubmit={handleSubmit}
                submitting={submitting}
                form={form}
              />
            )}
          />
        </div>
      </div>
    </main>
  );
};

export default SetPassword;
