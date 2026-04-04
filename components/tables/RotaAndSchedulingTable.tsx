import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiFilter, FiPlus, FiSearch, FiClock } from "react-icons/fi";

import { BiExport } from "react-icons/bi";
import EmptyState from "../ui/EmptyState";
import { useModal } from "@/context/ModalContext";
import { Shifts } from "../types/shifts";
import AddShift from "../shift-rota/sub-component/AddShift";
import { useShift } from "@/context/ShiftContext";
import TableSkeleton from "../ui/TableSkeleton";
import ViewShift from "../shift-rota/sub-component/ViewShift";
import EditShift from "../shift-rota/sub-component/EditShift";
import { useAction } from "@/hooks/useAction";

const RotaAndSchedulingTable = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { deleteShiftAction } = useAction();
  const { shiftsData, isLoadingShifts } = useShift();
  const [search, setSearch] = useState("");
  const [initialValues, setInitialValues] = useState<Shifts | null>(null);
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);



  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold dark:text-white">Shift Schedule</h2>
      </div>
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full bg-transparent dark:text-white dark:placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("add-shift")}
          >
            <FiPlus />
            <span>Add Shift</span>
          </button>
          <button
            className="secondary-btn flex items-center gap-2 w-full md:w-auto  "
            onClick={() => {
              console.log("filter");
            }}
          >
            <FiFilter className="text-blue-500" />
            <span>Filter</span>
          </button>
          <button
            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              console.log("export");
            }}
          >
            <span>
              <BiExport className="text-blue-500" />
            </span>
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto pb-28">
        {isLoadingShifts ? <TableSkeleton columns={5} rows={5} /> : <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Shift Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Is Overnight
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {shiftsData?.map((shift: Shifts) => (
                <tr
                  key={shift.id}
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white uppercase tracking-tight">{shift?.name}</td>
                  <td className="px-6 py-4">{shift?.departmentName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${shift?.isOvernight ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'}`}>
                      {shift?.isOvernight ? "Overnight" : "Standard"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">{shift?.startTime}</td>
                  <td className="px-6 py-4 font-semibold text-orange-600 dark:text-orange-400">{shift?.endTime}</td>

                  <td className="px-6 py-4 relative">
                    <Dropdown
                      options={[
                        {
                          title: "View",
                          onClick: () => {
                            setSelectedShiftId(shift.id);
                            setIsModalOpen("view-shift");
                          },
                        },
                        {
                          title: "Edit",
                          onClick: () => {
                            setInitialValues(shift);
                            setSelectedShiftId(shift.id);
                            setIsModalOpen("edit-shift");
                          },
                        },
                        {
                          title: "Delete",
                          onClick: () => {
                            deleteShiftAction(shift.id);
                          },
                        },
                      ]}
                      label="Actions"
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {shiftsData && shiftsData.length === 0 && !isLoadingShifts && (
            <EmptyState
              icon={FiClock}
              title="No Shifts Scheduled"
              description="The shift schedule is currently empty. Define shift timings and assign them to departments to start scheduling your workforce."
              action={{
                label: "Add Shift",
                onClick: () => setIsModalOpen("add-shift"),
                icon: <FiPlus />
              }}
            />
          )}
        </>}
      </div>
      {isModalOpen === "add-shift" && <AddShift />}
      {isModalOpen === "view-shift" && <ViewShift selectedShift={selectedShiftId} />}
      {isModalOpen === "edit-shift" && selectedShiftId !== null && <EditShift initialValues={initialValues} shiftId={selectedShiftId} />}
    </div>
  );
};

export default RotaAndSchedulingTable;
