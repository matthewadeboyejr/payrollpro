"use client";

import React, { useState } from "react";
import { useGetPayrollRunsQuery } from "@/services/api/constants/payroll.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { FiSend, FiCheckCircle, FiClock, FiFileText, FiShield } from "react-icons/fi";
import RtiSubmissionForm from "@/components/forms/RtiSubmissionForm";
import MarkRtiSubmittedForm from "@/components/forms/MarkRtiSubmittedForm";
import EmptyState from "@/components/ui/EmptyState";

interface Run {
    id: number;
    payrollPeriod: string;
    status: string;
}

const RtiManagementTable = () => {
    const { data: response, isLoading } = useGetPayrollRunsQuery({});
    const runs: Run[] = response?.data || [];

    const [isSubmittingRti, setIsSubmittingRti] = useState(false);
    const [isMarkingSubmitted, setIsMarkingSubmitted] = useState(false);
    const [selectedRunId, setSelectedRunId] = useState<number | null>(null);

    if (isLoading) return <TableSkeleton columns={5} />;

    return (
        <div className="w-full space-y-4">
            {/* Header / Intro */}
            <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 p-8 rounded-2xl text-white shadow-xl shadow-blue-500/10 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 rounded-full -ml-12 -mb-12 blur-2xl" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-inner">
                        <FiFileText size={28} className="text-blue-100" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white mb-1 uppercase">RTI Compliance Hub</h2>
                        <p className="text-white text-xs max-w-xl leading-relaxed font-medium">
                            Manage your Real Time Information (RTI) submissions to HMRC.
                            Select a completed payroll run below to generate and submit your FPS or EPS records with confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-700/50 text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold border-b dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4">Run ID / Period</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">HMRC Status</th>
                            <th className="px-6 py-4 text-center">Last Submission</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {runs.map((run: Run) => (
                            <tr key={run.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-all duration-300 group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-white uppercase text-[10px] tracking-tight">Run #{run.id}</span>
                                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">{run.payrollPeriod || "Current Period"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border inline-flex items-center gap-1.5 ${
                                        run.status === "Finalized" ? "bg-green-50/50 text-green-600 border-green-100 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800/50" :
                                        "bg-amber-50/50 text-amber-600 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800/50"
                                    }`}>
                                        <div className={`w-1 h-1 rounded-full ${run.status === "Finalized" ? "bg-green-600" : "bg-amber-600"}`} />
                                        {run.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tight flex items-center gap-2 px-2 py-1 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-md w-fit">
                                        <FiClock className="text-gray-400" />
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-[10px] text-gray-400 font-medium">---</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedRunId(run.id);
                                                setIsSubmittingRti(true);
                                            }}
                                            disabled={run.status !== "Finalized"}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold disabled:opacity-30 disabled:hover:bg-blue-600 shadow-sm shadow-blue-500/10"
                                        >
                                            <FiSend size={13} />
                                            Submit RTI
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedRunId(run.id);
                                                setIsMarkingSubmitted(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                                            title="Mark as Submitted"
                                        >
                                            <FiCheckCircle size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {runs.length === 0 && !isLoading && (
                <EmptyState
                    icon={FiShield}
                    title="No RTI Data"
                    description="No finalized payroll runs found to report RTI. Complete and finalize a payroll cycle to generate FPS or EPS submissions for HMRC."
                />
            )}

            {/* Modals */}
            {isSubmittingRti && selectedRunId && (
                <RtiSubmissionForm
                    payrollRunId={selectedRunId}
                    onClose={() => {
                        setIsSubmittingRti(false);
                        setSelectedRunId(null);
                    }}
                />
            )}

            {isMarkingSubmitted && selectedRunId && (
                <MarkRtiSubmittedForm
                    id={selectedRunId}
                    onClose={() => {
                        setIsMarkingSubmitted(false);
                        setSelectedRunId(null);
                    }}
                />
            )}
        </div>
    );
};

export default RtiManagementTable;
