"use client";

import React from "react";
import { useGetPayslipsByRunIdQuery } from "@/services/api/constants/payroll.constant";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import { Dropdown } from "@/components/ui/Dropdown";
import { FiSend, FiEye } from "react-icons/fi";
import PayslipDetailModal from "./sub-component/PayslipDetailModal";

import { useAction } from "@/hooks/useAction";

interface Props {
  runId: string | number | string[];
}

const RunPayslipList = ({ runId }: Props) => {
  const [selectedPayslipId, setSelectedPayslipId] = React.useState<number | string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { sendPayslipAction, sendAllPayslipsAction, isSendingAllPayslips } = useAction();

  const { data: response, isLoading } = useGetPayslipsByRunIdQuery(runId);
  const payslips = response?.data || [];

  const handleViewDetails = (id: number | string) => {
    setSelectedPayslipId(id);
    setIsModalOpen(true);
  };

  const handleSendAll = async () => {
    // We expect runId to be a single ID here, but let's handle array if it comes that way
    const id = Array.isArray(runId) ? runId[0] : runId;
    try {
      await sendAllPayslipsAction(id);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      console.error(error?.data?.message || "Failed to send all payslips");
    }
  };

  if (isLoading) {
    return <ViewSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Official Payslips</h2>
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
            Total Generated: {payslips.length}
          </div>
          {payslips.length > 0 && (
            <button
              onClick={handleSendAll}
              disabled={isSendingAllPayslips}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md text-xs font-bold transition-all flex items-center gap-2"
            >
              <FiSend className={isSendingAllPayslips ? "animate-pulse" : ""} />
              {isSendingAllPayslips ? "Sending..." : "Send All to Employees"}
            </button>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-[11px] text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Employee</th>
              <th className="px-6 py-4 font-semibold text-right">Gross Pay</th>
              <th className="px-6 py-4 font-semibold text-right">Total Deductions</th>
              <th className="px-6 py-4 font-semibold text-right bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400">Net Pay</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {payslips.map((payslip: { id: string | number; employeeName: string; employeeNo: string; employeeEmail: string; grossPay: number; totalDeductions: number; netPay: number; isPublished: boolean }) => (
              <tr key={payslip.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      {payslip.employeeName}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium italic">
                      {payslip.employeeNo} • {payslip.employeeEmail}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  £{payslip.grossPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right text-orange-600 dark:text-orange-400 font-medium">
                   -£{payslip.totalDeductions?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/5">
                  £{payslip.netPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    payslip.isPublished 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {payslip.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    options={[
                      {
                        title: "View Details",
                        onClick: () => handleViewDetails(payslip.id),
                        icon: <FiEye />
                      },
                      {
                        title: "Send to Employee",
                        onClick: () => sendPayslipAction(payslip.id, payslip.employeeEmail),
                        icon: <FiSend />
                      }
                    ]}
                    label="Actions"
                    size="sm"
                  />
                </td>
              </tr>
            ))}
            {payslips.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">
                   No formal payslips found for this run. Please ensure they have been generated.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payslip Detail Modal */}
      {isModalOpen && selectedPayslipId && (
        <PayslipDetailModal 
          payslipId={selectedPayslipId} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default RunPayslipList;
