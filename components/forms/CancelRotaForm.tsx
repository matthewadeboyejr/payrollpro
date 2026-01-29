import React from "react";
import { FormProps } from "../types/formFields";
import TextareaInput from "../ui/TextareaInput";



const CancelRotaForm = ({ form, handleSubmit }: FormProps) => {


  return (
    <div className="max-h-[500px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 gap-2">
          <TextareaInput
            label="Reason for Cancellation"
            name="reason"
            placeholder="Reason for Cancellation"
            form={form}
          />

        </div>
      </form>
    </div>
  );
};

export default CancelRotaForm;
