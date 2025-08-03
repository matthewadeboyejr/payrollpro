import React from "react";
import { FormProps } from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import Checkbox from "../ui/Checkbox";
import { FaRegFileLines } from "react-icons/fa6";

const AddNewExpenseForm = ({ form, handleSubmit }: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-2 ">
          <SelectInput
            label="Submission Type"
            name="submissionType"
            options={[
              {
                value: "Monthly RTI Submission  ",
                label: "Monthly RTI Submission",
              },
              {
                value: "Annual P35/P14 Submission",
                label: "Annual P35/P14 Submission",
              },
              {
                value: "Correction Submission",
                label: "Correction Submission",
              },
              {
                value: "Annual P11D Submission",
                label: "Annual P11D Submission",
              },
              {
                value: "Final Submission",
                label: "Final Submission",
              },
            ]}
            form={form}
          />
          <SelectInput
            label="Tax Period"
            name="taxPeriod"
            options={[
              { value: "June 2024", label: "June 2024" },
              { value: "July 2024", label: "July 2024" },
              { value: "August 2024", label: "August 2024" },
              { value: "September 2024", label: "September 2024" },
              { value: "October 2024", label: "October 2024" },
            ]}
            form={form}
          />
        </div>
        <div className=" bg-gray-50 p-4  space-y-4 rounded-sm border border-gray-200">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>
              <FaRegFileLines className="text-blue-500" />
            </span>
            <span>Submission Documentss</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Checkbox
              label="include EPS (Employer Payment Summary)"
              name="includeEPS"
              form={form}
            />
            <Checkbox
              label="Include FPS (Full Payment Submission)"
              name="includeFPS"
              form={form}
            />
            <Checkbox
              label="Include P45/P46 Forms"
              name="includeP45P46"
              form={form}
            />
          </div>
        </div>

        <div className=" bg-blue-50 p-4  space-y-4 rounded-sm border border-blue-200 mt-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>Submission Summary</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li className="flex justify-between text-black font-medium text-sm  ">
                <span>Submission Type:</span>
                <span>final</span>
              </li>{" "}
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Tax Period:</span>
                <span>Not selected</span>
              </li>
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Total NI contributions:</span>
                <span>£1,633</span>
              </li>
              <li className="flex justify-between text-black font-medium text-sm">
                <span>Estimated employees affected: </span>
                <span>45</span>
              </li>
            </ul>
          </div>
        </div>
        <div className=" text-orange-700 bg-yellow-50 p-4  space-y-2 rounded-sm border border-yellow-200 mt-4">
          <h2 className="font-semibold text-orange-700 text-lg flex items-center gap-2">
            <span className="text-orange-700">⚠️</span>
            <span className="text-orange-700">Important Notice</span>
          </h2>
          <div className=" ">
            <p>
              Ensure all payroll data is accurate before submission. Late
              submissions may incur penalties from HMRC.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewExpenseForm;
