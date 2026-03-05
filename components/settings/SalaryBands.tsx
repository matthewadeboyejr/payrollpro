import React from "react";
import SalaryBandTable from "../tables/SalaryBandTable";
import { BiMoney } from "react-icons/bi";

const SalaryBands = () => {
    return (
        <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-5">
                <BiMoney className="font-bold text-xl dark:text-white" />
                <h2 className="text-lg font-semibold dark:text-white">Salary Bands</h2>
            </div>
            <div className="w-full">
                <SalaryBandTable />
            </div>
        </section>
    );
};

export default SalaryBands;
