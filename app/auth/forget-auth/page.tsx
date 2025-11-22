"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ForgetPasswordForm from "../../../components/forms/ForgetPasswordForm";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import { forgetPasswordConstraints } from "../../../components/forms/contraints/contraints";
import {
  ForgetPasswordFormValues,
  FormValidationResult,
} from "../../../components/types/formFields";
import Link from "next/link";

const ForgetAuth = () => {
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user came from a success message
  const message = searchParams.get("message");
  const isSuccess = message === "password-reset-success";

  const onSubmit = async (values: ForgetPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with your actual backend API call
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: values.email,
      //   }),
      // });

      // if (response.ok) {
      //   setIsSubmitted(true);
      // } else {
      //   const errorData = await response.json();
      //   setError(errorData.message || 'Failed to send reset email');
      // }

      // For now, simulate success
      console.log("Forgot password request:", values);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Forgot password failed:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (
    values: ForgetPasswordFormValues
  ): FormValidationResult | undefined => {
    return validate(values, forgetPasswordConstraints) || undefined;
  };

  if (isSuccess) {
    return (
      <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-green-500 mb-4">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successful
            </h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>
            <Link href="/auth" className="primary-btn w-full inline-block">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isSubmitted) {
    return (
      <main className="h-screen flex w-screen px-5 md:px-40 2xl:px-50 justify-center items-center">
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-blue-500 mb-4">
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent you a password reset link. Please check your email
              and click the link to reset your password.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="secondary-btn w-full"
              >
                Send Another Email
              </button>
              <Link href="/auth" className="primary-btn w-full inline-block">
                Back to Sign In
              </Link>
            </div>
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
              Forgot Password?
            </h2>
            <p className="text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Form<ForgetPasswordFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <ForgetPasswordForm
                handleSubmit={handleSubmit}
                submitting={submitting || isLoading}
                form={form}
              />
            )}
          />

          <div className="mt-6 text-center">
            <Link
              href="/auth"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetAuth;
