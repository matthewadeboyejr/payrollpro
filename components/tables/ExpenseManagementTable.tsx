import React, { useState } from "react";
import DropdownComponent, { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";
import Modal from "../ui/Modal";
import AddNewExpenseForm from "../forms/AddNewExpenseForm";

import { Form } from "react-final-form";
import { validate } from "validate.js";
import {
  AddNewExpenseFormValues,
  ReviewExpenseFormValues,
  ExpenseDetailsProps,
} from "../types/formFields";
import { addNewEmployeeConstraints } from "../forms/contraints/contraints";
import { BiExport } from "react-icons/bi";
import ReviewExpenseForm from "../forms/ReviewExpenseForm";

const ExpenseManagementTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<
    "add" | "edit" | "review" | null
  >(null);

  const onSubmit = (
    values: AddNewExpenseFormValues | ReviewExpenseFormValues
  ) => {
    console.log(values);
  };

  const validateForm = (
    values: AddNewExpenseFormValues | ReviewExpenseFormValues
  ) => {
    return validate(values, addNewEmployeeConstraints) || undefined;
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Expense Records</h2>
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
            onClick={() => setIsModalOpen("add")}
          >
            <FiPlus />
            <span>Add Expense</span>
          </button>

          <DropdownComponent
            options={[
              {
                title: "Approved",
                onClick: () => {},
              },
              {
                title: "Rejected",
                onClick: () => {},
              },
              { title: "Pending", onClick: () => {} },
              { title: "Reimbursed", onClick: () => {} },
            ]}
            label="Status"
            size="sm"
          />
          <button
            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              console.log("export");
            }}
          >
            <span>
              <BiExport className="text-blue-500" />
            </span>
            <span>Export</span>
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
                Category
              </th>

              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
                  +44 7700 900123
                </span>
              </td>
              <td className="px-6 py-4"> Travel</td>
              <td className="px-6 py-4">Business trip to London</td>

              <td className="px-6 py-4">£450.00</td>
              <td className="px-6 py-4">15/01/2024</td>
              <td className="px-6 py-4">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  Approved
                </span>
              </td>
              <td className="px-6 py-4 relative">
                <Dropdown
                  options={[
                    { title: "Edit", onClick: () => setIsModalOpen("edit") },
                    {
                      title: "Review",
                      onClick: () => setIsModalOpen("review"),
                    },
                    { title: "Delete", onClick: () => {} },
                  ]}
                  label="Actions"
                  size="sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen === "add" && (
        <Modal
          size={"2xl"}
          heading={"Add New Expense"}
          desc={"Add a new expense to the system"}
          onClose={() => setIsModalOpen(null)}
          submitBtnText="Add Expense"
        >
          <Form<AddNewExpenseFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <AddNewExpenseForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
      {isModalOpen === "edit" && (
        <Modal
          size={"2xl"}
          heading={"Edit Expense"}
          desc={"Edit the expense"}
          onClose={() => setIsModalOpen(null)}
          submitBtnText="Edit Expense"
        >
          <Form<AddNewExpenseFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <AddNewExpenseForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
      {isModalOpen === "review" && (
        <Modal
          size={"2xl"}
          heading={"Review Expense"}
          //desc={"Review the expense and add comments"}
          onClose={() => setIsModalOpen(null)}
          secondaryBtnText="Reject"
          secondaryBtnColor="bg-red-500 hover:bg-red-600"
          submitBtnText="Approve"
        >
          <ExpenseDetails
            title="Client dinner meeting"
            employee="Emily Davis"
            category="Meal"
            amount="GBP 85.50"
            date="14/01/2024"
            employeeId="EMP002"
            receipt="receipt_002.pdf"
          />
          <Form<ReviewExpenseFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <ReviewExpenseForm
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

export default ExpenseManagementTable;

export const ExpenseDetails = ({
  title,
  employee,
  category,
  amount,
  date,
  employeeId,
  receipt,
}: ExpenseDetailsProps) => {
  return (
    <div className="space-y-4 mb-4 bg-gray-50 p-4 rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-black">{title}</span>
          <span className="text-sm text-gray-500 font-medium">{employee}</span>
        </div>
        <div>
          <span className="text-sm text-black border px-2 py-1 rounded-2xl w-fit font-semibold">
            {category}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Amount:</span>
          <span className="text-sm font-semibold text-black">{amount}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Date:</span>
          <span className="text-sm font-semibold text-black">{date}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            Employee ID:
          </span>
          <span className="text-sm font-semibold text-black">{employeeId}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Receipt:</span>
          <span className="text-sm font-semibold text-blue-500">{receipt}</span>
        </div>
      </div>
    </div>
  );
};
