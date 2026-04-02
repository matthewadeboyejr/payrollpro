"use client";

import React, { useState } from "react";
import { useGetEmployeePayslipsQuery } from "@/services/api/constants/payroll.constant";
import { FiFileText, FiDownload, FiEye, FiFilter } from "react-icons/fi";

interface EmployeePayslipListProps {
  employeeId: string;
}

interface Payslip {
  id: string | number;
  workedHours: number;
  hourlyRateApplied: number;
  grossPay: number;
  taxDeduction: number;
  pensionDeduction: number;
  nationalInsuranceDeduction: number;
  netPay: number;
}

const EmployeePayslipList = ({ employeeId }: EmployeePayslipListProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  
  const { data: response, isLoading } = useGetEmployeePayslipsQuery({ 
    employeeId, 
    year: selectedYear 
  });
  
  const payslips = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            Payment History
        </h3>
        
        <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 text-sm" />
            <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm px-3 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                {[...Array(5)].map((_, i) => (
                    <option key={i} value={currentYear - i}>
                        {currentYear - i}
                    </option>
                ))}
            </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-[11px] text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Reference</th>
                <th className="px-6 py-4 font-semibold border-x dark:border-gray-700">Period Info</th>
                <th className="px-6 py-4 font-semibold text-right">Gross Pay</th>
                <th className="px-6 py-4 font-semibold text-right text-orange-500">Deductions</th>
                <th className="px-6 py-4 font-semibold text-right text-blue-600 dark:text-blue-400">Net Pay</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {payslips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                    No payslips found for {selectedYear}.
                  </td>
                </tr>
              ) : (
                payslips.map((payslip: Payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        #{payslip.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-x dark:border-gray-700">
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {payslip.workedHours} Hours Worked
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Rate: £{payslip.hourlyRateApplied}/hr
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                      £{payslip.grossPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-600/80 font-medium">
                      -£{(payslip.taxDeduction + payslip.pensionDeduction + payslip.nationalInsuranceDeduction)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">
                      £{payslip.netPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        <button 
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="View Details"
                        >
                          <FiEye size={16} />
                        </button>
                        <button 
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Download PDF"
                        >
                          <FiDownload size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayslipList;
