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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John Doe"
            form={form}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
            form={form}
          />
        </div>

        <TextInput
          label="Email "
          name="email"
          type="text"
          placeholder="example@domain.com"
          form={form}
        />

        <TextInput
          label="Phone Number"
          name="phoneNumber"
          type="text"
          placeholder="07700900123"
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
