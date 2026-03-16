"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetEmployeeByIdQuery } from "@/services/api/constants/employee.constant";
import AboutPage from "@/components/ui/AboutPage";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import { FiArrowLeft, FiUser, FiBriefcase, FiCreditCard, FiPercent } from "react-icons/fi";
import EmployeeGeneralInfo from "../../../../components/employeeManagement/details/EmployeeGeneralInfo";
import EmployeeTaxForm from "../../../../components/employeeManagement/details/EmployeeTaxForm";
import EmployeeBankForm from "../../../../components/employeeManagement/details/EmployeeBankForm";
import EmployeePensionForm from "../../../../components/employeeManagement/details/EmployeePensionForm";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  const { data: employeeData, isLoading } = useGetEmployeeByIdQuery(id as string, {
    skip: !id,
  });

  const employee = employeeData?.data?.employee;
  const leaveSummary = employeeData?.data?.leaveSummary;
  const taxData = employeeData?.data?.tax;
  const bankData = employeeData?.data?.bank;
  const pensionData = employeeData?.data?.pension;

  if (isLoading) {
    return (
      <main className="w-full">
        <AboutPage about="Loading employee details..." />
        <div className="mt-5">
           <ViewSkeleton />
        </div>
      </main>
    );
  }

  const tabs = [
    { id: "general", label: "General Information", icon: <FiUser /> },
    { id: "tax", label: "Tax Details", icon: <FiBriefcase /> },
    { id: "bank", label: "Bank Account", icon: <FiCreditCard /> },
    { id: "pension", label: "Pension Scheme", icon: <FiPercent /> },
  ];

  return (
    <main className="w-full">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FiArrowLeft size={20} />
        </button>
        <AboutPage about={`Manage details for ${employee?.fullName || "Employee"}`} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm">
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "general" && (
            <EmployeeGeneralInfo employee={employee} leaveSummary={leaveSummary} />
          )}
          {activeTab === "tax" && (
            <EmployeeTaxForm employeeId={id as string} initialData={taxData} />
          )}
          {activeTab === "bank" && (
            <EmployeeBankForm employeeId={id as string} initialData={bankData} />
          )}
          {activeTab === "pension" && (
            <EmployeePensionForm employeeId={id as string} initialData={pensionData} />
          )}
        </div>
      </div>
    </main>
  );
};

export default EmployeeDetailsPage;
