import React, { memo } from "react";
import TextInput from "../ui/TextInput";
import { EditUserFormProps } from "../types/formFields";
import useConstantData from "@/hooks/useConstantData";
import MultiSelect from "../ui/MultiSelect";
import SelectInput from "../ui/SelectInput";

const EditUserForm = memo<EditUserFormProps>(({ form, handleSubmit }) => {
  const { roleOptions, statuses } = useConstantData();

  return (
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

      <div className="grid grid-cols-1 gap-2 mt-2">
        <SelectInput
          label="Status"
          name="status"
          form={form}
          options={statuses || []}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 mt-2">
        <MultiSelect
          label="Roles"
          name="roleIds"
          form={form}
          options={roleOptions || []}
        />
      </div>
    </form>
  );
});

EditUserForm.displayName = "EditUserForm";

export default EditUserForm;
