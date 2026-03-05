import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

const UsersTableSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      {/* Header with search and add button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-300 dark:text-gray-500" />
          <div className="h-4 bg-gray-300 rounded animate-pulse w-64 dark:bg-gray-600"></div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="h-10 bg-gray-300 rounded animate-pulse w-32 flex items-center gap-2 px-4 dark:bg-gray-600">
            <FiPlus className="text-gray-400 dark:text-gray-500" />
            <span className="text-gray-400 text-sm dark:text-gray-500">Add User</span>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-16 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-20 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-12 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-16 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-20 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-16 dark:bg-gray-600"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-12 dark:bg-gray-600"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-8 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4 flex flex-col gap-2 items-start">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-24 dark:bg-gray-600"></div>
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-20 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-32 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4 flex flex-col gap-2 items-start">
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-20 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-300 rounded-full animate-pulse w-16 dark:bg-gray-600"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-20 dark:bg-gray-600"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTableSkeleton;
