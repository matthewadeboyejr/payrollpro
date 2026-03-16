import React from "react";
import StatusBadge from "@/utils/StatusBadge";
import { formatDT } from "@/utils/formatDT";
import { FiUsers } from "react-icons/fi";
import LeaveSummaryCard, { LeaveSummaryItem } from "../sub-component/LeaveSummaryCard";
import { Employee } from "../../types/employment";

const EmployeeGeneralInfo = ({
  employee,
  leaveSummary,
}: {
  employee: Partial<Employee>;
  leaveSummary: unknown[];
}) => {
  const { date: startDate } = formatDT(employee?.startDate || "");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Employee ID</span>
          <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
            {employee?.employeeNo}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <FiUsers />
            Full Name
          </span>
          <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
            {employee?.fullName}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Status</span>
          <div>
            <StatusBadge status={employee?.status || ""} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Email</span>
          <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
            {employee?.email}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Phone</span>
          <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
            {employee?.phone}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Address</span>
          <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
            {employee?.Address || "No address"}
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Job Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Department</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.department}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Position</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.position}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Start Date</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {startDate}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Weekly Hours</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.weeklyHours}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">
              Working Days/Week
            </span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.workingDaysPerWeek}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">
              Employment Type
            </span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.employmentTypeName}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Salary & Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Grade Level</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.gradeLevelName}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Salary Band</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.salaryBandCode}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 font-medium">Custom Salary</span>
            <span className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {employee?.customSalary}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Leave Summary
        </h2>
        <LeaveSummaryCard
          leaveSummary={(leaveSummary as LeaveSummaryItem[]) || []}
        />
      </div>
    </div>
  );
};

export default EmployeeGeneralInfo;
