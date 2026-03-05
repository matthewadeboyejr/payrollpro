"use client";

import React, { useState } from "react";
import AboutPage from "@/components/ui/AboutPage";
import ExpenseManagementTable from "@/components/tables/ExpenseManagementTable";
import IncomeManagementTable from "@/components/tables/IncomeManagementTable";

const ExpenseManagement = () => {
  const [tab, setTab] = useState<"expenses" | "income">("expenses");

  return (
    <main className="w-full">
      <AboutPage about="Track and manage employee expenses and company income" />


      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <div className="bg-white p-5 rounded-md flex gap-2 border border-gray-200">
          <button
            onClick={() => setTab("expenses")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${tab === "expenses"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            Expenses
          </button>

          <button
            onClick={() => setTab("income")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${tab === "income"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            Income
          </button>
        </div>
      </section>

      <section className="w-full mt-5">
        {tab === "expenses" ? <ExpenseManagementTable /> : <IncomeManagementTable />}
      </section>
    </main>
  );
};

export default ExpenseManagement;
