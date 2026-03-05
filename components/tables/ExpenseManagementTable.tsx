import React, { useState } from "react";
import DropdownComponent, { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";
import { BiExport } from "react-icons/bi";
import { useGetExpenseQuery } from "@/services/api/constants/expense.constant";
import { useAction } from "@/hooks/useAction";
import AddExpense from "@/components/expenseManagement/sub-component/AddExpense";
import EditExpense from "@/components/expenseManagement/sub-component/EditExpense";

import ReviewExpense from "@/components/expenseManagement/sub-component/ReviewExpense";
import ViewExpense from "@/components/expenseManagement/sub-component/ViewExpense";
import { useModal } from "@/context/ModalContext";
import ExpenseSummaryCards from "@/components/expenseManagement/ExpenseSummaryCards";

const ExpenseManagementTable = () => {
  const [expenseFilters, setExpenseFilters] = useState({
    status: "",
    page: 1,
    pageSize: 10,
    search: ""
  });
  const { deleteExpenseAction } = useAction();
  const { isModalOpen, setIsModalOpen } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const { data: expensesData, isLoading } = useGetExpenseQuery({
    employeeId: "", // Fetch all for now, or implement filter
    status: expenseFilters.status,
    page: expenseFilters.page,
    pageSize: expenseFilters.pageSize,
    search: expenseFilters.search
  });

  // Note: create, edit, review mutations, user selector, and form validations are now in sub-components

  return (
    <div className="space-y-5">
      <ExpenseSummaryCards />
      <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold dark:text-white">Expense Records</h2>
        </div>
        <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <FiSearch className="text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="search employee by name or email"
              className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full bg-transparent dark:text-white dark:placeholder-gray-400"
              value={expenseFilters.search}
              onChange={(e) => setExpenseFilters({ ...expenseFilters, search: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              className="primary-btn flex items-center gap-2 w-full md:w-auto"
              onClick={() => {
                setSelectedExpense(null);
                setIsModalOpen("add");
              }}
            >
              <FiPlus />
              <span>Add Expense</span>
            </button>

            <DropdownComponent
              options={[
                {
                  title: "All",
                  onClick: () => { setExpenseFilters({ ...expenseFilters, status: "" }) },
                },
                {
                  title: "Approved",
                  onClick: () => { setExpenseFilters({ ...expenseFilters, status: "1" }) },
                },
                {
                  title: "Rejected",
                  onClick: () => { setExpenseFilters({ ...expenseFilters, status: "2" }) },
                },
                { title: "Pending", onClick: () => { setExpenseFilters({ ...expenseFilters, status: "0" }) } },
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
        <div className="relative overflow-visible">
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
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : expensesData?.items?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expensesData.items.map((expense: any) => (
                  <tr key={expense.id} className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4 flex flex-col gap-2 items-start">
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {expense.employeeName || "Unknown Employee"}
                      </span>

                    </td>
                    <td className="px-6 py-4"> {expense.categoryName}</td>
                    <td className="px-6 py-4">{expense.description}</td>

                    <td className="px-6 py-4">£{expense.amount}</td>
                    <td className="px-6 py-4">{new Date(expense.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${expense.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        expense.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 relative">
                      <Dropdown
                        options={[
                          {
                            title: "View",
                            onClick: () => {
                              setSelectedExpense(expense);
                              setIsModalOpen("view");
                            },
                          },
                          {
                            title: "Edit", onClick: () => {
                              setSelectedExpense(expense)
                              setIsModalOpen("edit");
                            }
                          },
                          {
                            title: "Review",
                            onClick: () => {
                              setSelectedExpense(expense);
                              setIsModalOpen("review");
                            },
                          },
                          { title: "Delete", onClick: () => deleteExpenseAction(expense.id) },
                        ]}
                        label="Actions"
                        size="sm"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="px-6 py-4 text-center">No expense records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {isModalOpen === "add" && <AddExpense />}
        {isModalOpen === "edit" && selectedExpense && <EditExpense initialValues={selectedExpense} />}
        {isModalOpen === "review" && selectedExpense && <ReviewExpense data={selectedExpense} />}
        {isModalOpen === "view" && selectedExpense && <ViewExpense data={selectedExpense} />}
      </div>
    </div>
  );
};

export default ExpenseManagementTable;

