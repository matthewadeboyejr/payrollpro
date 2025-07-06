import React, { useState } from "react";
import DropdownComponent from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";

const EmployeeManagementTable = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="w-full max-w-[500px] flex items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className="w-full outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="primary-btn flex items-center gap-2 w-full md:w-auto">
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
            <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                EMP001
              </th>
              <td className="px-6 py-4 flex flex-col gap-2 items-start">
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  John Smith
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                  +44 7700 900123
                </span>
              </td>
              <td className="px-6 py-4">john.smith@example.com</td>
              <td className="px-6 py-4">Engineering</td>
              <td className="px-6 py-4">Senior Developer</td>
              <td className="px-6 py-4">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">2021-01-01</td>
              <td className="px-6 py-4">
                <DropdownComponent
                  options={[
                    { title: "Edit", onClick: () => {} },
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
    </div>
  );
};

export default EmployeeManagementTable;
