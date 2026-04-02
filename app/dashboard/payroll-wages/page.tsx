"use client";

import React from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { FaRegClock } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { BiEuro, BiPlus } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import PayrollHistoryTable from "@/components/payroll/PayrollHistoryTable";
import RunPayrollWizard from "@/components/payroll/RunPayrollWizard";
import { useGetPayrollRunsQuery } from "@/services/api/constants/payroll.constant";
import { useModal } from "@/context/ModalContext";

const PayrollManagement = () => {

  const { setIsModalOpen, isModalOpen } = useModal();
  const { data: response, refetch } = useGetPayrollRunsQuery({});
  const payrollRuns = response?.data;

  // Summary Metrics Calculation (Example using the first run)
  const latestRun = payrollRuns?.[0];
  const pendingRuns = payrollRuns?.filter((r: { status: string }) => r.status !== "Finalized").length || 0;

  return (
    <main className="w-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <AboutPage about="Complete payroll lifecycle management, processing and compliance." />
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings?tab=Payroll"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400 font-medium text-sm shadow-sm"
          >
            <FiSettings className="text-lg" />
            <span>Configure</span>
          </Link>
          <button
            onClick={() => setIsModalOpen('run-payroll')}
            className="flex items-center justify-center gap-2 primary-btn px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <BiPlus className="text-xl" />
            <span>New Payroll Run</span>
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
          title="Total Gross Pay"
          icon={<BiEuro />}
          value={latestRun ? `£${latestRun.totalGross?.toLocaleString() || '0.00'}` : "£0.00"}
          data=""
          color="blue"
          details={latestRun ? `Last Run: ${latestRun.departmentName || 'General'}` : "No data"}
        />
        <Cards
          title="Total Net Pay"
          icon={<BiEuro />}
          value={latestRun ? `£${latestRun.totalNet?.toLocaleString() || '0.00'}` : "£0.00"}
          data=""
          color="green"
          details="After all deductions"
        />
        <Cards
          title="Tax Deductions"
          icon={<RiBillLine />}
          value={latestRun ? `£${latestRun.totalDeductions?.toLocaleString() || '0.00'}` : "£0.00"}
          data=""
          color="orange"
          details="Tax + NI + Pension"
        />
        <Cards
          title="Pending Runs"
          icon={<FaRegClock />}
          value={pendingRuns.toString()}
          data=""
          color="purple"
          details="Runs awaiting finalization"
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Payroll Cycle History</h2>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-medium italic">
            Most Recent First
          </span>
        </div>
        <PayrollHistoryTable />
      </section>

      <RunPayrollWizard
        isOpen={isModalOpen === 'run-payroll'}
        onClose={() => setIsModalOpen('')}
        onSuccess={() => refetch()}
      />
    </main>
  );
};

export default PayrollManagement;
