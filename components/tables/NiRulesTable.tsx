"use client";

import React, { useState } from "react";
import { useGetNiRulesQuery, useDeleteNiRuleMutation } from "@/services/api/constants/payroll.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { FiEdit2, FiTrash2, FiPlus, FiFilter, FiSearch, FiShield } from "react-icons/fi";
import { showAlert } from "@/components/ui/ShowAlert";
import EmptyState from "@/components/ui/EmptyState";
import Swal from "sweetalert2";
import NiRuleForm from "@/components/forms/NiRuleForm";

interface NiRule {
    id: number;
    taxYearLabel: string;
    niCategory: string;
    primaryThresholdAnnual: number;
    upperEarningsLimitAnnual?: number;
    mainRate: number;
    upperRate: number;
}

const NiRulesTable = () => {
    const [filters, setFilters] = useState({ taxYearLabel: "", niCategory: "" });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<NiRule | null>(null);

    const { data: response, isLoading, refetch } = useGetNiRulesQuery(filters);
    const [deleteNiRule] = useDeleteNiRuleMutation();

    const rules = response?.data || [];

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This NI rule will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteNiRule(id).unwrap();
                showAlert("Deleted!", "NI rule has been deleted.", "success");
            } catch (error: unknown) {
                const err = error as { data?: { message?: string } };
                showAlert("Error", err?.data?.message || "Failed to delete rule", "error");
            }
        }
    };

    const handleEdit = (rule: NiRule) => {
        setSelectedRule(rule);
        setIsAddModalOpen(true);
    };

    if (isLoading) return <TableSkeleton columns={6} />;

    return (
        <div className="w-full space-y-4">
            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tax Year (e.g. 2024/25)"
                            className="pl-10 pr-4 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={filters.taxYearLabel}
                            onChange={(e) => setFilters({ ...filters, taxYearLabel: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="NI Category (e.g. A)"
                            className="pl-10 pr-4 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={filters.niCategory}
                            onChange={(e) => setFilters({ ...filters, niCategory: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedRule(null);
                        setIsAddModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm font-medium text-sm"
                >
                    <FiPlus />
                    Add NI Rule
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-700/50 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold border-b dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4">Tax Year</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right whitespace-nowrap">PT / UEL (Annual)</th>
                            <th className="px-6 py-4 text-center whitespace-nowrap">Main Rate (%)</th>
                            <th className="px-6 py-4 text-center whitespace-nowrap">Upper Rate (%)</th>
                            <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {rules.map((rule: NiRule) => (
                            <tr key={rule.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-all duration-300 group">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-gray-900 dark:text-white uppercase text-[10px] tracking-tight">{rule.taxYearLabel}</span>
                                </td>
                                <td className="px-6 py-4 text-left">
                                    <span className="px-2.5 py-0.5 bg-purple-50/50 text-purple-600 border border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/50 rounded-md text-[10px] font-bold uppercase tracking-wide">
                                        CATEGORY {rule.niCategory || "ANY"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            £{rule.primaryThresholdAnnual?.toLocaleString()} - {rule.upperEarningsLimitAnnual ? `£${rule.upperEarningsLimitAnnual.toLocaleString()}` : "∞"}
                                        </span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Annual Limit</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                                    <div className="inline-flex items-center px-2 py-1 bg-blue-50/30 dark:bg-blue-900/10 rounded-lg">
                                        {(rule.mainRate * 100).toFixed(2).replace(/\.00$/, "")}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-orange-600 dark:text-orange-400">
                                    <div className="inline-flex items-center px-2 py-1 bg-orange-50/30 dark:bg-orange-900/10 rounded-lg">
                                        {(rule.upperRate * 100).toFixed(2).replace(/\.00$/, "")}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(rule)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                                            title="Edit Rule"
                                        >
                                            <FiEdit2 size={15} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rule.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                                            title="Delete Rule"
                                        >
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {rules.length === 0 && !isLoading && (
                    <EmptyState
                        icon={FiShield}
                        title="No NI Rules"
                        description="National Insurance rules are not defined for the current selection. Define NI categories, thresholds, and rates to ensure accurate payroll deductions."
                        action={{
                            label: "Add NI Rule",
                            onClick: () => {
                                setSelectedRule(null);
                                setIsAddModalOpen(true);
                            },
                            icon: <FiPlus />
                        }}
                    />
                )}
            </div>

            {/* Modals */}
            {isAddModalOpen && (
                <NiRuleForm
                    rule={selectedRule || undefined}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setSelectedRule(null);
                        refetch();
                    }}
                />
            )}
        </div>
    );
};

export default NiRulesTable;
