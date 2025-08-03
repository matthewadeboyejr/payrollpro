import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import { FiUsers } from "react-icons/fi";
import Checkbox from "../ui/Checkbox";
import { BiEuro } from "react-icons/bi";

const AddNewExpenseForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-2 ">
          <SelectInput
            label="Pay Period"
            name="payPeriod"
            options={[
              { value: "June 2024", label: "June 2024" },
              { value: "July 2024", label: "July 2024" },
              { value: "August 2024", label: "August 2024" },
              { value: "September 2024", label: "September 2024" },
              { value: "October 2024", label: "October 2024" },
            ]}
            form={form}
          />
          <TextInput
            label="Pay Date"
            name="payDate"
            type="date"
            placeholder="15/01/2024"
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
              <BiEuro className="text-blue-500" />
            </span>
            <span>Processing Options</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Checkbox
              label="Include overtime calculations"
              name="includeOvertimeCalculations"
              form={form}
            />
            <Checkbox
              label="Include bonuses and commissions"
              name="includeBonusesAndCommissions"
              form={form}
            />
          </div>
        </div>
        <div className=" bg-blue-50 p-4  space-y-4 rounded-sm border border-blue-200 mt-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>Processing Summary</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li className="flex justify-between text-black font-medium text-sm  ">
                <span>Pay Period:</span>
                <span>Not selected</span>
              </li>{" "}
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Pay Date</span>
                <span>Not selected</span>
              </li>
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Departments:</span>
                <span>Not selected</span>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewExpenseForm;
