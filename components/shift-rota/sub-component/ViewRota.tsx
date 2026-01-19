import Modal from "@/components/ui/Modal";
import React from "react";
import { useModal } from "@/context/ModalContext";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import { useGetEmployeeByIdQuery } from "@/services/api/constants/employee.constant";
import StatusBadge from "@/utils/StatusBadge";
import { formatDT } from "@/utils/formatDT";
import { FiUsers } from "react-icons/fi";
import { useGetRotaByIdQuery } from "@/services/api/constants/shift.constant";

const ViewRota = ({ selectedRota }: { selectedRota: any }) => {
  const { setIsModalOpen } = useModal();

  const { data: rotaData, isLoading: isLoadingRotaData } = useGetRotaByIdQuery(
    selectedRota?.id,
    { skip: !selectedRota?.id }
  );

  console.log("rotaData", rotaData);
  const rotaDetails = rotaData?.data;

  const { date: workDate } = formatDT(rotaDetails?.workDate);
  console.log("rotaDetails", rotaDetails);

  // Determine status based on rota details
  const getRotaStatus = () => {
    if (rotaDetails?.isCancelled) {
      return "Cancelled";
    }
    if (rotaDetails?.completedAt) {
      return "Completed";
    }
    if (rotaDetails?.isOpen) {
      return "Open";
    }
    if (rotaDetails?.approvedAt) {
      return "Approved";
    }
    return "Pending";
  };

  const rotaStatus = getRotaStatus();

  return (
    <Modal
      size={"2xl"}
      heading={
        isLoadingRotaData
          ? " loading Rota Details"
          : rotaDetails?.rotaName || "Rota Details"
      }
      desc={"View a rota details"}
      onClose={() => setIsModalOpen(null)}
      showSubmitBtn={false}
    >
      {isLoadingRotaData ? (
        <ViewSkeleton />
      ) : rotaDetails ? (
        <div className="space-y-4 mb-4  overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-2 gap-2  ">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                Employee ID:
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.employeeId}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <FiUsers />
                Employee
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.employeeName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Department
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.departmentName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                Status
              </span>
              <StatusBadge status={rotaStatus} />
            </div>
          </div>
          <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
            Shift Details
          </h2>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Shift Start
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.shiftStart}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Shift End
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.shiftEnd}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Work Date
              </span>
              <span className="text-sm font-semibold text-black">
                {workDate}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">
                Shift Name
              </span>
              <span className="text-sm font-semibold text-black">
                {rotaDetails?.shiftName}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">No rota details found</h2>
        </div>
      )}
    </Modal>
  );
};

export default ViewRota;
