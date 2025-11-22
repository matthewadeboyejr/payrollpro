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
  return (
    <div className="space-y-4 mb-4 ">
      <div className="grid grid-cols-2 gap-2  ">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <FiUsers />
            Employee
          </span>
          <span className="text-sm font-semibold text-black">
            {initialValues?.employeeName}
          </span>
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            Request ID: {initialValues?.requestNo}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <BsClock />
            Status
          </span>
          <StatusBadge status={initialValues?.status} />
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
        Leave Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Leave Type</span>
          <span className="text-sm font-semibold text-black">
            {initialValues?.leaveType}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Duration:</span>
          <span className="text-sm font-semibold text-black">
            {initialValues?.days}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Start Date</span>
          <span className="text-sm font-semibold text-black">{startDate}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">End Date:</span>
          <span className="text-sm font-semibold text-black">{endDate}</span>
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black">Reason for Leave</h2>
      <div className=" bg-gray-50 p-4 rounded-sm">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            {initialValues?.reason || "No reason stated"}
          </span>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
        Submission Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            Submitted Date
          </span>
          <span className="text-sm font-semibold text-black">
            {createdDate}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Approved By</span>
          <span className="text-sm font-semibold text-black">
            {initialValues?.approvedBy || "N/A"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            Approved Date:
          </span>
          <span className="text-sm font-semibold text-black">
            {initialValues?.approvedDate || "N/A"}
          </span>
        </div>
      </div>

      {initialValues?.comment && (
        <>
          {" "}
          <h2 className="text-sm font-semibold text-black">Review Comment</h2>
          <div className=" bg-gray-50 p-4 rounded-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
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
