import Modal from "@/components/ui/Modal";
import React from "react";
import { useModal } from "@/context/ModalContext";
import { SalaryBand } from "@/components/tables/SalaryBandTable";

const ViewSalaryBand = ({
  selectedSalaryBand,
}: {
  selectedSalaryBand: SalaryBand | null;
}) => {
  const { setIsModalOpen } = useModal();

  const salaryBandDetails = selectedSalaryBand;

  return (
    <Modal
      size={"2xl"}
      heading={salaryBandDetails?.code}
      desc={"View Salary Band details"}
      onClose={() => setIsModalOpen(null)}
      showSubmitBtn={false}
    >
      <div className="grid  md:grid-cols-2 grid-cols-2 gap-4 text-sm ">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Code</h2>
          <p className="font-medium">{salaryBandDetails?.code}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Grade Level</h2>
          <p className="font-medium">{salaryBandDetails?.gradeLevel}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Pay Type</h2>
          <p className="font-medium">{salaryBandDetails?.payType}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Currency</h2>
          <p className="font-medium">{salaryBandDetails?.currency}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Min Salary</h2>
          <p className="font-medium">{salaryBandDetails?.minSalary}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Mid Point</h2>
          <p className="font-medium">{salaryBandDetails?.midPoint}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Max Salary</h2>
          <p className="font-medium">{salaryBandDetails?.maxSalary}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Housing Allowance</h2>
          <p className="font-medium">{salaryBandDetails?.housingAllowance || "-"}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Transport Allowance</h2>
          <p className="font-medium">{salaryBandDetails?.transportAllowance || "-"}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-500">Other Allowance</h2>
          <p className="font-medium">{salaryBandDetails?.otherAllowance || "-"}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSalaryBand;
