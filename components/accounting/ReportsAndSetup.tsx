import { useState } from "react";
import {
  FiSettings,
  FiLock,
  FiBarChart2,
  FiPlus,
  FiDownload,
  FiSearch,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
  FiClipboard,
  FiPieChart,
} from "react-icons/fi";
import {
  useGetAccountingBankAccountsQuery,
  useAccountingBankAccountsMutation,
  useUpdateAccountingBankAccountMutation,
  useGetAccountingBankAccountByIdQuery,
  useGetAccountingVatQuery,
  useAccountingVatMutation,
  useUpdateAccountingVatMutation,
  useGetAccountingVatByIdQuery,
  useGetAccountingPeriodsQuery,
  useUpdateAccountingPeriodsMutation,
  useGetAccountingJournalsQuery,
  useAccountingJournalsMutation,
  useGetAccountingRecurringTemplatesQuery,
  useAccountingRecurringTemplatesMutation,
  useAccountingReportsMutation,
  useAgedReceivablesReportsMutation,
  useAgedPayablesReportsMutation,
  useLazyGetAccountingVatSummaryQuery,
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";
import Swal from "sweetalert2";
import AuditLogTab from "./AuditLogTab";

interface VatSummaryReport {
  data: {
    periodLabel: string;
    salesNet: number;
    salesVat: number;
    purchasesNet: number;
    purchasesVat: number;
    netVatPayable: number;
  };
  params: {
    fromDate: string;
    toDate: string;
    salesVatRate?: number;
    purchaseVatRate?: number;
  };
}

const ReportsAndSetup = () => {
  const [activeSubTab, setActiveSubTab] = useState<"reports" | "setup" | "automation" | "audit">("reports");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [reportData, setReportData] = useState<Record<string, unknown> | null>(null);

  const [accountSearch, setAccountSearch] = useState("");
  const [vatSearch, setVatSearch] = useState("");

  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);
  const [viewModeAccount, setViewModeAccount] = useState(false);
  const [openAccountMenuId, setOpenAccountMenuId] = useState<number | null>(null);

  const [editingVatId, setEditingVatId] = useState<number | null>(null);
  const [viewModeVat, setViewModeVat] = useState(false);
  const [openVatMenuId, setOpenVatMenuId] = useState<number | null>(null);

  const [editingPeriodId, setEditingPeriodId] = useState<string | null>(null);
  const [viewModePeriod, setViewModePeriod] = useState(false);
  const [openPeriodMenuId, setOpenPeriodMenuId] = useState<string | null>(null);

  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Queries
  const { data: accounts, isLoading: isLoadingAccounts, refetch: refetchAccounts } = useGetAccountingBankAccountsQuery(undefined);
  const { data: singleAccount, isLoading: isLoadingSingleAccount } = useGetAccountingBankAccountByIdQuery(editingAccountId as number, { skip: !editingAccountId || editingAccountId === -1 });

  const { data: vatCodes, isLoading: isLoadingVat, refetch: refetchVat } = useGetAccountingVatQuery("");
  const { data: singleVat, isLoading: isLoadingSingleVat } = useGetAccountingVatByIdQuery(editingVatId as number, { skip: !editingVatId || editingVatId === -1 });

  const { data: periods, isLoading: isLoadingPeriods, refetch: refetchPeriods } = useGetAccountingPeriodsQuery(undefined);
  const { data: recurringTemplates, isLoading: isLoadingTemplates, refetch: refetchTemplates } = useGetAccountingRecurringTemplatesQuery(undefined);
  useGetAccountingJournalsQuery({ fromDate: "", toDate: "" });

  // Mutations
  const [addAccount, { isLoading: isAddingAccount }] = useAccountingBankAccountsMutation();
  const [updateAccount, { isLoading: isUpdatingAccount }] = useUpdateAccountingBankAccountMutation();
  const [addVat, { isLoading: isAddingVat }] = useAccountingVatMutation();
  const [updateVat, { isLoading: isUpdatingVat }] = useUpdateAccountingVatMutation();
  const [addJournal, { isLoading: isAddingJournal }] = useAccountingJournalsMutation();
  const [addTemplate] = useAccountingRecurringTemplatesMutation();

  const [generateReport, { isLoading: isGeneratingReport }] = useAccountingReportsMutation();
  const [generateAgedReceivables, { isLoading: isGeneratingAR }] = useAgedReceivablesReportsMutation();
  const [generateAgedPayables, { isLoading: isGeneratingAP }] = useAgedPayablesReportsMutation();
  const [triggerVatSummary, { isLoading: isGeneratingVat }] = useLazyGetAccountingVatSummaryQuery();

  const {
    deleteAccountingBankAccountAction,
    deleteAccountingVatAction,
    lockAccountingPeriodAction,
    deleteAccountingPeriodAction
  } = useAction();

  // Handlers
  const onAccountSubmit = async (values: Record<string, unknown>) => {
    try {
      if (editingAccountId === -1) {
        await addAccount(values).unwrap();
        showAlert("Success", "Account added to CoA", "success");
      } else {
        await updateAccount({ id: editingAccountId as number, data: values }).unwrap();
        showAlert("Success", "Account updated", "success");
      }
      setEditingAccountId(null);
      refetchAccounts();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Operation failed", "error");
    }
  };

  const onVatSubmit = async (values: Record<string, unknown>) => {
    try {
      const vatData = { ...values, ratePercent: Number(values.ratePercent) };
      if (editingVatId === -1) {
        await addVat(vatData).unwrap();
        showAlert("Success", "VAT code created", "success");
      } else {
        await updateVat({ id: editingVatId as number, data: vatData }).unwrap();
        showAlert("Success", "VAT code updated", "success");
      }
      setEditingVatId(null);
      refetchVat();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Operation failed", "error");
    }
  };

  const onJournalSubmit = async (values: Record<string, unknown>) => {
    try {
      const journalData = {
        ...values,
        lines: [
          {
            accountId: Number(values.accountId),
            debit: Number(values.debit || 0),
            credit: Number(values.credit || 0),
            memo: values.memo
          }
        ]
      };
      await addJournal(journalData).unwrap();
      showAlert("Success", "Journal entry recorded", "success");
      setIsJournalModalOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to add journal", "error");
    }
  };

  const onDeletePeriodSubmit = async (yyyyMM: string) => {
    await deleteAccountingPeriodAction(yyyyMM, () => {
      refetchPeriods();
    });
  };

  const onLockSubmit = async (yyyyMM: string, reason?: string) => {
    await lockAccountingPeriodAction(yyyyMM, () => {
      refetchPeriods();
    }, reason);
  };

  const onReportSubmit = async (values: Record<string, unknown>) => {
    try {
      let result;
      if (selectedReportId === 'pl') {
        result = await generateReport({ fromDate: values.fromDate as string, toDate: values.toDate as string }).unwrap();
      } else if (selectedReportId === 'ar') {
        result = await generateAgedReceivables(values.asOfDate as string).unwrap();
      } else if (selectedReportId === 'ap') {
        result = await generateAgedPayables(values.asOfDate as string).unwrap();
      } else if (selectedReportId === 'vat') {
        const vatParams = {
          fromDate: values.fromDate as string,
          toDate: values.toDate as string,
          salesVatRate: values.salesVatRate ? Number(values.salesVatRate) : undefined,
          purchaseVatRate: values.purchaseVatRate ? Number(values.purchaseVatRate) : undefined
        };
        const res = await triggerVatSummary(vatParams).unwrap();
        result = { data: res.data, params: vatParams };
      }
      setReportData(result as unknown as Record<string, unknown>);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to generate report", "error");
    }
  };

  const [updatePeriodLock, { isLoading: isUpdatingPeriodLock }] = useUpdateAccountingPeriodsMutation();

  const onPeriodSubmit = async (values: Record<string, unknown>) => {
    try {
      const yyyyMM = `${values.year}${values.month?.toString().padStart(2, '0')}`;
      await updatePeriodLock({ yyyyMM, reason: values.reason as string }).unwrap();
      showAlert("Success", "Period lock details updated", "success");
      setEditingPeriodId(null);
      refetchPeriods();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to update period lock", "error");
    }
  };

  const onTemplateSubmit = async (values: Record<string, unknown>) => {
    try {
      await addTemplate({
        ...values,
        frequencyInterval: Number(values.frequencyInterval),
        payloadJson: values.payloadJson as string || "{}"
      }).unwrap();
      showAlert("Success", "Recurring template created", "success");
      setIsTemplateModalOpen(false);
      refetchTemplates();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to create template", "error");
    }
  };

  const reportTypes = [
    { id: "pl", title: "Profit & Loss", description: "View your income, expenses, and net profit for a specific period.", icon: <FiBarChart2 className="text-green-500" /> },
    { id: "bs", title: "Balance Sheet", description: "A snapshot of your assets, liabilities, and equity.", icon: <FiClipboard className="text-blue-500" /> },
    { id: "ar", title: "Aged Receivables", description: "Analysis of unpaid customer invoices by age.", icon: <FiPieChart className="text-purple-500" /> },
    { id: "ap", title: "Aged Payables", description: "Analysis of unpaid supplier bills by age.", icon: <FiPieChart className="text-orange-500" /> },
    { id: "vat", title: "VAT Return", description: "Detailed VAT breakdown for HMRC reporting.", icon: <FiSettings className="text-yellow-600" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-gray-700 w-fit">
        <button
          onClick={() => setActiveSubTab("reports")}
          className={`px-6 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeSubTab === 'reports' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <FiBarChart2 /> Financial Reports
        </button>
        <button
          onClick={() => setActiveSubTab("setup")}
          className={`px-6 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeSubTab === 'setup' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <FiSettings /> Accounting Setup
        </button>
        <button
          onClick={() => setActiveSubTab("automation")}
          className={`px-6 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeSubTab === 'automation' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <FiLock /> Automation
        </button>
        <button
          onClick={() => setActiveSubTab("audit")}
          className={`px-6 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeSubTab === 'audit' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <FiClipboard /> Audit Log
        </button>
      </div>

      {activeSubTab === "reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-md shadow-sm border border-transparent hover:border-blue-200 transition-all dark:bg-gray-800 dark:hover:border-blue-900 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  {report.icon}
                </div>
                <h4 className="font-bold text-gray-900 flex-1 dark:text-white uppercase tracking-wider text-sm">{report.title}</h4>
              </div>
              <p className="text-gray-500 text-xs mb-6 h-10 overflow-hidden dark:text-gray-400">{report.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedReportId(report.id);
                    setIsReportModalOpen(true);
                    setReportData(null);
                  }}
                  className="flex-1 text-blue-600 bg-blue-50 py-2 rounded font-bold text-xs hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 transition-colors"
                >
                  View Report
                </button>
                <button className="px-3 text-gray-400 hover:text-blue-600 border border-gray-100 rounded hover:border-blue-100 dark:border-gray-700 dark:hover:border-blue-900 transition-colors">
                  <FiDownload />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "setup" && (
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-widest flex items-center gap-2">
                <FiLock className="text-red-500" /> Fiscal Periods
              </h3>
              <button
                onClick={() => {
                  Swal.fire({
                    title: 'Lock New Period',
                    html: `
                      <div class="flex flex-col gap-4 text-left">
                        <div>
                          <label class="block text-xs font-bold text-gray-600 mb-1">Year (e.g. 2026)</label>
                          <input id="swal-year" class="swal2-input !m-0 !w-full" type="number" value="${new Date().getFullYear()}">
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-gray-600 mb-1">Month (1-12)</label>
                          <input id="swal-month" class="swal2-input !m-0 !w-full" type="number" value="${new Date().getMonth() + 1}">
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-gray-600 mb-1">Reason</label>
                          <input id="swal-reason" class="swal2-input !m-0 !w-full" type="text" placeholder="Reason for locking">
                        </div>
                      </div>
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Lock Period',
                    preConfirm: () => {
                      const year = (document.getElementById('swal-year') as HTMLInputElement).value;
                      const month = (document.getElementById('swal-month') as HTMLInputElement).value;
                      const reason = (document.getElementById('swal-reason') as HTMLInputElement).value;
                      if (!year || !month || !reason) {
                        Swal.showValidationMessage('Please fill in all fields');
                        return false;
                      }
                      return { year, month, reason };
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const { year, month, reason } = result.value;
                      const yyyyMM = `${year}${month.toString().padStart(2, '0')}`;
                      onLockSubmit(yyyyMM, reason);
                    }
                  });
                }}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <FiPlus size={14} /> Lock Period
              </button>
            </div>
            <div className="bg-white rounded-md shadow-sm dark:bg-gray-800 pb-12">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                  <tr>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase dark:text-gray-400">Period</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase dark:text-gray-400">Locked By</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase dark:text-gray-400">Locked At</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase dark:text-gray-400">Reason</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase dark:text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingPeriods ? (
                    <tr><td colSpan={3}><TableSkeleton columns={3} showSearch={false} showAddButton={false} /></td></tr>
                  ) : periods?.data?.map((period: { id: number; year: number; month: number; lockedBy: string; lockedAt: string; reason: string }) => {
                    const yyyyMM = `${period.year}${period.month.toString().padStart(2, '0')}`;
                    return (
                      <tr key={period.id} className="border-b border-gray-50 dark:border-gray-700">
                        <td className="p-4 text-sm font-semibold dark:text-white uppercase">{period.year}-{period.month.toString().padStart(2, '0')}</td>
                        <td className="p-4 text-xs text-gray-500 dark:text-gray-400">{period.lockedBy}</td>
                        <td className="p-4 text-xs text-gray-500 dark:text-gray-400">{new Date(period.lockedAt).toLocaleDateString()}</td>
                        <td className="p-4 text-xs text-gray-500 dark:text-gray-400 italic">&quot;{period.reason}&quot;</td>
                        <td className="p-4 text-right relative">
                          <button
                            onClick={() => setOpenPeriodMenuId(openPeriodMenuId === period.id.toString() ? null : period.id.toString())}
                            className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
                          >
                            <FiMoreVertical size={16} className="text-gray-500" />
                          </button>
                          {openPeriodMenuId === period.id.toString() && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenPeriodMenuId(null)} />
                              <div className="absolute right-4 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                                <button onClick={() => { setEditingPeriodId(period.id.toString()); setViewModePeriod(true); setOpenPeriodMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={12} /> View</button>
                                <button onClick={() => { setEditingPeriodId(period.id.toString()); setViewModePeriod(false); setOpenPeriodMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 dark:hover:bg-blue-900/20"><FiEdit size={12} /> Edit</button>
                                <button onClick={() => { onDeletePeriodSubmit(yyyyMM); setOpenPeriodMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={12} /> Delete</button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-widest">Chart of Accounts</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={accountSearch}
                      onChange={(e) => setAccountSearch(e.target.value)}
                      className="pl-7 pr-2 py-1 text-[10px] bg-gray-50 border border-gray-100 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={() => { setEditingAccountId(-1); setViewModeAccount(false); }}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs font-bold"
                  >
                    <FiPlus /> Add Account
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm dark:bg-gray-800 max-h-80 overflow-y-auto pb-20">
                {isLoadingAccounts ? <TableSkeleton columns={2} showSearch={false} showAddButton={false} /> : (
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase">Code</th>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase">Account Name</th>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts?.data?.filter((a: { name: string; code: string }) =>
                        a.name.toLowerCase().includes(accountSearch.toLowerCase()) ||
                        a.code.includes(accountSearch)
                      ).map((acc: { id: number; name: string; code: string }) => (
                        <tr key={acc.id} className="border-b border-gray-50 dark:border-gray-700 transition-colors">
                          <td className="p-3 text-xs font-bold text-blue-600 dark:text-blue-400">{acc.code}</td>
                          <td className="p-3 text-xs dark:text-gray-300 font-medium uppercase">{acc.name}</td>
                          <td className="p-3 text-right relative">
                            <button
                              onClick={() => setOpenAccountMenuId(openAccountMenuId === acc.id ? null : acc.id)}
                              className="p-1.5 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
                            >
                              <FiMoreVertical size={14} className="text-gray-400" />
                            </button>
                            {openAccountMenuId === acc.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenAccountMenuId(null)} />
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                                  <button onClick={() => { setEditingAccountId(acc.id); setViewModeAccount(true); setOpenAccountMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={12} /> View</button>
                                  <button onClick={() => { setEditingAccountId(acc.id); setViewModeAccount(false); setOpenAccountMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 dark:hover:bg-blue-900/20"><FiEdit size={12} /> Edit</button>
                                  <button onClick={() => { deleteAccountingBankAccountAction(acc.id, refetchAccounts); setOpenAccountMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={12} /> Delete</button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-widest">VAT Codes</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                    <input
                      type="text"
                      placeholder="Search VAT..."
                      value={vatSearch}
                      onChange={(e) => setVatSearch(e.target.value)}
                      className="pl-7 pr-2 py-1 text-[10px] bg-gray-50 border border-gray-100 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsJournalModalOpen(true)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs font-bold"
                    >
                      <FiPlus /> Journal
                    </button>
                    <button
                      onClick={() => setEditingVatId(-1)}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1 text-xs font-bold"
                    >
                      <FiPlus /> VAT Code
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm dark:bg-gray-800 max-h-80 overflow-y-auto pb-20">
                {isLoadingVat ? <TableSkeleton columns={3} showSearch={false} showAddButton={false} /> : (
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase">Code</th>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase">Rate</th>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase">Description</th>
                        <th className="p-3 text-[10px] font-bold text-gray-500 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vatCodes?.data?.filter((v: { code: string; description: string }) =>
                        v.code.toLowerCase().includes(vatSearch.toLowerCase()) ||
                        v.description.toLowerCase().includes(vatSearch.toLowerCase())
                      ).map((vat: { id: number; code: string; rate: number; description: string }) => (
                        <tr key={vat.id} className="border-b border-gray-50 dark:border-gray-700 transition-colors">
                          <td className="p-3 text-xs font-bold text-gray-900 dark:text-white uppercase">{vat.code}</td>
                          <td className="p-3 text-xs font-bold text-green-600">{vat.rate}%</td>
                          <td className="p-3 text-xs text-gray-500 dark:text-gray-400 italic">{vat.description}</td>
                          <td className="p-3 text-right relative">
                            <button
                              onClick={() => setOpenVatMenuId(openVatMenuId === vat.id ? null : vat.id)}
                              className="p-1.5 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
                            >
                              <FiMoreVertical size={14} className="text-gray-400" />
                            </button>
                            {openVatMenuId === vat.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenVatMenuId(null)} />
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                                  <button onClick={() => { setEditingVatId(vat.id); setViewModeVat(true); setOpenVatMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={12} /> View</button>
                                  <button onClick={() => { setEditingVatId(vat.id); setViewModeVat(false); setOpenVatMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 dark:hover:bg-blue-900/20"><FiEdit size={12} /> Edit</button>
                                  <button onClick={() => { deleteAccountingVatAction(vat.id, refetchVat); setOpenVatMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={12} /> Delete</button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        </div>
      )}

      {activeSubTab === "automation" && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-md dark:bg-gray-800 shadow-sm border-l-4 border-blue-500 transition-all">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Scheduled Automation</h3>
              <p className="text-gray-500 text-xs mt-1 dark:text-gray-400">Manage recurring invoices, bills, and journal adjustments.</p>
            </div>
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm transition-all text-xs font-bold"
            >
              <FiPlus /> New Template
            </button>
          </div>

          <div className="bg-white rounded-md shadow-sm dark:bg-gray-800 overflow-hidden">
            {isLoadingTemplates ? <TableSkeleton columns={5} showSearch={false} showAddButton={false} /> : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                  <tr>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Template Name</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Frequency</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Next Run</th>
                    <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recurringTemplates?.data?.length > 0 ? recurringTemplates.data.map((tpl: { id: number; name: string; templateType: string; frequencyInterval: number; frequency: string; nextRunDate: string; isActive: boolean }) => (
                    <tr key={tpl.id} className="border-b border-gray-50 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="p-4 text-sm font-semibold dark:text-white">{tpl.name || 'Unnamed Template'}</td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 capitalize">{tpl.templateType}</td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 font-medium">Every {tpl.frequencyInterval} {tpl.frequency}(s)</td>
                      <td className="p-4 text-sm text-blue-600 dark:text-blue-400 font-bold">{new Date(tpl.nextRunDate).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tpl.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {tpl.isActive ? 'Active' : 'Paused'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400 text-sm italic">No recurring templates set up yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeSubTab === "audit" && <AuditLogTab />}

      {editingAccountId && (
        <Modal
          heading={viewModeAccount ? "Account Details" : (editingAccountId === -1 ? "Add Account to CoA" : "Edit Account")}
          desc={viewModeAccount ? "View ledger account information." : "Add or modify a ledger account in your Chart of Accounts."}
          onClose={() => setEditingAccountId(null)}
          onSubmit={() => { }}
          formId="account-form"
          isSubmitting={isAddingAccount || isUpdatingAccount}
          size="md"
          showSubmitBtn={!viewModeAccount}
        >
          {isLoadingSingleAccount && editingAccountId !== -1 ? <div className="p-10 text-center text-gray-500">Loading account details...</div> : (
            <Form
              onSubmit={onAccountSubmit}
              initialValues={editingAccountId === -1 ? {} : singleAccount?.data}
              render={({ handleSubmit, form }) => (
                <form id="account-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput label="Account Code" name="code" form={form} placeholder="e.g. 4000" readonly={viewModeAccount} />
                  <TextInput label="Account Name" name="name" form={form} placeholder="e.g. Sales Revenue" readonly={viewModeAccount} />
                  <SelectInput
                    label="Account Type"
                    name="type"
                    form={form}
                    readonly={viewModeAccount}
                    options={[
                      { label: "Asset", value: "Asset" },
                      { label: "Liability", value: "Liability" },
                      { label: "Equity", value: "Equity" },
                      { label: "Revenue", value: "Revenue" },
                      { label: "Expense", value: "Expense" },
                    ]}
                  />
                  <SelectInput
                    label="Currency"
                    name="currency"
                    form={form}
                    readonly={viewModeAccount}
                    options={[
                      { label: "GBP", value: "GBP" },
                      { label: "USD", value: "USD" },
                      { label: "EUR", value: "EUR" },
                    ]}
                  />
                </form>
              )}
            />
          )}
        </Modal>
      )}

      {editingPeriodId && (
        <Modal
          heading={viewModePeriod ? "Period Lock Details" : "Edit Period Lock"}
          desc={viewModePeriod ? "View details of this fiscal period lock." : "Update the details of this period lock."}
          onClose={() => setEditingPeriodId(null)}
          onSubmit={() => { }}
          formId="period-form"
          isSubmitting={isUpdatingPeriodLock}
          size="sm"
          showSubmitBtn={!viewModePeriod}
        >
          {(() => {
            const period = periods?.data?.find((p: { id: number; year: number; month: number }) => p.id.toString() === editingPeriodId);
            const yyyyMM = period ? `${period.year}${period.month.toString().padStart(2, '0')}` : "";
            return (
              <Form
                onSubmit={onPeriodSubmit}
                initialValues={{ ...period, yyyyMM }}
                render={({ handleSubmit, form }) => (
                  <form id="period-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextInput label="Period (yyyyMM)" name="yyyyMM" form={form} readonly={true} />
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput label="Locked By" name="lockedBy" form={form} readonly={true} />
                      <TextInput label="Locked At" name="lockedAt" form={form} readonly={true} />
                    </div>
                    <TextInput
                      label="Reason for Locking"
                      name="reason"
                      form={form}
                      readonly={viewModePeriod}
                      placeholder="Enter reason for this lock..."
                    />
                    {/* Hidden fields for onPeriodSubmit helper */}
                    <input type="hidden" name="year" value={period?.year} />
                    <input type="hidden" name="month" value={period?.month} />
                  </form>
                )}
              />
            );
          })()}
        </Modal>
      )}

      {editingVatId && (
        <Modal
          heading={viewModeVat ? "VAT Code Details" : (editingVatId === -1 ? "New VAT Code" : "Edit VAT Code")}
          desc={viewModeVat ? "View tax code configuration." : "Create or modify a tax code for sales or purchases."}
          onClose={() => setEditingVatId(null)}
          onSubmit={() => { }} // Form handles submit
          formId="vat-form"
          isSubmitting={isAddingVat || isUpdatingVat}
          size="md"
          showSubmitBtn={!viewModeVat}
        >
          {isLoadingSingleVat && editingVatId !== -1 ? <div className="p-10 text-center text-gray-500">Loading VAT details...</div> : (
            <Form
              onSubmit={onVatSubmit}
              initialValues={editingVatId === -1 ? {} : singleVat?.data}
              render={({ handleSubmit, form }) => (
                <form id="vat-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput label="VAT Code" name="code" form={form} placeholder="e.g. S (Standard)" readonly={viewModeVat} />
                  <TextInput label="Rate (%)" name="ratePercent" type="number" form={form} placeholder="20" readonly={viewModeVat} />
                  <div className="col-span-2">
                    <TextInput label="Description" name="name" form={form} placeholder="Standard 20% VAT" readonly={viewModeVat} />
                  </div>
                  <div className="col-span-2 flex gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="isDefaultSales" id="isDefaultSales" className="rounded" disabled={viewModeVat} />
                      <label htmlFor="isDefaultSales" className="text-sm dark:text-gray-300">Default for Sales</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="isDefaultPurchase" id="isDefaultPurchase" className="rounded" disabled={viewModeVat} />
                      <label htmlFor="isDefaultPurchase" className="text-sm dark:text-gray-300">Default for Purchases</label>
                    </div>
                  </div>
                </form>
              )}
            />
          )}
        </Modal>
      )}

      {/* Lock Period logic handled by useAction SweetAlert */}

      {isReportModalOpen && (
        <Modal
          heading={reportTypes.find(r => r.id === selectedReportId)?.title || "Report Viewer"}
          desc="Generate and view financial insights."
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={() => { }} // Form handles submit
          formId="report-form"
          isSubmitting={isGeneratingReport || isGeneratingAR || isGeneratingAP || isGeneratingVat}
          size="lg"
          showSubmitBtn={false}
          showCancelBtn={false}

        >
          {!reportData ? (
            <Form
              onSubmit={onReportSubmit}
              render={({ handleSubmit, form }) => (
                <form id="report-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedReportId === 'pl' || selectedReportId === 'vat' ? (
                    <>
                      <TextInput label="From Date" name="fromDate" type="date" form={form} />
                      <TextInput label="To Date" name="toDate" type="date" form={form} />
                      {selectedReportId === 'vat' && (
                        <>
                          <TextInput label="Sales VAT Rate (%)" name="salesVatRate" type="number" form={form} placeholder="20" />
                          <TextInput label="Purchase VAT Rate (%)" name="purchaseVatRate" type="number" form={form} placeholder="20" />
                        </>
                      )}
                    </>
                  ) : (
                    <TextInput label="As Of Date" name="asOfDate" type="date" form={form} />
                  )}
                  <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Generate Report</button>
                  </div>
                </form>
              )}
            />
          ) : (
            <div className="bg-gray-50 p-6 rounded-md dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
              {selectedReportId === 'vat' && reportData?.data ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-sm">VAT Return Summary</h4>
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:bg-gray-800">{String((reportData as unknown as VatSummaryReport).data.periodLabel)}</span>
                    </div>
                    {((reportData as unknown as VatSummaryReport).params) && (
                      <div className="flex gap-4 text-[10px] text-gray-500 font-medium italic">
                        {(reportData as unknown as VatSummaryReport).params.fromDate && <span>From: {String((reportData as unknown as VatSummaryReport).params.fromDate)}</span>}
                        {(reportData as unknown as VatSummaryReport).params.toDate && <span>To: {String((reportData as unknown as VatSummaryReport).params.toDate)}</span>}
                        {(reportData as unknown as VatSummaryReport).params.salesVatRate && <span className="text-blue-600">Sales Rate: {String((reportData as unknown as VatSummaryReport).params.salesVatRate)}%</span>}
                        {(reportData as unknown as VatSummaryReport).params.purchaseVatRate && <span className="text-orange-600">Purchase Rate: {String((reportData as unknown as VatSummaryReport).params.purchaseVatRate)}%</span>}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Sales (Outputs)</h5>
                      <div className="bg-white p-4 rounded border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex justify-between">
                        <span className="text-xs text-gray-500">Net Sales</span>
                        <span className="text-xs font-bold dark:text-white">£{Number((reportData as unknown as VatSummaryReport).data.salesNet).toLocaleString()}</span>
                      </div>
                      <div className="bg-white p-4 rounded border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex justify-between">
                        <span className="text-xs text-gray-500">VAT on Sales</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">£{Number((reportData as unknown as VatSummaryReport).data.salesVat).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Purchases (Inputs)</h5>
                      <div className="bg-white p-4 rounded border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex justify-between">
                        <span className="text-xs text-gray-500">Net Purchases</span>
                        <span className="text-xs font-bold dark:text-white">£{Number((reportData as unknown as VatSummaryReport).data.purchasesNet).toLocaleString()}</span>
                      </div>
                      <div className="bg-white p-4 rounded border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex justify-between">
                        <span className="text-xs text-gray-500">VAT on Purchases</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">£{Number((reportData as unknown as VatSummaryReport).data.purchasesVat).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-600 p-5 rounded-md flex justify-between items-center text-white shadow-lg shadow-blue-900/20">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Net VAT Payable</span>
                      <span className="text-2xl font-bold">£{Number((reportData as unknown as VatSummaryReport).data.netVatPayable).toLocaleString()}</span>
                    </div>
                    <FiDownload className="text-2xl opacity-50" />
                  </div>
                </div>
              ) : (
                <pre className="text-[10px] dark:text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </Modal>
      )}

      {isJournalModalOpen && (
        <Modal
          heading="New Journal Entry"
          desc="Record a manual double-entry adjustment."
          onClose={() => setIsJournalModalOpen(false)}
          onSubmit={() => { }} // Form handles submit
          formId="add-journal-form"
          isSubmitting={isAddingJournal}
          size="lg"
        >
          <Form
            onSubmit={onJournalSubmit}
            render={({ handleSubmit, form }) => (
              <form id="add-journal-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Entry Date" name="entryDate" type="date" form={form} />
                <TextInput label="Description" name="description" form={form} placeholder="e.g. Month-end adjustment" />
                <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-700 mt-2">
                  <h4 className="text-xs font-bold uppercase mb-2 dark:text-gray-300 tracking-wider">Lines (Single Entry)</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <SelectInput
                      label="Account"
                      name="accountId"
                      form={form}
                      options={accounts?.data?.map((a: { name: string; id: number }) => ({ label: a.name, value: a.id })) || []}
                    />
                    <TextInput label="Debit" name="debit" type="number" form={form} placeholder="0.00" />
                    <TextInput label="Credit" name="credit" type="number" form={form} placeholder="0.00" />
                    <TextInput label="Memo" name="memo" form={form} placeholder="..." />
                  </div>
                </div>
              </form>
            )}
          />
        </Modal>
      )}

      {isTemplateModalOpen && (
        <Modal
          heading="New Recurring Template"
          desc="Set up an automated recurring accounting entry."
          onClose={() => setIsTemplateModalOpen(false)}
          onSubmit={() => { }} // Form handles submit
          formId="add-template-form"
          isSubmitting={false}
          size="lg"
        >
          <Form
            onSubmit={onTemplateSubmit}
            render={({ handleSubmit, form }) => (
              <form id="add-template-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Template Name" name="name" form={form} placeholder="e.g. Monthly Rent" />
                <SelectInput
                  label="Type"
                  name="templateType"
                  form={form}
                  options={[
                    { label: "Invoice", value: "Invoice" },
                    { label: "Bill", value: "Bill" },
                    { label: "Journal", value: "Journal" },
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label="Every (Interval)" name="frequencyInterval" type="number" form={form} placeholder="1" />
                  <SelectInput
                    label="Frequency"
                    name="frequency"
                    form={form}
                    options={[
                      { label: "Day", value: "Day" },
                      { label: "Week", value: "Week" },
                      { label: "Month", value: "Month" },
                      { label: "Year", value: "Year" },
                    ]}
                  />
                </div>
                <TextInput label="Next Run Date" name="nextRunDate" type="date" form={form} />
                <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-700 mt-2">
                  <h4 className="text-xs font-bold uppercase mb-2 dark:text-gray-300 tracking-wider">Payload (JSON)</h4>
                  <TextInput label="" name="payloadJson" form={form} placeholder='{"customerId": 1, ...}' />
                </div>
              </form>
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default ReportsAndSetup;
