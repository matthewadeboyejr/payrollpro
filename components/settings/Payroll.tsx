"use client";

import React, { useState } from "react";
import PayrollConfigurationTable from "../tables/PayrollConfigurationTable";
import TaxRulesTable from "../tables/TaxRulesTable";
import NiRulesTable from "../tables/NiRulesTable";
import RtiManagementTable from "../tables/RtiManagementTable";
import { BiCog, BiCalculator, BiShield, BiFile } from "react-icons/bi";

const Payroll = () => {
    const [subTab, setSubTab] = useState<"general" | "tax" | "ni" | "rti">("general");

    const tabs = [
        { id: "general", label: "General Configuration", icon: <BiCog /> },
        { id: "tax", label: "Tax Rules", icon: <BiCalculator /> },
        { id: "ni", label: "NI Rules", icon: <BiShield /> },
        { id: "rti", label: "RTI Management", icon: <BiFile /> },
    ];

    return (
        <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
                <BiCog className="text-xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white uppercase tracking-tight">Payroll Administration</h2>
            </div>

            {/* Sub-Tabs (Modern Segmented Control) */}
            <div className="flex gap-1 bg-gray-100/80 dark:bg-gray-700/50 p-1.5 rounded-2xl mb-8 w-fit border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id as "general" | "tax" | "ni" | "rti")}
                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 relative ${
                            subTab === tab.id
                                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-500 scale-[1.02]"
                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-700/40"
                        }`}
                    >
                        <span className={`transition-colors ${subTab === tab.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400 grayscale group-hover:grayscale-0"}`}>
                            {tab.icon}
                        </span>
                        {tab.label}
                        {subTab === tab.id && (
                             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full blur-[1px]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="w-full animate-in fade-in duration-500">
                {subTab === "general" && <PayrollConfigurationTable />}
                {subTab === "tax" && <TaxRulesTable />}
                {subTab === "ni" && <NiRulesTable />}
                {subTab === "rti" && <RtiManagementTable />}
            </div>
        </section>
    );
};

export default Payroll;
