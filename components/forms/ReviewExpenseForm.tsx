import React from "react";
import { FormProps } from "../types/formFields";
import TextareaInput from "../ui/TextareaInput";
import SelectInput from "../ui/SelectInput";

const ReviewExpenseForm = ({ form, handleSubmit, id }: FormProps) => {
  return (
    <div>
      <form id={id} onSubmit={handleSubmit} className="">
        <div className="flex items-center gap-4">
          <SelectInput
            label="Status"
            name="status"
            options={[
              { value: "0", label: "Approved" },
              //{ value: "2", label: "Pending" },
              { value: "1", label: "Rejected" },
            ]}
            form={form}
          />

        </div>
        <TextareaInput
          label="Comments"
          name="comment"
          placeholder="Add comment here"
          form={form}
        />
      </form>
    </div>
  );
};

export default ReviewExpenseForm;
