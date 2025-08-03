import React from "react";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import { FiUsers } from "react-icons/fi";
import Checkbox from "../ui/Checkbox";
import { RiBillLine } from "react-icons/ri";

const BulkActionForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 gap-2 ">
          <SelectInput
            label="Select Action"
            name="action"
            options={[
              { value: "Generate Payslips", label: "Generate Payslips" },
              { value: "Send Payslips", label: "Send Payslips" },
              { value: "View Payslips", label: "View Payslips" },
              { value: "Download Payslips", label: "Download Payslips" },
              { value: "Regenerate Payslips", label: "Regenerate Payslips" },
            ]}
            form={form}
          />
        </div>
        <div className=" bg-gray-50 p-4  space-y-4 rounded-sm border border-gray-200">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>
              <FiUsers className="text-blue-500" />
            </span>
            <span>Select Departments</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Checkbox label="Engineering" name="engineering" form={form} />
            <Checkbox label="HR" name="hr" form={form} />
            <Checkbox label="Marketing" name="marketing" form={form} />
            <Checkbox label="Finance" name="finance" form={form} />
            <Checkbox label="Sales" name="sales" form={form} />

            <Checkbox
              label="Customer Service"
              name="customerService"
              form={form}
            />
          </div>
        </div>
        <div className=" bg-gray-50 p-4  space-y-4 rounded-sm border border-gray-200 mt-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>
              <RiBillLine className="text-blue-500" />
            </span>
            <span>Include Payslips With Status</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Checkbox label="Generated" name="generated" form={form} />
            <Checkbox label="Sent" name="sent" form={form} />
          </div>
        </div>
        <div className=" bg-blue-50 p-4  space-y-4 rounded-sm border border-blue-200 mt-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>Action Summary</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li className="flex justify-between text-black font-medium text-sm  ">
                <span>Action: </span>
                <span>generate</span>
              </li>
              <li className="flex justify-between text-black font-medium text-sm">
                <span> Departments: </span>
                <span>Not selected</span>
              </li>
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Estimated payslips affected:</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BulkActionForm;
