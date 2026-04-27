import { useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiPieChart, FiDollarSign, FiCalendar } from "react-icons/fi";
import { useGetAccountingBankAccountsQuery, useGetAccountingVatQuery } from "@/services/api/constants/accounting.constant";

const AccountingOverview = () => {
    const { data: banks } = useGetAccountingBankAccountsQuery(undefined);
    const { data: vat } = useGetAccountingVatQuery("");

    const stats = [
        { title: "Total Cash", value: `£${banks?.data?.reduce((acc: number, b: { balance: number }) => acc + b.balance, 0).toLocaleString() || '0.00'}`, icon: <FiDollarSign />, color: "bg-blue-500", trend: "+12.5%", trendUp: true },
        { title: "Pending VAT", value: `£${vat?.data?.[0]?.rate || '0'}%`, icon: <FiPieChart />, color: "bg-purple-500", trend: "Due in 14 days", trendUp: null },
        { title: "Invoice Revenue", value: "£45,280", icon: <FiTrendingUp />, color: "bg-green-500", trend: "+8.2%", trendUp: true },
        { title: "Total Expenses", value: "£12,450", icon: <FiTrendingDown />, color: "bg-red-500", trend: "-2.4%", trendUp: false },
    ];

    const [activeGraph, setActiveGraph] = useState<"cashflow" | "profit">("cashflow");

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                                {stat.icon}
                            </div>
                            {stat.trendUp !== null && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.trendUp ? '▲' : '▼'} {stat.trend}
                                </span>
                            )}
                        </div>
                        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider dark:text-gray-400">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph Area */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Financial Insights</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Real-time tracking of business performance</p>
                        </div>
                        <div className="flex bg-gray-50 p-1.5 rounded-xl dark:bg-gray-700">
                            <button
                                onClick={() => setActiveGraph("cashflow")}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeGraph === 'cashflow' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600' : 'text-gray-500'}`}
                            >
                                Cashflow
                            </button>
                            <button
                                onClick={() => setActiveGraph("profit")}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeGraph === 'profit' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600' : 'text-gray-500'}`}
                            >
                                Profitability
                            </button>
                        </div>
                    </div>

                    <div className="h-72 w-full bg-gray-50/50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-600">
                        <div className="text-center">
                            <FiPieChart className="text-gray-300 text-4xl mx-auto mb-3" />
                            <p className="text-xs text-gray-400 font-medium">Chart visualization would render here using Chart.js</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-900/20">
                        <FiCalendar className="text-3xl mb-4 opacity-50" />
                        <h4 className="text-sm font-bold uppercase tracking-widest opacity-80">Next VAT Deadline</h4>
                        <p className="text-2xl font-bold mt-2">15 May 2026</p>
                        <p className="text-xs mt-4 opacity-70">Estimated amount due based on current VAT Summary report.</p>
                        <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl text-xs font-bold transition-all backdrop-blur-sm border border-white/20">
                            Prepare Submission
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Recent Alerts</h4>
                        <div className="space-y-4">
                            {[
                                { msg: "Bank feed connection expiring", time: "2h ago", type: "warning" },
                                { msg: "3 Overdue invoices detected", time: "5h ago", type: "error" },
                                { msg: "Payroll period locked", time: "1d ago", type: "success" },
                            ].map((alert, idx) => (
                                <div key={idx} className="flex gap-4 items-start border-b border-gray-50 pb-4 dark:border-gray-700 last:border-0">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-green-500'}`} />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{alert.msg}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountingOverview;
