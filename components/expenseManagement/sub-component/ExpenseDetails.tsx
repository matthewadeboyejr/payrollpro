import React from "react";
import { ExpenseDetailsProps } from "@/components/types/formFields";

export const ExpenseDetails = ({
    title,
    employee,
    category,
    amount,
    date,
    employeeId,
    receipt,
}: ExpenseDetailsProps) => {
    return (
        <div className="space-y-4 mb-4 bg-gray-50 p-4 rounded-sm">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-black">{title}</span>
                    <span className="text-sm text-gray-500 font-medium">{employee}</span>
                </div>
                <div>
                    <span className="text-sm text-black border px-2 py-1 rounded-2xl w-fit font-semibold">
                        {category}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">Amount:</span>
                    <span className="text-sm font-semibold text-black">{amount}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">Date:</span>
                    <span className="text-sm font-semibold text-black">{date}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">
                        Employee ID:
                    </span>
                    <span className="text-sm font-semibold text-black">{employeeId}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">Receipt:</span>
                    <span className="text-sm font-semibold text-blue-500">{receipt}</span>
                </div>
            </div>
        </div>
    );
};
