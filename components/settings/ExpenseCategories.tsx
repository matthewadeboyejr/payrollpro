import React from "react";
import ExpenseCategoryTable from "../tables/ExpenseCategoryTable";
import { BiMoney } from "react-icons/bi";

const ExpenseCategories = () => {
    return (
        <section className="w-full mt-5 bg-white p-4 rounded-lg dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-5">
                <BiMoney className="font-bold text-xl dark:text-white" />
                <h2 className="text-lg font-semibold dark:text-white">Expense Categories</h2>
            </div>
            <div className="w-full">
                <ExpenseCategoryTable />
            </div>
        </section>
    );
};

export default ExpenseCategories;
