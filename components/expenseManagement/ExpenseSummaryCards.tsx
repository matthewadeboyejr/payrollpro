"use client";

import React, { useState } from "react";
import { useGetExpenseSummaryQuery } from "@/services/api/constants/expense.constant";
import Cards from "@/components/ui/Cards";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
import { FiDollarSign } from "react-icons/fi";

const ExpenseSummaryCards = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [startDate, setStartDate] = useState(
        firstDayOfMonth.toISOString().split("T")[0]
    );
    const [endDate, setEndDate] = useState(
        today.toISOString().split("T")[0]
    );

    const { data: summaryData, isLoading } = useGetExpenseSummaryQuery(
        { startDate, endDate },
        { skip: !startDate || !endDate }
    );

    const summary = summaryData?.data || summaryData || {};

    return (
        <div className="space-y-4">
            {/* Date Range Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 rounded-md dark:bg-gray-800">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date Range:
                </span>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-200 rounded-sm px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <span className="text-gray-500 dark:text-gray-400">to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-200 rounded-sm px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <section className="flex gap-5 flex-col md:flex-row w-full">
                <Cards
                    title="Total Amount"
                    icon={<RiBillLine />}
                    value={
                        isLoading
                            ? "..."
                            : `£${(summary.totalAmount ?? 0).toLocaleString()}`
                    }
                    data=""
                    color="green"
                    details={`${startDate} – ${endDate}`}
                />
                <Cards
                    title="Total Approved"
                    icon={<FiDollarSign />}
                    value={
                        isLoading
                            ? "..."
                            : `£${(summary.totalApproved ?? 0).toLocaleString()}`
                    }
                    data=""
                    color="blue"
                    details="Approved expenses"
                />
                <Cards
                    title="Total Pending"
                    icon={<FaArrowTrendUp />}
                    value={
                        isLoading
                            ? "..."
                            : `£${(summary.totalPending ?? 0).toLocaleString()}`
                    }
                    data=""
                    color="green"
                    details="Awaiting approval"
                />
            </section>
        </div>
    );
};

export default ExpenseSummaryCards;
