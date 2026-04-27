import React, { useState } from "react";
import { FiSearch, FiActivity } from "react-icons/fi";
import { useGetAccountingAuditLogsQuery } from "@/services/api/constants/accounting.constant";
import TableSkeleton from "../ui/TableSkeleton";

interface AuditLog {
    id: number;
    action: string;
    entityName: string;
    entityId: string;
    details: string;
    userEmail: string;
    createdAt: string;
}

const AuditLogTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [actionFilter, setActionFilter] = useState("");
    const [entityFilter, setEntityFilter] = useState("");
    const { data: auditLogs, isLoading } = useGetAccountingAuditLogsQuery({
        action: actionFilter,
        entityName: entityFilter
    });

    const filteredLogs = auditLogs?.data?.filter((log: AuditLog) =>
        log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getActionBadgeColor = (action: string) => {
        switch (action) {
            case 'CREATE': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'UPDATE': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'DELETE': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'LOCK': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'UNLOCK': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const entities = ["Payment", "Invoice", "Bill", "BankAccount", "AccountingExpense", "VatCode", "Period", "PayrollRun", "JournalEntry", "RecurringTemplate"];
    const actions = ["CREATE", "UPDATE", "DELETE", "LOCK", "UNLOCK", "POST", "RECONCILE", "UPDATE_LOCK"];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header / Search */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                        <FiActivity className="text-blue-500" /> System Audit Trail
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Detailed history of all administrative and financial actions.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <select
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">All Actions</option>
                        {actions.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>

                    <select
                        value={entityFilter}
                        onChange={(e) => setEntityFilter(e.target.value)}
                        className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">All Entities</option>
                        {entities.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>

                    <div className="relative flex-1 md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                            type="text"
                            placeholder="Search details..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest dark:text-gray-400">Timestamp</th>
                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest dark:text-gray-400">User</th>
                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest dark:text-gray-400">Action</th>
                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest dark:text-gray-400">Entity</th>
                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest dark:text-gray-400">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {isLoading ? (
                                <tr><td colSpan={5}><TableSkeleton columns={5} showSearch={false} showAddButton={false} /></td></tr>
                            ) : filteredLogs?.length > 0 ? (
                                filteredLogs.map((log: AuditLog) => (
                                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                                    {new Date(log.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(log.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {log.userEmail?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{log.userEmail}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getActionBadgeColor(log.action)}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">{log.entityName}</span>
                                                <span className="text-[10px] text-gray-400">ID: {log.entityId}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 max-w-xs">
                                            <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                                                {log.details || 'No additional details provided.'}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400 text-sm italic">
                                        No audit records found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditLogTab;
