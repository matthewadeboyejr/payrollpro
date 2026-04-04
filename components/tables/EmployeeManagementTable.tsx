import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiUsers } from "react-icons/fi";

import UsersTableSkeleton from "../ui/UsersTableSkeleton";
import EmptyState from "../ui/EmptyState";
import { useGetEmployeesQuery } from "@/services/api/constants/employee.constant";
import { Employee } from "../types/employment";
import AddEmployee from "../employeeManagement/sub-component/AddEmployee";
import { useModal } from "@/context/ModalContext";
import { useAction } from "@/hooks/useAction";
import { formatDT } from "@/utils/formatDT";
import EditEmployee from "../employeeManagement/sub-component/EditEmployee";
import CreateLeaveRequest from "../leaveManagement/sub-component/CreateLeaveRequest";
import StatusBadge from "@/utils/StatusBadge";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const EmployeeManagementTable = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { isModalOpen, setIsModalOpen } = useModal();
  const { deactivateEmployee } = useAction();
  const router = useRouter();
  const { data, isLoading } = useGetEmployeesQuery(debouncedSearch);
  const [initialValues, setInitialValues] = useState<Employee | null>(null);
  const employees = data?.data;

  if (isLoading) {
    return <UsersTableSkeleton />;
  }
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className="w-full outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("add-employee")}
          >
            <FiPlus />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee: Employee) => {
              const { date: startDate } = formatDT(employee.startDate);
              return (
                <tr
                  key={employee.id}
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 "
                >
                  <td className="px-6 py-4">{employee.employeeNo || "-"}</td>
                  <td className="px-6 py-4">{employee.fullName || "-"}</td>
                  <td className="px-6 py-4">{employee.email || "-"}</td>
                  <td className="px-6 py-4">{employee.department || "-"}</td>
                  <td className="px-6 py-4">{employee.position || "-"}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={employee?.status} />
                  </td>
                  <td className="px-6 py-4">{startDate || "-"}</td>

                  <td className="px-6 py-4 relative">
                    <Dropdown
                      options={[
                        {
                          title: employee.status === "Active" ? "View" : "Complete Onboarding",
                          onClick: () => {
                            router.push(
                              `/dashboard/employees-management/${employee.id}`
                            );
                          },
                        },
                        {
                          title: "Edit",
                          onClick: () => {
                            setInitialValues(employee);
                            setIsModalOpen("edit-employee");
                          },
                        },
                        {
                          title: "Leave Request",
                          onClick: () => {
                            setInitialValues(employee);
                            setIsModalOpen("create-leaveRequest");
                          },
                        },
                        {
                          title: "Delete",
                          onClick: () => {
                            deactivateEmployee(employee.id);
                          },
                        },
                      ]}
                      label="Actions"
                      size="sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {employees?.length === 0 && !isLoading && (
          <EmptyState
            icon={FiUsers}
            title="No Employees Found"
            description="Your employee directory is empty. Add your first employee to start managing their payroll, leave, and documents."
            action={{
              label: "Add Employee",
              onClick: () => setIsModalOpen("add-employee"),
              icon: <FiPlus />
            }}
          />
        )}
      </div>
      {isModalOpen === "add-employee" && <AddEmployee />}
      {isModalOpen === "edit-employee" && (
        <EditEmployee initialValues={initialValues || null} />
      )}
      {isModalOpen === "create-leaveRequest" && (
        <CreateLeaveRequest initialValues={initialValues || null} />
      )}
    </div>
  );
};

export default EmployeeManagementTable;
