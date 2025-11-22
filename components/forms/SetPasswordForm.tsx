import React from "react";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { SetPasswordFormProps } from "../types/formFields";

const SetPasswordForm = ({
  form,
  handleSubmit,
  submitting,
}: SetPasswordFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="New Password"
          name="password"
          type="password"
          placeholder="Enter your new password"
          form={form}
        />
        <TextInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          form={form}
        />

        <div className="mb-6">
          <div className="text-sm text-gray-600">
            <p className="mb-2">Password requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>At least 8 characters long</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one lowercase letter</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>
        </div>

        <button className="primary-btn w-full" type="submit">
          {submitting ? <Spinner /> : "Set New Password"}
        </button>
      </form>
    </div>
  );
};

export default SetPasswordForm;
