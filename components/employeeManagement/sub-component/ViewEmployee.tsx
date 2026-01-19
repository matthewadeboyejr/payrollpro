import Modal from "@/components/ui/Modal";
import React from "react";
import { useModal } from "@/context/ModalContext";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import { useGetEmployeeByIdQuery } from "@/services/api/constants/employee.constant";
import StatusBadge from "@/utils/StatusBadge";
import { formatDT } from "@/utils/formatDT";
import { FiUsers } from "react-icons/fi";
import LeaveSummaryCard, { LeaveSummaryItem } from "./LeaveSummaryCard";

const ViewEmployee = ({
  selectedEmployeeId,
}: {
  selectedEmployeeId: string;
}) => {
  const { setIsModalOpen } = useModal();

  const { data: employeeData, isLoading: isLoadingEmployeeData } =
    useGetEmployeeByIdQuery(selectedEmployeeId, { skip: !selectedEmployeeId });
  const employeeDetails = employeeData?.data?.employee;
  const leaveSummary = employeeData?.data?.leaveSummary;

  console.log("employeeDetails", employeeDetails);
  const { date: startDate } = formatDT(employeeDetails?.startDate);
  const { date: endDate } = formatDT(employeeDetails?.endDate);

  return (
    <Modal
      size={"2xl"}
      heading={
        isLoadingEmployeeData
          ? " loading Employee Details"
          : employeeDetails?.fullName || "Employee Details"
      }
      desc={"View a employee details"}
      onClose={() => setIsModalOpen(null)}
      showSubmitBtn={false}
    >
      {isLoadingEmployeeData ? (
        <ViewSkeleton />
      ) : employeeDetails ? (
        <div className="space-y-4 mb-4  overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-2 gap-2  ">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                Employee ID:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.employeeNo}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <FiUsers />
                Employee
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.fullName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Email</span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.email}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Phone</span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.phone}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Address</span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.Address || "No address"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                Status
              </span>
              <StatusBadge status={employeeDetails?.status} />
            </div>
          </div>
          <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
            Job Details
          </h2>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Department
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.department}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Position
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.position}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Start Date
              </span>
              <span className="text-sm font-semibold text-black">
                {startDate}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Weekly Hours:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.weeklyHours}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Working Days Per Week:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.workingDaysPerWeek}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Employment Type:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.employmentTypeName}
              </span>
            </div>
          </div>
          <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
            Salary Details
          </h2>
          <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Grade Level:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.gradeLevelName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Salary Band:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.salaryBandCode}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Custom salary:
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.customSalary}
              </span>
            </div>
          </div>
          <h2 className="text-sm font-semibold text-black pt-2 ">
            Admin Details
          </h2>
          <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Created By
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.createdByEmail}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Modified By
              </span>
              <span className="text-sm font-semibold text-black">
                {employeeDetails?.modifiedByEmail}
              </span>
            </div>
          </div>
          <h2 className="text-sm font-semibold text-black pt-2 ">
            Leave Summary
          </h2>
          <LeaveSummaryCard
            leaveSummary={(leaveSummary as LeaveSummaryItem[]) || []}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">No employee details found</h2>
        </div>
      )}
    </Modal>
  );
};

export default ViewEmployee;
