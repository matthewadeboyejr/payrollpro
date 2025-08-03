import React from "react";
import TextInput from "../ui/TextInput";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import { CgEuro } from "react-icons/cg";

const TaxCalculatorForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 grid-cols-1 gap-2"
      >
        <div className="grid grid-cols-1 gap-2 border border-gray-200 p-4 rounded-sm">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>Employee Details</span>
          </h2>

          <TextInput
            label="Annual Gross Salary (£)"
            name="submissionType"
            type="number"
            placeholder="0"
            form={form}
          />

          <SelectInput
            label="Tax Code"
            name="taxCode"
            options={[
              {
                value: "1257L (Standard)1100L",
                label: "1257L (Standard)1100L ",
              },
              {
                value: "1100LL",
                label: "1100LL",
              },
              {
                value: "BR (Basic Rate)",
                label: "BR (Basic Rate)L",
              },
              {
                value: "D0 (Higher Rate)",
                label: "D0 (Higher Rate)",
              },
              {
                value: "D1 (Additional Rate)",
                label: "D1 (Additional Rate)",
              },
            ]}
            form={form}
          />
          <SelectInput
            label="Pay Frequency"
            name="payFrequency"
            options={[
              {
                value: "Monthly",
                label: "Monthly",
              },
              {
                value: "Weekly",
                label: "Weekly",
              },
              {
                value: "Annually",
                label: "Annually",
              },
            ]}
            form={form}
          />

          <TextInput
            label="Annual Pension Contribution (£)"
            name="annualPensionContribution"
            type="number"
            placeholder="0"
            form={form}
          />
          <SelectInput
            label="Student Loan Plan"
            name="studentLoanPlan"
            options={[
              {
                value: "No Student Loan",
                label: "No Student Loan",
              },
              {
                value: "Plan 1",
                label: "Plan 1",
              },
              {
                value: "Plan 2",
                label: "Plan 2",
              },
              {
                value: "Postgraduate",
                label: "Postgraduate",
              },
            ]}
            form={form}
          />
        </div>
        <div className="border border-gray-200 p-4 rounded-sm">
          <div className="  space-y-4 ">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <span>
                <CgEuro className="text-blue-500" />
              </span>
              <span>Calculation Results</span>
            </h2>
            <div className="">
              <ul className="space-y-2">
                <li className="flex justify-between border-b border-gray-200 pb-2 text-black font-semibold text-sm  ">
                  <span>Gross Pay:</span>
                  <span>£0</span>
                </li>
                <li className="flex justify-between text-black font-medium text-lg">
                  <span>Deductions:</span>
                </li>
                <li className="flex justify-between text-black font-medium text-sm">
                  <span>Income Tax (PAYE):</span>
                  <span>-£0</span>
                </li>
                <li className="flex justify-between text-black font-medium text-sm">
                  <span>National Insurance:</span>
                  <span>-£0</span>
                </li>
                <li className="flex justify-between text-black font-medium text-lg">
                  <span>Total Deductions:</span>
                  <span>-£0</span>
                </li>
                <li className="flex justify-between text-black bg-green-50 px-2 py-4 rounded-sm font-bold text-sm">
                  <span>Net Pay:</span>
                  <span>£0</span>
                </li>
              </ul>
            </div>
          </div>

          <div className=" bg-blue-50 p-4  space-y-2 rounded-sm border border-blue-200 mt-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <span>Per Period Breakdown:</span>
            </h2>
            <div className=" gap-4">
              <ul>
                <li className="flex justify-between text-black font-medium text-sm  ">
                  <span>Monthly Net:</span>
                  <span>£0</span>
                </li>
                <li className="flex justify-between text-black font-medium text-sm  ">
                  <span>Weekly Net:</span>
                  <span>£0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaxCalculatorForm;
