
import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import TextareaInput from "../ui/TextareaInput";
import { useGetEmployeesQuery } from "@/services/api/constants/employee.constant";
import SearchableSelectInput from "../ui/SearchableSelectInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetIncomeCategoriesQuery } from "@/services/api/constants/expense.constant";


const AddNewIncomeForm = ({ form, handleSubmit, id }: FormProps) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    const { data, isLoading } = useGetEmployeesQuery(debouncedSearch);
    const employees = data?.data;
    const employeeOptions = employees?.map((employee: { id: string; fullName: string }) => ({
        value: employee.id,
        label: employee.fullName,
    }));

    const { data: incomeCategoriesData } = useGetIncomeCategoriesQuery(undefined);

    console.log("incomeCategoriesData", incomeCategoriesData);

    const categoryOptions = incomeCategoriesData?.data?.map((category: { id: string; name: string }) => ({
        value: category.id,
        label: category.name,
    }));

    return (
        <div>

            <form id={id} onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-2 gap-2">
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
                        options={categoryOptions || []}
                        form={form}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Amount"
                        name="amount"
                        type="text"
                        placeholder="£1,000.00"
                        form={form}
                    />
                    <TextInput
                        label="Date"
                        name="incomeDate"
                        type="datetime-local"
                        placeholder="Select Date"
                        form={form}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <TextareaInput
                        label="Description"
                        name="description"
                        placeholder="Payment for..."
                        form={form}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNewIncomeForm;
