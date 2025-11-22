import React from "react";
import TextInput from "../ui/TextInput";
import { AddNewUserFormProps } from "../types/formFields";

const AddNewUserForm = ({ form, handleSubmit }: AddNewUserFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
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

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            form={form}
          />

          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            placeholder="07700900123"
            form={form}
          />
        </div>

        {/* <div className="grid grid-cols-1 gap-2">
          <SelectInput
            label="Role"
            name="roleId"
            form={form}
            options={roleOptions}
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddNewUserForm;
