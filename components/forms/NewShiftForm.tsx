import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import TextareaInput from "../ui/TextareaInput";
import useConstantData from "@/hooks/useConstantData";
import Checkbox from "../ui/Checkbox";

const NewShiftForm = ({ form, handleSubmit }: FormProps) => {
  const { departmentOptions } = useConstantData();
  return (
    <div className="max-h-[500px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 gap-2">
          <TextInput
            label="Shift Name"
            name="name"
            type="text"
            placeholder="Shift Name"
            form={form}
          />
        </div>
        <div className="flex items-center gap-4">
          <SelectInput
            label="Department"
            name="departmentId"
            options={departmentOptions}
            form={form}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <TextareaInput
            label="Description"
            name="description"
            placeholder="Description"
            form={form}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <TextareaInput
            label="Address"
            name="address"
            placeholder="Address"
            form={form}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <TextInput
            label="Emergency Contact Name"
            name="emergencyContactName"
            type="text"
            placeholder="Emergency Contact Name"
            form={form}
          />
          <TextInput
            label="Emergency Contact Number"
            name="emergencyContactPhone"
            type="text"
            placeholder="Emergency Contact Number"
            form={form}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <TextInput
            label="Start Time"
            name="startTime"
            type="time"
            placeholder="10:00"
            form={form}
          />
          <TextInput
            label="End Time"
            name="endTime"
            type="time"
            placeholder="18:00"
            form={form}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
          <TextInput
            label="Rate Per Hour"
            name="ratePerHour"
            type="number"
            placeholder="Rate Per Hour"
            form={form}
          />

          <Checkbox label="Is Overnight" name="isOvernight" form={form} />
        </div>
      </form>
    </div>
  );
};

export default NewShiftForm;
