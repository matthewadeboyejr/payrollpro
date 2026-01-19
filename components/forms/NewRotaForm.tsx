import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import SearchableSelectInput from "../ui/SearchableSelectInput";
import TextareaInput from "../ui/TextareaInput";
import useConstantData from "@/hooks/useConstantData";
import Checkbox from "../ui/Checkbox";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetEmployeesQuery } from "@/services/api/constants/employee.constant";
import { useShift } from "@/context/ShiftContext";

const NewRotaForm = ({ form, handleSubmit }: FormProps) => {
  const { shifts } = useShift();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading } = useGetEmployeesQuery(debouncedSearch);
  const employees = data?.data;
  const employeeOptions = employees?.map((employee: any) => ({
    value: employee.id,
    label: employee.fullName,
  }));
  const shiftOptions =
    shifts?.map((shift: any) => ({
      value: shift.id,
      label: shift.name,
    })) || [];

  
  return (
    <div className="max-h-[500px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 gap-2">
          <TextInput
            label="Work Date"
            name="workDate"
            type="date"
            placeholder="Work Date"
            form={form}
          />
          <SearchableSelectInput
            label="Employee"
            name="employeeId"
            options={employeeOptions || []}
            form={form}
            onSearch={setSearch}
            isLoading={isLoading}
            placeholder="Search employees..."
          />
          <SelectInput
            label="Shift"
            name="shiftId"
            options={shiftOptions}
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default NewRotaForm;
