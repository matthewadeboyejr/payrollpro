import React from "react";
import { FormProps } from "../types/formFields";
import TextareaInput from "../ui/TextareaInput";

const ReviewLeaveForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex items-center gap-4">
          <TextareaInput
            label="Comments (Optional)"
            name="comments"
            placeholder="Add comments here"
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewLeaveForm;
