import React, { useState } from "react";
import DropdownComponent, { Dropdown } from "../ui/Dropdown";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Modal from "../ui/Modal";
import AddNewEmployeeForm from "../forms/AddNewEmployeeForm";

import { Form } from "react-final-form";
import { validate } from "validate.js";
import { AddNewEmployeeFormValues } from "../types/formFields";
import { addNewEmployeeConstraints } from "../forms/contraints/contraints";
import { BiExport } from "react-icons/bi";
import { useGetShiftsQuery } from "@/services/api/constants/shift.constant";
import { useModal } from "@/context/ModalContext";
import { Shifts } from "../types/shifts";
import AddShift from "../shift-rota/sub-component/AddShift";
import { useShift } from "@/context/ShiftContext";
import TableSkeleton from "../ui/TableSkeleton";

const RotaAndSchedulingTable = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { departmentId, setDepartmentId, shifts, setShifts, shiftsData, isLoadingShifts } =
    useShift();
  console.log(shiftsData);
  const [search, setSearch] = useState("");
  const [initialValues, setInitialValues] = useState<Shifts | null>(null);
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
 


  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Shift Schedule</h2>
      </div>
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full"
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
       {isLoadingShifts? <TableSkeleton columns={5} rows={5} /> : <>
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



            {shiftsData && shiftsData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No shifts found
                </td>
              </tr>
            ) : (
              shiftsData?.map((shift: any) => (
              <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{shift?.name}</td>
                <td className="px-6 py-4">{shift?.departmentName}</td>
                <td className="px-6 py-4">
                  {shift?.isOvernight ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">{shift?.startTime}</td>
                <td className="px-6 py-4">{shift?.endTime}</td>

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
                          setIsModalOpen("edit-shift");
                        },
                      },
                      {
                        title: "Delete",
                        onClick: () => {
                          ("");
                        },
                      },
                    ]}
                    label="Actions"
                    size="sm"
                  />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       </>}
      </div>
      {isModalOpen === "add-shift" && <AddShift />}
    </div>
  );
};

export default RotaAndSchedulingTable;
