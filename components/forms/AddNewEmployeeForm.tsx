import React from "react";
import TextInput from "../ui/TextInput";
import { AddNewEmployeeFormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";

const AddNewEmployeeForm = ({
  form,
  handleSubmit,
}: AddNewEmployeeFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Employee ID"
            name="employeeId"
            type="text"
            placeholder="EMP001"
            form={form}
          />
          <SelectInput
            label="Status"
            name="status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
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

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Email"
            name="email"
            type="text"
            placeholder="john.doe@example.com"
            form={form}
          />

          <TextInput
            label="Phone"
            name="phone"
            type="text"
            placeholder="07700900123"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Department"
            name="department"
            type="text"
            placeholder="Engineering"
            form={form}
          />
          <TextInput
            label="Position"
            name="position"
            type="text"
            placeholder="Senior Developer"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Annual Salary (£)"
            name="annualSalary"
            type="text"
            placeholder="50000"
            form={form}
          />
          <TextInput
            label="Start Date"
            name="startDate"
            type="date"
            placeholder="2021-01-01"
            form={form}
          />
        </div>

        <div className="flex items-center gap-4">
          <TextInput
            label="Address"
            name="address"
            type="text"
            placeholder="123 Main St, Anytown, USA"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Emergency Contact Name"
            name="emergencyContactName"
            type="text"
            placeholder="John Doe"
            form={form}
          />
          <TextInput
            label="Emergency Contact Phone"
            name="emergencyContactPhone"
            type="text"
            placeholder="07700900123"
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewEmployeeForm;
