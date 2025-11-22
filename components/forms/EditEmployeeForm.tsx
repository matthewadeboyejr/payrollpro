import React from "react";
import TextInput from "../ui/TextInput";
import { AddNewEmployeeFormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import useConstantData from "@/hooks/useConstantData";

const EditEmployeeForm = ({ form, handleSubmit }: AddNewEmployeeFormProps) => {
  const { departmentOptions, positionOptions } = useConstantData();
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
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
          <SelectInput
            label="Department"
            name="departmentId"
            options={departmentOptions}
            form={form}
          />

          <SelectInput
            label="Position"
            name="positionId"
            options={positionOptions}
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Annual Salary (£)"
            name="annualSalary"
            type="number"
            placeholder="50000"
            form={form}
          />
          <TextInput
            label="Rate Per Hour (£)"
            name="ratePerHour"
            type="number"
            placeholder="10"
            form={form}
          />
        </div>

        <div className="flex items-center gap-4">
          <TextInput
            label="Start Date"
            name="startDate"
            type="date"
            placeholder="2021-01-01"
            form={form}
          />
          <TextInput
            label="Status"
            name="status"
            type="text"
            placeholder="Active/Inactive"
            form={form}
          />
        </div>
        <div className="flex items-center gap-4">
          <TextInput
            label="Address"
            name="address"
            type="textarea"
            placeholder="123 Main St, Anytown, USA"
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
