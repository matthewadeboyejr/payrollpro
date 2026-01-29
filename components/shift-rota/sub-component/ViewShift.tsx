import Modal from "@/components/ui/Modal";
import React from "react";
import { useModal } from "@/context/ModalContext";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import { useGetShiftByIdQuery } from "@/services/api/constants/shift.constant";

const ViewShift = ({ selectedShift }: { selectedShift: string | number | null | undefined }) => {
  const { setIsModalOpen } = useModal();

  const { data: shiftData, isLoading: isLoadingShiftData } = useGetShiftByIdQuery(
    selectedShift,
    { skip: !selectedShift }
  );

  const shiftDetails = shiftData?.data;

  return (
    <Modal
      size={"2xl"}
      heading={
        isLoadingShiftData
          ? "Loading Shift Details..."
          : shiftDetails?.name || "Shift Details"
      }
      desc={"View shift details"}
      onClose={() => setIsModalOpen(null)}
      showSubmitBtn={false}
    >
      {isLoadingShiftData ? (
        <ViewSkeleton />
      ) : shiftDetails ? (
        <div className="space-y-4 mb-4 overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Shift Name</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Department</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.departmentName}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Is Overnight</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.isOvernight ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Start Time</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.startTime}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">End Time</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.endTime}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Rate Per Hour</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.ratePerHour}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Address</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.address}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 font-medium">Emergency Contact</span>
              <span className="text-sm font-semibold text-black">
                {shiftDetails?.emergencyContactName} ({shiftDetails?.emergencyContactPhone})
              </span>
            </div>
          </div>

          {shiftDetails?.description && (
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-sm text-gray-500 font-medium mb-1">Description</h3>
              <p className="text-sm text-black">{shiftDetails.description}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">No shift details found</h2>
        </div>
      )}
    </Modal>
  );
};

export default ViewShift;
