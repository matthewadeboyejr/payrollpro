import React from "react";
import TextInput from "../ui/TextInput";
import { AddNewSalaryBandFormProps } from "../types/formFields";
import TextareaInput from "../ui/TextareaInput";
import SelectInput from "../ui/SelectInput";
import { useGetGradeLevelsQuery } from "@/services/api/constants/employee.constant";

const AddNewSalaryBandForm = ({
  form,
  handleSubmit,
}: AddNewSalaryBandFormProps) => {
  const { data: gradeLevels } = useGetGradeLevelsQuery(undefined);
  const gradeLevelOptions = gradeLevels?.map((gradeLevel: { id: string; name: string }) => ({
    value: gradeLevel?.id,
    label: gradeLevel?.name,
  }));
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <TextInput
            label="Code"
            name="code"
            type="text"
            placeholder="SB001"
            form={form}
          />
          <SelectInput
            label="Grade Level"
            name="gradeLevelId"
            options={gradeLevelOptions}
            form={form}
          />
          <TextInput
            label="Step"
            name="step"
            type="number"
            placeholder="1"
            form={form}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <SelectInput
            label="Pay Type"
            name="payType"
            options={[
              { value: "Hourly", label: "Hourly" },
              { value: "Daily", label: "Daily" },
              { value: "Weekly", label: "Weekly" },
              { value: "Fortnightly", label: "Fortnightly" },
              { value: "Monthly", label: "Monthly" },
              { value: "Quarterly", label: "Quarterly" },
              { value: "Annually", label: "Annually" },
              { value: "One-off", label: "One-off" },
              { value: "Other", label: "Other" },
            ]}
            form={form}
          />

          <SelectInput
            label="Currency"
            name="currency"
            options={[
              { value: "GBP", label: "GBP" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ]}
            form={form}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <TextInput
            label="Min Salary"
            name="minSalary"
            type="number"
            placeholder="10000"
            form={form}
          />

          <TextInput
            label="Mid Point"
            name="midPoint"
            type="number"
            placeholder="15000"
            form={form}
          />
          <TextInput
            label="Max Salary"
            name="maxSalary"
            type="number"
            placeholder="20000"
            form={form}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <TextInput
            label="Housing Allowance"
            name="housingAllowance"
            type="number"
            placeholder="500"
            form={form}
          />

          <TextInput
            label="Transport Allowance"
            name="transportAllowance"
            type="number"
            placeholder="200"
            form={form}
          />
          <TextInput
            label="Other Allowance"
            name="otherAllowance"
            type="number"
            placeholder="100"
            form={form}
          />
        </div>
        <div className="grid grid-cols-1 ">
          <TextareaInput
            label="Description"
            name="description"
            placeholder="Description"
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

export default AddNewSalaryBandForm;
