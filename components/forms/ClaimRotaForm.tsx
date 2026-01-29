import React, { useState } from "react";
import { FormProps } from "../types/formFields";
import SearchableSelectInput from "../ui/SearchableSelectInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetEmployeesQuery } from "@/services/api/constants/employee.constant";

const ClaimRotaForm = ({ form, handleSubmit }: FormProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading } = useGetEmployeesQuery(debouncedSearch);
  const employees = data?.data;
  const employeeOptions = employees?.map((employee: { id: string; fullName: string }) => ({
    value: employee.id,
    label: employee.fullName,
  }));


  return (
    <div className="max-h-[500px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 gap-2">
          <SearchableSelectInput
            label="Employee"
            name="employeeId"
            options={employeeOptions || []}
            form={form}
            onSearch={setSearch}
            isLoading={isLoading}
            placeholder="Search employees..."
          />
        </div>
      </form>
    </div>
  );
};

export default ClaimRotaForm;
