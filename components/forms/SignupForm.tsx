import React from "react";
import TextInput from "../ui/TextInput";
import Checkbox from "../ui/Checkbox";
import Spinner from "../ui/Spinner";
import { SignupFormProps } from "../types/formFields";

const SignupForm = ({ form, handleSubmit, submitting }: SignupFormProps) => {
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          form={form}
        />
        <TextInput
          label="Email "
          name="email"
          type="text"
          placeholder="example@domain.com"
          form={form}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="*****"
          form={form}
        />
        <TextInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="*****"
          form={form}
        />

        <div className="flex w-full items-start lg:items-center flex-col lg:flex-row justify-between pb-5 pt-2">
          <div className="flex gap-3 justify-start items-center">
            <Checkbox
              name="check"
              form={form}
              label="Accept terms and conditions"
            />
          </div>
        </div>

        <button className="primary-btn w-full " type="submit">
          {submitting ? <Spinner /> : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
