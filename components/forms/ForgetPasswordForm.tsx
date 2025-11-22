import React from "react";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { ForgetPasswordFormProps } from "../types/formFields";

const ForgetPasswordForm = ({
  form,
  handleSubmit,
  submitting,
}: ForgetPasswordFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          form={form}
        />

        <button className="primary-btn w-full" type="submit">
          {submitting ? <Spinner /> : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
