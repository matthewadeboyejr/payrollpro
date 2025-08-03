import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import TextareaInput from "../ui/TextareaInput";

const NewLeaveForm = ({ form, handleSubmit }: FormProps) => {
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
          <TextInput
            label="Employee Name"
            name="employeeName"
            type="text"
            placeholder="EMP001"
            form={form}
          />
        </div>
        <div className="flex items-center gap-4">
          <SelectInput
            label="Leave Type"
            name="leaveType"
            options={[
              { value: "Annual", label: "Annual" },
              { value: "Sick", label: "Sick" },
              { value: "Maternity", label: "Maternity" },
              { value: "Paternity", label: "Paternity" },
              { value: "Emergency", label: "Emergency" },
              { value: "Unpaid", label: "Unpaid" },
            ]}
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Start Date"
            name="startDate"
            type="date"
            placeholder="15/01/2024"
            form={form}
          />
          <TextInput
            label="End Date"
            name="endDate"
            type="date"
            placeholder="15/01/2024"
            form={form}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <TextareaInput
            label="Reason for Leave"
            name="reason"
            placeholder=" e.g I am sick"
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default NewLeaveForm;
