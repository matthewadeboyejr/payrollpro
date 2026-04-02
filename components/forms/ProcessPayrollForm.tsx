import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import { FiSettings } from "react-icons/fi";
import Checkbox from "../ui/Checkbox";
import { useGetDepartmentsQuery } from "@/services/api/constants/data.constant";

const ProcessPayrollForm = ({ form, handleSubmit }: FormProps) => {
  const { data: response, isLoading: isLoadingDepts } = useGetDepartmentsQuery({});
  const departmentsData = response?.data || [];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(0, i).toLocaleString('en-GB', { month: 'long' }),
  }));

  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
  ];

  const deptOptions = departmentsData?.map((dept: { id: string | number; name: string }) => ({
    value: dept.id.toString(),
    label: dept.name,
  })) || [];

  return (
    <div className="max-h-[65vh] overflow-y-auto px-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Year"
            name="year"
            options={yearOptions}
            form={form}
          />
          <SelectInput
            label="Month"
            name="month"
            options={monthOptions}
            form={form}
          />
          <SelectInput
            label="Department"
            name="departmentId"
            options={[{ value: "0", label: "All Departments" }, ...deptOptions]}
            form={form}
            desc={isLoadingDepts ? "Loading..." : undefined}
          />
        </div>

        {/* Currency & Region */}
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-900 dark:text-gray-100">

            Regional & Currency Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectInput
              label="Currency"
              name="currency"
              options={[
                { value: "GBP", label: "British Pound (£)" },
                { value: "EUR", label: "Euro (€)" },
                { value: "USD", label: "US Dollar ($)" },
              ]}
              form={form}
            />
            <TextInput
              label="Tax Region"
              name="taxRegion"
              placeholder="e.g. UK"
              form={form}
            />
          </div>
        </div>

        {/* Tax & Insurance Processing */}
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-900 dark:text-gray-100">

            Automatic Deductions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Checkbox
              label="Use UK Progressive Tax"
              name="useUkProgressiveTax"
              form={form}
            />
            <Checkbox
              label="Include National Insurance"
              name="includeEmployeeNationalInsurance"
              form={form}
            />
            <Checkbox
              label="Use Tax Periods"
              name="useTaxPeriods"
              form={form}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <TextInput
              label="Standard Tax Rate (%)"
              name="taxRate"
              type="number"
              form={form}
              desc="If not using progressive tax"
            />
            <TextInput
              label="Pension Rate (%)"
              name="pensionRate"
              type="number"
              form={form}
            />
            <TextInput
              label="Other Deductions (%)"
              name="otherDeductionRate"
              type="number"
              form={form}
            />
          </div>
        </div>

        {/* Advanced Tax Config (Optional) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 space-y-4">
          <h3 className="font-semibold text-md flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <FiSettings />
            Advanced Tax Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Tax Year Start Year"
              name="taxYearStartYear"
              type="number"
              placeholder="2024"
              form={form}
            />
            <TextInput
              label="Tax Period Number"
              name="taxPeriodNumber"
              type="number"
              placeholder="1"
              form={form}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProcessPayrollForm;
