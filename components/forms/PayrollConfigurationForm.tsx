import React from "react";
import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import Toggle from "../ui/Toggle";
import { FormApi } from "final-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<any>;
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  submitting?: boolean;
}

const PayrollConfigurationForm = ({ form, handleSubmit }: Props) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextInput
          label="Effective From"
          name="effectiveFrom"
          type="date"
          form={form}
        />
        <SelectInput
          label="Default Tax Region"
          name="defaultTaxRegion"
          options={[
            { value: "England", label: "England" },
            { value: "Scotland", label: "Scotland" },
            { value: "Wales", label: "Wales" },
            { value: "Northern Ireland", label: "Northern Ireland" },
          ]}
          form={form}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <SelectInput
          label="Tax Year Start Month"
          name="taxYearStartMonth"
          options={[
            { value: "1", label: "January" },
            { value: "2", label: "February" },
            { value: "3", label: "March" },
            { value: "4", label: "April" },
            { value: "5", label: "May" },
            { value: "6", label: "June" },
            { value: "7", label: "July" },
            { value: "8", label: "August" },
            { value: "9", label: "September" },
            { value: "10", label: "October" },
            { value: "11", label: "November" },
            { value: "12", label: "December" },
          ]}
          form={form}
        />
        <TextInput
          label="Tax Year Start Day"
          name="taxYearStartDay"
          type="number"
          placeholder="6"
          form={form}
        />
      </div>

      <div className="space-y-4">
        <Toggle
          name="enableProgressiveTax"
          label="Progressive Tax"
          description="Enable UK-style progressive income tax bands"
        />
        <Toggle
          name="enableEmployeeNi"
          label="Employee NI"
          description="Enable National Insurance deductions for employees"
        />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <TextInput
          label="Auto-Enroll Trigger (£)"
          name="autoEnrollEarningsTriggerAnnual"
          type="number"
          placeholder="10000"
          form={form}
        />
        <TextInput
          label="EE Pension Rate"
          name="defaultEmployeePensionRate"
          type="number"
          placeholder="0.05"
          desc="e.g. 0.05 for 5%"
          form={form}
        />
        <TextInput
          label="ER Pension Rate"
          name="defaultEmployerPensionRate"
          type="number"
          placeholder="0.03"
          desc="e.g. 0.03 for 3%"
          form={form}
        />
      </div>
    </form>
  );
};

export default PayrollConfigurationForm;
