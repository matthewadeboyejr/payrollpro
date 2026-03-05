import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { AddNewExpenseFormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import TextareaInput from "../ui/TextareaInput";
import { useGetEmployeesQuery } from "@/services/api/constants/employee.constant";
import SearchableSelectInput from "../ui/SearchableSelectInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetExpenseCategoriesQuery } from "@/services/api/constants/expense.constant";

const AddNewExpenseForm = ({ form, handleSubmit, id }: AddNewExpenseFormProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading } = useGetEmployeesQuery(debouncedSearch);
  const employees = data?.data;
  const employeeOptions = employees?.map((employee: { id: string; fullName: string }) => ({
    value: employee.id,
    label: employee.fullName,
  }));


  const { data: expenseCategoriesData } = useGetExpenseCategoriesQuery(undefined);

  const expenseCategoryOptions = expenseCategoriesData?.data?.map((category: { id: string; name: string }) => ({
    value: category.id,
    label: category.name,
  }));

  console.log("expenseCategoryOptions", expenseCategoryOptions);
  return (
    <div>
      <form id={id} onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
            label="Category"
            name="categoryId"
            options={expenseCategoryOptions || []}
            form={form}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          <TextInput
            label="Amount"
            name="amount"
            type="text"
            placeholder="£450.00"
            form={form}
          />

          <TextInput
            label="Receipt"
            name="receipt"
            type="text"
            placeholder="Receipt"
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
      </form>
    </div>
  );
};

export default AddNewExpenseForm;
