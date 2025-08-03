import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import TextareaInput from "../ui/TextareaInput";

const AddNewExpenseForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Employee"
            name="employeeId"
            type="text"
            placeholder="EMP001"
            form={form}
          />
          <SelectInput
            label="Category"
            name="category"
            options={[
              { value: "travel", label: "Travel" },
              { value: "accommodation", label: "Accommodation" },
              { value: "food", label: "Food" },
              { value: "other", label: "Other" },
            ]}
            form={form}
          />
        </div>
        <div className="flex items-center gap-4">
          <TextareaInput
            label="Description"
            name="description"
            placeholder="Business trip to London"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Amount"
            name="amount"
            type="text"
            placeholder="£450.00"
            form={form}
          />
          <TextInput
            label="Currency"
            name="currency"
            type="text"
            placeholder="GBP"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Date"
            name="date"
            type="text"
            placeholder="15/01/2024"
            form={form}
          />

          <TextInput
            label="Receipt Reference"
            name="receiptReference"
            type="text"
            placeholder="1234567890"
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewExpenseForm;
