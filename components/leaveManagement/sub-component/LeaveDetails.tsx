import { LeaveDetails as LeaveDetailsType } from "@/components/types/Leave";
import { formatDT } from "@/utils/formatDT";
import StatusBadge from "@/utils/StatusBadge";
import { BsClock } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const LeaveDetails = ({
  initialValues,
}: {
  initialValues: LeaveDetailsType;
}) => {
  const { date: startDate } = formatDT(initialValues.startDate);
  const { date: endDate } = formatDT(initialValues.endDate);
  const { date: createdDate } = formatDT(initialValues.createdAt);

  console.log("initialValues ", initialValues);
  return (
    <div className="space-y-4 mb-4 ">
      <div className="grid grid-cols-2 gap-2  ">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2 dark:text-gray-400">
            <FiUsers />
            Employee
          </span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.employeeName}
          </span>
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2 dark:text-gray-400">
            Request ID: {initialValues?.requestNo}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2 dark:text-gray-400">
            <BsClock />
            Status
          </span>
          <StatusBadge status={initialValues?.status} />
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200 dark:text-white dark:border-gray-700">
        Leave Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">Leave Type</span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.leaveType}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">
            Days Requested:
          </span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.dayRequested}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">
            Hours Requested:
          </span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.hoursRequested}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">Balance:</span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.remainingBalance}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">Start Date</span>
          <span className="text-sm font-semibold text-black dark:text-white">{startDate}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">End Date:</span>
          <span className="text-sm font-semibold text-black dark:text-white">{endDate}</span>
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black dark:text-white">Reason for Leave</h2>
      <div className=" bg-gray-50 p-4 rounded-sm dark:bg-gray-700">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-300">
            {initialValues?.reason || "No reason stated"}
          </span>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200 dark:text-white dark:border-gray-700">
        Submission Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">
            Submitted Date
          </span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {createdDate}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">Approved By</span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.approvedBy || "N/A"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium dark:text-gray-400">
            Approved Date:
          </span>
          <span className="text-sm font-semibold text-black dark:text-white">
            {initialValues?.approvedDate || "N/A"}
          </span>
        </div>
      </div>

      {initialValues?.comment && (
        <>
          {" "}
          <h2 className="text-sm font-semibold text-black dark:text-white">Review Comment</h2>
          <div className=" bg-gray-50 p-4 rounded-sm dark:bg-gray-700">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium dark:text-gray-300">
                {initialValues?.comment || "No Commit"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaveDetails;
