import React from "react";
import Link from "next/link";
import TextInput from "../ui/TextInput";
import Checkbox from "../ui/Checkbox";
import Spinner from "../ui/Spinner";
import { SigninFormProps } from "../types/formFields";

const SigninForm = ({ form, handleSubmit, submitting }: SigninFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <div className="flex w-full items-start lg:items-center flex-col lg:flex-row justify-between pb-5 pt-2">
          <div className="flex gap-3 justify-start items-center">
            <Checkbox name="check" form={form} label="Remember for 30 days" />
          </div>

          <Link
            href={"/auth/forget-auth"}
            className="text-sm  text-center pt-4 lg:pt-0 text-gray-600"
          >
            Forgot your password?
          </Link>
        </div>

        <button className="primary-btn w-full " type="submit">
          {submitting ? <Spinner /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
