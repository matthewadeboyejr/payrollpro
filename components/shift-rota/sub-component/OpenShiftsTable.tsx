"use client";

import React, { useState } from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { formatDT } from "@/utils/formatDT";
import ViewRota from "./ViewRota";
import CancelRota from "./CancelRota";
import EditRota from "./EditRota";
import { useModal } from "@/context/ModalContext";
import {
  useClaimRotaMutation,
  useCompleteRotaMutation,
} from "@/services/api/constants/shift.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

// Type Definitions
interface ApiShift {
  id: number;
  workDate: string;
  employeeId: number;
  employeeName: string;
  shiftId: number;
  shiftName: string;
  shiftStart: string;
  shiftEnd: string;
  isCancelled: boolean;
  cancelledAt: string | null;
  departmentId: number;
  departmentName: string;
  hoursWorked: number;
  completedAt: string | null;
  approvedAt: string | null;
  isOpen: boolean;
}

interface OpenShiftsTableProps {
  shifts: ApiShift[];
}

const OpenShiftsTable: React.FC<OpenShiftsTableProps> = ({ shifts }) => {
  console.log("open rota shifts", shifts);
  const { isModalOpen, setIsModalOpen } = useModal();
  const [selectedRota, setSelectedRota] = useState<ApiShift | null>(null);
  const { deleteRotaAction } = useAction();
  const [completeRota] = useCompleteRotaMutation();
  const [claimRota] = useClaimRotaMutation();

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const handleView = (shift: ApiShift) => {
    console.log("View:", shift);
    setSelectedRota(shift);
    setIsModalOpen("view-rota");
  };

  const handleClaim = async (shift: ApiShift) => {
    const payload = {
      rotaId: shift.id,
    };
    try {
      const response = await claimRota(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
      }
    } catch (err: unknown) {
      console.log("error", err);
      const error = err as {
        data?: { code?: number; title?: string; message?: string | string[] };
      };
      const errorMessage =
        Array.isArray(error?.data?.message)
          ? error.data.message.join(", ")
          : error?.data?.title ||
            error?.data?.message ||
            "Failed to claim rota";
      showAlert("Error", errorMessage, "error");
    }
  };

  const handleEdit = (shift: ApiShift) => {
    console.log("Edit:", shift);
    setIsModalOpen("edit-rota");
    setSelectedRota(shift);
  };

  const handleDelete = (shift: ApiShift) => {
    deleteRotaAction(shift.id.toString());
  };

  const handleCancel = (shift: ApiShift) => {
    setIsModalOpen("cancel-rota");
    setSelectedRota(shift);
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-sm mt-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
               
                <th scope="col" className="px-6 py-3">
                  Work Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Shift Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Hours Worked
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {shifts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No open shifts available
                  </td>
                </tr>
              ) : (
                shifts.map((shift: ApiShift) => {
                  const { date: workDate } = formatDT(shift.workDate);
                  return (
                    <tr
                      key={shift.id}
                      className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                     
                      <td className="px-6 py-4">{workDate || "-"}</td>
                      <td className="px-6 py-4">{shift.shiftName || "-"}</td>
                      <td className="px-6 py-4">
                        {formatTime(shift.shiftStart) || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {formatTime(shift.shiftEnd) || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {shift.departmentName || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {shift.hoursWorked || 0} hrs
                      </td>
                      <td className="px-6 py-4 relative">
                        <Dropdown
                          options={[
                            {
                              title: "View",
                              onClick: () => handleView(shift),
                            },
                            {
                              title: "Claim",
                              onClick: () => handleClaim(shift),
                            },
                            {
                              title: "Edit",
                              onClick: () => handleEdit(shift),
                            },
                            {
                              title: "Cancel",
                              onClick: () => handleCancel(shift),
                            },
                            {
                              title: "Delete",
                              onClick: () => handleDelete(shift),
                            },
                          ]}
                          label="Actions"
                          size="sm"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen === "view-rota" && selectedRota && (
        <ViewRota selectedRota={selectedRota} />
      )}
      {isModalOpen === "edit-rota" && selectedRota && (
        <EditRota rotaId={selectedRota.id.toString()} />
      )}
      {isModalOpen === "cancel-rota" && selectedRota && (
        <CancelRota rotaId={selectedRota.id.toString()} />
      )}
    </>
  );
};

export default OpenShiftsTable;
