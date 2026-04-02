"use client";

import React from "react";
import PayrollConfigurationTable from "../tables/PayrollConfigurationTable";
import { BiCog } from "react-icons/bi";

const Payroll = () => {
    return (
        <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800 shadow-sm">
            <div className="flex items-center gap-2 mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                <BiCog className="text-xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Payroll Configuration</h2>
            </div>
            <div className="w-full">
                <PayrollConfigurationTable />
            </div>
        </section>
    );
};

export default Payroll;
