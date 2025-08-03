import React, { useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import Modal from "../ui/Modal";
import DropdownComponent from "../ui/Dropdown";

import { Form } from "react-final-form";
import { validate } from "validate.js";
import { AddNewEmployeeFormValues } from "../types/formFields";
import { addNewEmployeeConstraints } from "../forms/contraints/contraints";
import BulkActionForm from "../forms/BulkActionForm";

const PayslipManagementTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSubmit = (values: AddNewEmployeeFormValues) => {
    console.log(values);
  };

  const validateForm = (values: AddNewEmployeeFormValues) => {
    return validate(values, addNewEmployeeConstraints) || undefined;
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
            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span>
              <FiUsers className="text-blue-500" />
            </span>
            <span>Bulk Actions</span>
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
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Pay Period
              </th>
              <th scope="col" className="px-6 py-3">
                Gross Pay
              </th>

              <th scope="col" className="px-6 py-3">
                Net Pay
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
              <td className="px-6 py-4">Engineering</td>
              <td className="px-6 py-4">June 2024</td>
              <td className="px-6 py-4">£7,200</td>

              <td className="px-6 py-4">£5,190</td>
              <td className="px-6 py-4">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  Sent
                </span>
              </td>
              <td className="px-6 py-4">
                <DropdownComponent
                  options={[
                    { title: "View Payslip", onClick: () => {} },
                    {
                      title: "Download PDF",
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
      {isModalOpen && (
        <Modal
          size={"2xl"}
          heading={"Bulk Payslip Actions"}
          desc={"Perform actions on multiple payslips at once."}
          onClose={() => setIsModalOpen(false)}
          submitBtnText="Execute Action"
        >
          <Form<AddNewEmployeeFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <BulkActionForm
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

export default PayslipManagementTable;
