"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  useGetPayrollRunByIdQuery, 
  useFinalizePayrollRunMutation 
} from "@/services/api/constants/payroll.constant";
import AboutPage from "@/components/ui/AboutPage";
import ViewSkeleton from "@/components/ui/ViewSkeleton";
import Cards from "@/components/ui/Cards";
import StatusBadge from "@/utils/StatusBadge";
import { 
  FiArrowLeft, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign,
  FiCheckCircle,
  FiFileText
} from "react-icons/fi";
import { showAlert } from "@/components/ui/ShowAlert";

import { useAction } from "@/hooks/useAction";
import RunPayslipList from "@/components/payroll/RunPayslipList";

const PayrollRunDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"breakdown" | "payslips">("breakdown");
  const { data: response, isLoading, refetch } = useGetPayrollRunByIdQuery(id);
  const [finalizeRun, { isLoading: isFinalizing }] = useFinalizePayrollRunMutation();
  const { 
    generatePayslipsAction, 
    isGeneratingPayslips 
  } = useAction();

  const runDetails = response?.data;
  const items = runDetails?.items || [];

  const handleFinalize = async () => {
    try {
      await finalizeRun(id).unwrap();
      showAlert("Success", "Payroll run finalized successfully", "success");
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || "Failed to finalize run", "error");
    }
  };

  const handleGeneratePayslips = async () => {
    if (id) {
      await generatePayslipsAction(id as string);
      refetch();
      setActiveTab("payslips"); // Switch to payslips tab after generation
    }
  };

  if (isLoading) {
    return (
      <main className="w-full space-y-6">
        <AboutPage about="Loading payroll run details..." />
        <div className="mt-5">
          <ViewSkeleton />
        </div>
      </main>
    );
  }

  if (!runDetails) {
    return (
      <main className="w-full p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
        <p className="text-gray-500">Payroll run not found.</p>
        <button 
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </main>
    );
  }

  const monthName = new Date(0, (runDetails.month || 1) - 1).toLocaleString('en-GB', { month: 'long' });

  return (
    <main className="w-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
               Run #{runDetails.id} - {monthName} {runDetails.year}
              </h1>
              <StatusBadge status={runDetails.status} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {runDetails.departmentName || "All Departments"} • Tax Year {runDetails.taxYearLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {runDetails.status === "Draft" && (
            <button
              onClick={handleFinalize}
              disabled={isFinalizing}
              className="flex items-center justify-center gap-2 primary-btn px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <FiCheckCircle className="text-lg" />
              <span>{isFinalizing ? "Finalizing..." : "Finalize Run"}</span>
            </button>
          )}

          {runDetails.status === "Finalized" && (
            <button
              onClick={handleGeneratePayslips}
              disabled={isGeneratingPayslips}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-medium"
            >
              <FiFileText className="text-lg" />
              <span>{isGeneratingPayslips ? "Generating..." : "Generate Payslips"}</span>
            </button>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
          title="Total Gross"
          icon={<FiTrendingUp className="text-blue-500" />}
          value={`£${runDetails.totalGross?.toLocaleString() || '0.00'}`}
          color="blue"
          details={`${runDetails.employeeCount} Employees`}
        />
        <Cards
          title="Total Deductions"
          icon={<FiTrendingDown className="text-orange-500" />}
          value={`£${runDetails.totalDeductions?.toLocaleString() || '0.00'}`}
          color="orange"
          details={`Tax + NI + Pension`}
        />
        <Cards
          title="Total Net Pay"
          icon={<FiDollarSign className="text-green-500" />}
          value={`£${runDetails.totalNet?.toLocaleString() || '0.00'}`}
          color="green"
          details="Total take-home pay"
        />
        <Cards
          title="Tax Period"
          icon={<FiFileText className="text-purple-500" />}
          value={`P${runDetails.taxPeriodNumber}`}
          color="purple"
          details={`${new Date(runDetails.periodStartDate).toLocaleDateString()} - ${new Date(runDetails.periodEndDate).toLocaleDateString()}`}
        />
      </section>

      {/* View Selector Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
            activeTab === "breakdown"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Run Breakdown
        </button>
        <button
          onClick={() => setActiveTab("payslips")}
          className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
            activeTab === "payslips"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Official Payslips
        </button>
      </div>

      {activeTab === "breakdown" ? (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Employee Breakdown</h2>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                  Currency: GBP (£)
              </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-[11px] text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-400 border-b dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold text-right">Base Pay</th>
                  <th className="px-6 py-4 font-semibold text-right">Tax</th>
                  <th className="px-6 py-4 font-semibold text-right">NI</th>
                  <th className="px-6 py-4 font-semibold text-right">Pension</th>
                  <th className="px-6 py-4 font-semibold text-right bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400">Net Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {items.map((item: { id: string | number; employeeName: string; employeeNo: string; workedHours: number; basePay: number; taxDeduction: number; nationalInsuranceDeduction: number; pensionDeduction: number; netPay: number }) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">
                          {item.employeeName}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium italic">
                          {item.employeeNo} • {item.workedHours} hrs
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-700 dark:text-gray-300">
                      {item.basePay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-600 dark:text-orange-400 font-medium">
                      {item.taxDeduction?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400 font-medium">
                      {item.nationalInsuranceDeduction?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400 font-medium">
                      {item.pensionDeduction?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/5">
                      {item.netPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50/80 dark:bg-gray-700/80 font-bold border-t-2 border-gray-100 dark:border-gray-600">
                  <tr>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">RUN TOTALS</td>
                      <td className="px-6 py-4 text-right text-gray-900 dark:text-white">
                          {runDetails.totalGross?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td colSpan={3} className="px-6 py-4 text-right text-orange-600 dark:text-orange-400">
                          -{runDetails.totalDeductions?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-right text-blue-600 dark:text-blue-400">
                          {runDetails.totalNet?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                  </tr>
              </tfoot>
            </table>
          </div>
        </section>
      ) : (
        <RunPayslipList runId={id as string} />
      )}
    </main>
  );
};

export default PayrollRunDetails;
