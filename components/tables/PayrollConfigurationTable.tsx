"use client";

import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiSettings } from "react-icons/fi";
import UsersTableSkeleton from "../ui/UsersTableSkeleton";
import EmptyState from "../ui/EmptyState";
import { useModal } from "@/context/ModalContext";
import Spinner from "../ui/Spinner";
import { 
  useGetPayrollConfigurationQuery, 
  useGetActivePayrollConfigurationQuery 
} from "@/services/api/constants/payroll.constant";
import { PayrollConfiguration } from "../types/formFields";
import AddPayrollConfiguration from "../settings/sub-component/AddPayrollConfiguration";
import EditPayrollConfiguration from "../settings/sub-component/EditPayrollConfiguration";
import { format } from "date-fns";
import { useAction } from "@/hooks/useAction";

const PayrollConfigurationTable = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [search, setSearch] = useState("");
  const [selectedConfig, setSelectedConfig] = useState<PayrollConfiguration | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "active">("all");

  const { 
    data: allConfigsResponse, 
    isLoading: isLoadingAll 
  } = useGetPayrollConfigurationQuery(undefined, {
    skip: statusFilter !== "all"
  });

  const { 
    data: activeConfigResponse, 
    isLoading: isLoadingActive 
  } = useGetActivePayrollConfigurationQuery(undefined, {
    skip: statusFilter !== "active"
  });

  const { activatePayrollConfigurationAction, isActivatingPayrollConfig } = useAction();

  const configs = statusFilter === "all" 
    ? (allConfigsResponse?.data || []) 
    : (activeConfigResponse?.data ? (Array.isArray(activeConfigResponse.data) ? activeConfigResponse.data : [activeConfigResponse.data]) : []);

  const isLoading = statusFilter === "all" ? isLoadingAll : isLoadingActive;

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      {/* Tabs Filter */}
      <div className="flex border-b border-gray-100 dark:border-gray-700 mb-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            statusFilter === "all"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          All Configurations
        </button>
        <button
          onClick={() => setStatusFilter("active")}
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            statusFilter === "active"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Active Only
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search configuration..."
            className="w-full outline-none focus:outline-none focus:ring-focus text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              setIsModalOpen("add-payroll-config");
            }}
          >
            <FiPlus />
            <span>Add Configuration</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S.No</th>
              <th scope="col" className="px-6 py-3">Effective From</th>
              <th scope="col" className="px-6 py-3">Tax Year Start</th>
              <th scope="col" className="px-6 py-3">Region</th>
              <th scope="col" className="px-6 py-3 text-center">Progressive Tax</th>
              <th scope="col" className="px-6 py-3 text-center">Employee NI</th>
              <th scope="col" className="px-6 py-3">Pension (EE/ER)</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config: PayrollConfiguration, index: number) => (
              <tr key={config.id} className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                <td className="px-6 py-4">{format(new Date(config.effectiveFrom), "dd MMM yyyy")}</td>
                <td className="px-6 py-4">{config.taxYearStartDay}/{config.taxYearStartMonth}</td>
                <td className="px-6 py-4">{config.defaultTaxRegion}</td>
                <td className="px-6 py-4 text-center">{config.enableProgressiveTax ? "Yes" : "No"}</td>
                <td className="px-6 py-4 text-center">{config.enableEmployeeNi ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                  {(config.defaultEmployeePensionRate * 100).toFixed(1)}% / {(config.defaultEmployerPensionRate * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${config.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}`}>
                    {config.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    options={[
                      {
                        title: "Edit",
                        onClick: () => {
                          setSelectedConfig(config);
                          setIsModalOpen("edit-payroll-config");
                        },
                      },
                      ...(!config.isActive ? [{
                        title: "Activate",
                        onClick: () => activatePayrollConfigurationAction(config.id),
                      }] : []),
                    ]}
                    label="Actions"
                    size="sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {configs.length === 0 && !isLoading && (
          <EmptyState
            icon={FiSettings}
            title="No Configurations"
            description="No payroll configurations found. Create your first configuration to define tax years, regions, and default rates."
            action={{
              label: "Add Configuration",
              onClick: () => setIsModalOpen("add-payroll-config"),
              icon: <FiPlus />
            }}
          />
        )}
      </div>

      {isModalOpen === "add-payroll-config" && <AddPayrollConfiguration />}
      {isModalOpen === "edit-payroll-config" && selectedConfig && (
        <EditPayrollConfiguration initialValues={selectedConfig} />
      )}
      {isActivatingPayrollConfig && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PayrollConfigurationTable;
