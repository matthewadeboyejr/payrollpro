import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";
import Modal from "../ui/Modal";
import HMRCSubmissionForm from "../forms/HMRCSubmissionForm";

import { Form } from "react-final-form";
import { validate } from "validate.js";
import { HMRCSubmissionFormValues } from "../types/formFields";
import { hmrcSubmissionConstraints } from "../forms/contraints/contraints";
import { BiCalculator } from "react-icons/bi";
import TaxCalculatorForm from "../forms/TaxCalculatorForm";

const TaxManagementTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<
    "hmrc" | "taxCalculator" | null
  >(null);

  const onSubmit = (values: HMRCSubmissionFormValues) => {
    console.log(values);
  };

  const validateForm = (values: HMRCSubmissionFormValues) => {
    return validate(values, hmrcSubmissionConstraints) || undefined;
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex items-center gap-2">
        {/* <h2 className="text-lg font-semibold">Shift Schedule</h2> */}
      </div>
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("hmrc")}
          >
            <FiPlus />
            <span>HMRC Submission</span>
          </button>

          <button
            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("taxCalculator")}
          >
            <span>
              <BiCalculator className="text-blue-500" />
            </span>
            <span>Tax Calculator</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Pay Period
              </th>
              <th scope="col" className="px-6 py-3">
                PAYE
              </th>

              <th scope="col" className="px-6 py-3">
                Employee NI
              </th>

              <th scope="col" className="px-6 py-3">
                Employer NI
              </th>
              <th scope="col" className="px-6 py-3">
                Other Deductions
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="px-6 py-4 flex flex-col gap-2 items-start">
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  John Smith
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                  EMP001
                </span>
              </td>
              <td className="px-6 py-4">2024-06</td>
              <td className="px-6 py-4">£1,340</td>

              <td className="px-6 py-4">£670</td>
              <td className="px-6 py-4">£924</td>
              <td className="px-6 py-4 flex flex-col gap- items-start">
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Student Loan: £120
                </span>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Pension: £400
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  Submitted
                </span>
              </td>
              <td className="px-6 py-4">
                <Dropdown
                  options={[
                    { title: "View Details", onClick: () => {} },
                    {
                      title: "Download P60",
                      onClick: () => {},
                    },
                  ]}
                  label="Actions"
                  size="sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen === "hmrc" && (
        <Modal
          size={"2xl"}
          heading={"HMRC Tax Submission"}
          desc={"Submit PAYE and National Insurance information to HMRC."}
          onClose={() => setIsModalOpen(null)}
          submitBtnText="Submit HMRC"
        >
          <Form<HMRCSubmissionFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <HMRCSubmissionForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
      {isModalOpen === "taxCalculator" && (
        <Modal
          size={"2xl"}
          heading={"Tax & NI Calculator"}
          desc={
            "Calculate PAYE, National Insurance, and other deductions for UK employees."
          }
          onClose={() => setIsModalOpen(null)}
          submitBtnText="Save Calculation"
        >
          <Form<HMRCSubmissionFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <TaxCalculatorForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaxManagementTable;
