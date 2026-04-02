"use client";

import React, { useState } from "react";
import AboutPage from "@/components/ui/AboutPage";
import General from "@/components/settings/General";
import Security from "@/components/settings/Security";
import Notifications from "@/components/settings/Notifications";
import System from "@/components/settings/System";
import { Form } from "react-final-form";
import { SettingFormValues } from "@/components/types/formFields";
import Users from "@/components/settings/Users";
import SalaryBands from "@/components/settings/SalaryBands";
import IncomeCategories from "@/components/settings/IncomeCategories";
import ExpenseCategories from "@/components/settings/ExpenseCategories";
import { useSearchParams } from "next/navigation";
import {
  BiBuilding,
  BiShield,
  BiBell,
  BiServer,
  BiUser,
  BiMoney,
  BiCategory,
  BiCog,
} from "react-icons/bi";
import Payroll from "@/components/settings/Payroll";

const Settings = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabParam || "General");

  React.useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const menuItems = [
    { label: "General", icon: <BiBuilding className="text-xl" /> },
    { label: "Security", icon: <BiShield className="text-xl" /> },
    { label: "Notifications", icon: <BiBell className="text-xl" /> },
    { label: "System", icon: <BiServer className="text-xl" /> },
    { label: "Users", icon: <BiUser className="text-xl" /> },
    { label: "Salary Bands", icon: <BiMoney className="text-xl" /> },
    { label: "Payroll", icon: <BiCog className="text-xl" /> },
    { label: "Income Categories", icon: <BiCategory className="text-xl" /> },
    { label: "Expense Categories", icon: <BiCategory className="text-xl" /> },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const onSubmit = (values: SettingFormValues) => {
    console.log(values);
  };

  const validateForm = () => {
    const errors: Partial<SettingFormValues> = {};
    return errors;
  };

  return (
    <main className="w-full">
      <AboutPage about="Manage your application preferences and configuration" />

      <div className="flex flex-col md:flex-row gap-6 mt-5 items-start">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTabClick(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap ${activeTab === item.label
                  ? "bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0 w-full">
          {!["Users", "Salary Bands", "Payroll", "Income Categories", "Expense Categories"].includes(activeTab) && (
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-sm">
                Save Changes
              </button>
            </div>
          )}

          <Form<SettingFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit} className="w-full">
                {activeTab === "General" && <General form={form} />}
                {activeTab === "Security" && <Security form={form} />}
                {activeTab === "Notifications" && <Notifications form={form} />}
                {activeTab === "System" && <System form={form} />}
              </form>
            )}
          />
          {activeTab === "Users" && <Users />}
          {activeTab === "Salary Bands" && <SalaryBands />}
          {activeTab === "Payroll" && <Payroll />}
          {activeTab === "Income Categories" && <IncomeCategories />}
          {activeTab === "Expense Categories" && <ExpenseCategories />}
        </div>
      </div>
    </main>
  );
};

export default Settings;
