import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";

import UsersTableSkeleton from "../ui/UsersTableSkeleton";

import { useModal } from "@/context/ModalContext";
import { useAction } from "@/hooks/useAction";
import { EditUserFormValues } from "../types/formFields";
import { useGetSalaryBandsQuery } from "@/services/api/constants/setting.constant";
import AddSalaryBand from "../settings/sub-component/AddSalaryBand";
import EditSalaryBand from "../settings/sub-component/EditSalaryBand";
import ViewSalaryBand from "../settings/sub-component/ViewSalary";
import Spinner from "../ui/Spinner";

export interface SalaryBand {
  id: string;
  code: string;
  gradeLevel: string;
  payType: string;
  currency: string;
  minSalary: number;
  midPoint: number;
  maxSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowance: number;
  gradeLevelName: string;
}

const SalaryBandTable = () => {
  const { deleteSalaryBand, isDeletingSalaryBand } = useAction();
  const { isModalOpen, setIsModalOpen } = useModal();
  const [search, setSearch] = useState("");

  const [initialValues, setInitialValues] = useState<SalaryBand | null>(null);
  const [selectedSalaryBandId, setSelectedSalaryBandId] = useState<
    string | null
  >(null);
  const [selectedSalaryBand, setSelectedSalaryBand] = useState<
    SalaryBand | null
  >(null);

  const { data: salaryBands, isLoading } = useGetSalaryBandsQuery(undefined);
  const salaryBandsData = salaryBands || [];
  if (isLoading) {
    return <UsersTableSkeleton />;
  }
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search user by name or email"
            className="w-full outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              setIsModalOpen("add-salaryBand");
            }}
          >
            <FiPlus />
            <span>Add Salary Band</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-nowrap text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Grade Level
              </th>

              <th scope="col" className="px-6 py-3">
                Pay Type
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Min Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Mid Point
              </th>
              <th scope="col" className="px-6 py-3">
                Max Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Housing Allowance
              </th>
              <th scope="col" className="px-6 py-3">
                Transport Allowance
              </th>
              <th scope="col" className="px-6 py-3">
                Other Allowance
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {salaryBandsData?.map((salaryBand: SalaryBand, index: number) => {
              return (
                <tr
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  key={salaryBand.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1 || "-"}
                  </td>
                  <td className="px-6 py-4 flex  items-start">
                    {salaryBand.code}
                  </td>
                  <td className="px-6 py-4 ">
                    {salaryBand.gradeLevelName || "-"}
                  </td>
                  <td className="px-6 py-4">{salaryBand.payType || "-"}</td>
                  <td className="px-6 py-4">{salaryBand.currency || "-"}</td>
                  <td className="px-6 py-4">{salaryBand.minSalary || "-"}</td>
                  <td className="px-6 py-4">{salaryBand.midPoint || "-"}</td>
                  <td className="px-6 py-4">{salaryBand.maxSalary || "-"}</td>
                  <td className="px-6 py-4">
                    {salaryBand.housingAllowance || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {salaryBand.transportAllowance || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {salaryBand.otherAllowance || "-"}
                  </td>
                  <td className="px-6 py-4 relative">
                    {isDeletingSalaryBand &&
                      selectedSalaryBandId === salaryBand.id ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <Dropdown
                        options={[
                          {
                            title: "View",
                            onClick: () => {
                              setSelectedSalaryBandId(salaryBand.id);
                              setSelectedSalaryBand(salaryBand);
                              setIsModalOpen("view-salaryBand");
                            },
                          },
                          {
                            title: "Edit",
                            onClick: () => {
                              setInitialValues(salaryBand);
                              setIsModalOpen("edit-salaryBand");
                            },
                          },
                          {
                            title: "Delete",
                            onClick: () => {
                              setSelectedSalaryBandId(salaryBand.id);
                              deleteSalaryBand(salaryBand.id);
                            },
                          },
                        ]}
                        label="Actions"
                        size="sm"
                      />
                    )}
                  </td>
                </tr>
              );
            })}

            {salaryBandsData && salaryBandsData.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No salary bands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen === "add-salaryBand" && <AddSalaryBand />}
      {isModalOpen === "edit-salaryBand" && initialValues && (
        <EditSalaryBand
          initialValues={initialValues as unknown as EditUserFormValues}
        />
      )}
      {isModalOpen === "view-salaryBand" && selectedSalaryBandId && (
        <ViewSalaryBand selectedSalaryBand={selectedSalaryBand} />
      )}
    </div>
  );
};

export default SalaryBandTable;
