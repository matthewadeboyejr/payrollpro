"use client";

import React, { useState } from "react";
import { useGetTaxRulesQuery, useDeleteTaxRuleMutation } from "@/services/api/constants/payroll.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { FiEdit2, FiTrash2, FiPlus, FiFilter, FiSearch, FiPercent } from "react-icons/fi";
import { showAlert } from "@/components/ui/ShowAlert";
import EmptyState from "@/components/ui/EmptyState";
import Swal from "sweetalert2";
import TaxRuleForm from "@/components/forms/TaxRuleForm";

interface TaxRule {
    id: number;
    taxYearLabel: string;
    region: string;
    bandName: string;
    lowerBoundAnnual: number;
    upperBoundAnnual?: number;
    rate: number;
}

const TaxRulesTable = () => {
    const [filters, setFilters] = useState({ taxYearLabel: "", region: "" });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxRule | null>(null);

    const { data: response, isLoading, refetch } = useGetTaxRulesQuery(filters);
    const [deleteTaxRule] = useDeleteTaxRuleMutation();

    const rules = response?.data || [];

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This tax rule will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteTaxRule(id).unwrap();
                showAlert("Deleted!", "Tax rule has been deleted.", "success");
            } catch (error: unknown) {
                const err = error as { data?: { message?: string } };
                showAlert("Error", err?.data?.message || "Failed to delete rule", "error");
            }
        }
    };

    const handleEdit = (rule: TaxRule) => {
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
                            placeholder="Region (e.g. UK)"
                            className="pl-10 pr-4 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={filters.region}
                            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
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
                    Add Tax Rule
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-700/50 text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold border-b dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-left whitespace-nowrap">Tax Year / Region</th>
                            <th className="px-6 py-4">Band Name</th>
                            <th className="px-6 py-4 text-right">Annual Bounds (Lower - Upper)</th>
                            <th className="px-6 py-4 text-center">Rate (%)</th>
                            <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {rules.map((rule: TaxRule) => (
                            <tr key={rule.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-all duration-300 group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-white uppercase text-[10px] tracking-tight">{rule.taxYearLabel}</span>
                                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">{rule.region}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                                        rule.bandName?.toLowerCase() === "basic" ? "bg-blue-50/50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800/50" :
                                        rule.bandName?.toLowerCase() === "higher" ? "bg-purple-50/50 text-purple-600 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/50" :
                                        "bg-orange-50/50 text-orange-600 border-orange-100 dark:bg-orange-900/10 dark:text-orange-400 dark:border-orange-800/50"
                                    }`}>
                                        {rule.bandName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            £{rule.lowerBoundAnnual?.toLocaleString()} - {rule.upperBoundAnnual ? `£${rule.upperBoundAnnual.toLocaleString()}` : "∞"}
                                        </span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Annual Limit</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center px-2 py-1 bg-green-50/50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg font-bold text-xs border border-green-100 dark:border-green-800/50">
                                        {(rule.rate * 100).toFixed(2).replace(/\.00$/, "")}%
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
                        icon={FiPercent}
                        title="No Tax Rules"
                        description="Professional tax brackets are not configured yet. Add tax rules to define income bands and corresponding rates for specific regions and tax years."
                        action={{
                            label: "Add Tax Rule",
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
                <TaxRuleForm
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

export default TaxRulesTable;
