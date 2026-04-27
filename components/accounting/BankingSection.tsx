import React, { useState } from "react";
import { FiPlus, FiList, FiRefreshCw, FiArrowRight, FiEye, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";
import {
  useGetAccountingBankAccountsQuery,
  useGetAccountingBankTransactionsQuery,
  useAccountingBankAccountsMutation,
  useAccountingBankTransactionsMutation,
  useGetAccountingBankTransactionsByIdQuery,
  useUpdateAccountingBankTransactionsMutation,
  useGetAccountingReconciliationsQuery,
  useGetAccountingReconciliationsByIdQuery,
  useUpdateAccountingReconciliationsMutation,
  useDeleteAccountingReconciliationsMutation,
  useAccountingReconciliationsMutation,
  useGetAccountingBankAccountByIdQuery,
  useUpdateAccountingBankAccountMutation
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "../ui/TableSkeleton";
import Modal from "../ui/Modal";
import { Form } from "react-final-form";
import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import { showAlert } from "../ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface BankAccount {
  id: number;
  name: string;
  bankName: string;
  sortCode: string;
  accountNumberMasked?: string;
  accountNumber?: string;
  accountType: string;
  balance: number;
}

interface Transaction {
  id: number;
  transactionDate: string;
  description: string;
  reference?: string;
  direction: string;
  amount: number;
}

interface Reconciliation {
  id: number;
  statementDate: string;
  statementBalance: number;
  systemBalance: number;
  difference: number;
}

const BankingSection = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isReconcileModalOpen, setIsReconcileModalOpen] = useState(false);
  const [editingRecId, setEditingRecId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [openRecMenuId, setOpenRecMenuId] = useState<number | null>(null);

  const [editingTxId, setEditingTxId] = useState<number | null>(null);
  const [isViewModeTx, setIsViewModeTx] = useState(false);
  const [openTxMenuId, setOpenTxMenuId] = useState<number | null>(null);

  const [editingBankId, setEditingBankId] = useState<number | null>(null);
  const [isViewModeBank, setIsViewModeBank] = useState(false);
  const [openBankMenuId, setOpenBankMenuId] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<"transactions" | "reconciliations">("transactions");

  const { data: bankAccounts, isLoading: isLoadingBanks, refetch: refetchBanks } = useGetAccountingBankAccountsQuery(undefined);
  const { data: transactions, isLoading: isLoadingTransactions, refetch: refetchTransactions } = useGetAccountingBankTransactionsQuery(selectedAccountId as number, {
    skip: !selectedAccountId,
  });
  const { data: reconciliations, isLoading: isLoadingReconciliations, refetch: refetchReconciliations } = useGetAccountingReconciliationsQuery(selectedAccountId as number, {
    skip: !selectedAccountId,
  });

  const [addBankAccount, { isLoading: isAdding }] = useAccountingBankAccountsMutation();
  const [addTransaction, { isLoading: isAddingTx }] = useAccountingBankTransactionsMutation();
  const [reconcileAccount, { isLoading: isReconciling }] = useAccountingReconciliationsMutation();
  const [updateReconciliation, { isLoading: isUpdatingRec }] = useUpdateAccountingReconciliationsMutation();
  useDeleteAccountingReconciliationsMutation();
  const { data: singleReconciliation, isLoading: isLoadingSingleRec } = useGetAccountingReconciliationsByIdQuery(editingRecId as number, {
    skip: !editingRecId,
  });

  const [updateBankTransaction, { isLoading: isUpdatingTx }] = useUpdateAccountingBankTransactionsMutation();
  const { data: singleTransaction, isLoading: isLoadingSingleTx } = useGetAccountingBankTransactionsByIdQuery(editingTxId as number, {
    skip: !editingTxId,
  });

  const [updateBankAccount, { isLoading: isUpdatingBank }] = useUpdateAccountingBankAccountMutation();
  const { data: singleBank, isLoading: isLoadingSingleBank } = useGetAccountingBankAccountByIdQuery(editingBankId as number, {
    skip: !editingBankId,
  });

  const { deleteReconciliationAction, deleteBankTransactionAction, deleteAccountingBankAccountAction } = useAction();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      await addBankAccount(values).unwrap();
      showAlert("Success", "Bank account added successfully", "success");
      setIsModalOpen(false);
      refetchBanks();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to add bank account", "error");
    }
  };

  const onTxSubmit = async (values: Record<string, unknown>) => {
    try {
      const txData = {
        ...values,
        bankAccountId: selectedAccountId,
        amount: Number(values.amount)
      };
      await addTransaction(txData).unwrap();
      showAlert("Success", "Transaction logged successfully", "success");
      setIsTxModalOpen(false);
      refetchTransactions();
      refetchBanks();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to log transaction", "error");
    }
  };


  const onReconcileSubmit = async (values: Record<string, unknown>) => {
    if (!selectedAccountId) return;
    try {
      await reconcileAccount({
        bankAccountId: selectedAccountId,
        statementDate: values.statementDate as string,
        statementBalance: Number(values.statementBalance)
      }).unwrap();
      showAlert("Success", "Account reconciled successfully", "success");
      setIsReconcileModalOpen(false);
      refetchReconciliations();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to reconcile account", "error");
    }
  };

  const onEditTxSubmit = async (values: Record<string, unknown>) => {
    if (!editingTxId) return;
    try {
      await updateBankTransaction({
        id: editingTxId,
        data: {
          ...values,
          amount: Number(values.amount)
        }
      }).unwrap();
      showAlert("Success", "Transaction updated", "success");
      setEditingTxId(null);
      refetchTransactions();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to update transaction", "error");
    }
  };

  const onDeleteTx = async (id: number) => {
    await deleteBankTransactionAction(id, () => {
      refetchTransactions();
      refetchBanks();
    });
  };

  const onEditRecSubmit = async (values: Record<string, unknown>) => {
    if (!editingRecId) return;
    try {
      await updateReconciliation({
        id: editingRecId,
        data: {
          ...values,
          statementBalance: Number(values.statementBalance)
        }
      }).unwrap();
      showAlert("Success", "Reconciliation updated", "success");
      setEditingRecId(null);
      refetchReconciliations();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to update reconciliation", "error");
    }
  };

  const onDeleteRec = async (id: number) => {
    await deleteReconciliationAction(id, () => {
      refetchReconciliations();
      refetchBanks();
    });
  };

  const onEditBankSubmit = async (values: Record<string, unknown>) => {
    if (!editingBankId) return;
    try {
      await updateBankAccount({
        id: editingBankId,
        data: values
      }).unwrap();
      showAlert("Success", "Bank account updated", "success");
      setEditingBankId(null);
      refetchBanks();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to update bank account", "error");
    }
  };

  const onDeleteBank = async (id: number) => {
    await deleteAccountingBankAccountAction(id, () => {
      refetchBanks();
      if (selectedAccountId === id) setSelectedAccountId(null);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-md dark:bg-gray-800 shadow-sm">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm flex items-center gap-2">
          <FiList className="text-blue-500" /> Bank Accounts
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="primary-btn flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <FiPlus /> Add Bank Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoadingBanks ? (
          <TableSkeleton columns={3} showSearch={false} showAddButton={false} />
        ) : (
          bankAccounts?.data?.map((account: BankAccount) => (
            <div
              key={account.id}
              onClick={() => setSelectedAccountId(account.id)}
              className={`p-5 rounded-md cursor-pointer transition-all border-2 relative ${selectedAccountId === account.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-transparent bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs">{account.name}</h4>
                  <p className="text-gray-500 text-xs mt-1 dark:text-gray-400">{account.accountNumberMasked || account.accountNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${account.accountType === 'Main' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {account.accountType}
                  </span>
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenBankMenuId(openBankMenuId === account.id ? null : account.id); }}
                      className="p-1 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiMoreVertical size={14} className="text-gray-500" />
                    </button>
                    {openBankMenuId === account.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenBankMenuId(null); }} />
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                          <button onClick={(e) => { e.stopPropagation(); setEditingBankId(account.id); setIsViewModeBank(true); setOpenBankMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View Details</button>
                          <button onClick={(e) => { e.stopPropagation(); setEditingBankId(account.id); setIsViewModeBank(false); setOpenBankMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                          <button onClick={(e) => { e.stopPropagation(); onDeleteBank(account.id); setOpenBankMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <p className="text-xl font-bold text-gray-900 dark:text-white">£{account.balance?.toLocaleString() || '0.00'}</p>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs font-semibold">
                  Transactions <FiArrowRight />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <Modal
          heading="Add Bank Account"
          desc="Create a new bank account in the accounting system."
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => { }} // Form handles submit
          formId="add-bank-account-form"
          isSubmitting={isAdding}
          size="md"
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
              <form id="add-bank-account-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <TextInput label="Account Name" name="name" form={form} placeholder="e.g. Operating Account" />
                </div>
                <TextInput label="Bank Name" name="bankName" form={form} placeholder="e.g. HSBC" />
                <TextInput label="Sort Code" name="sortCode" form={form} placeholder="e.g. 12-34-56" />
                <TextInput label="Account Number (Last 4 digits)" name="accountNumberMasked" form={form} placeholder="e.g. 1234" />
                <SelectInput
                  label="Currency"
                  name="currency"
                  form={form}
                  options={[
                    { label: "GBP (£)", value: "GBP" },
                    { label: "USD ($)", value: "USD" },
                    { label: "EUR (€)", value: "EUR" },
                  ]}
                />
                <TextInput label="Opening Balance" name="openingBalance" type="number" form={form} placeholder="0.00" />
              </form>
            )}
          />
        </Modal>
      )}

      {editingBankId && (
        <Modal
          heading={isViewModeBank ? "Bank Account Details" : "Edit Bank Account"}
          desc={isViewModeBank ? "Viewing bank account profile." : "Update bank account information."}
          onClose={() => setEditingBankId(null)}
          onSubmit={() => { }}
          formId="edit-bank-account-form"
          isSubmitting={isUpdatingBank}
          showSubmitBtn={!isViewModeBank}
          size="md"
        >
          {isLoadingSingleBank ? <div className="p-10 text-center text-sm text-gray-500">Loading account details...</div> : (
            <Form
              onSubmit={onEditBankSubmit}
              initialValues={singleBank?.data}
              render={({ handleSubmit, form }) => (
                <form id="edit-bank-account-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <TextInput label="Account Name" name="name" form={form} readonly={isViewModeBank} />
                  </div>
                  <TextInput label="Bank Name" name="bankName" form={form} readonly={isViewModeBank} />
                  <TextInput label="Sort Code" name="sortCode" form={form} readonly={isViewModeBank} />
                  <TextInput label="Account Number" name="accountNumberMasked" form={form} readonly={isViewModeBank} />
                  <div className="col-span-2">
                    <SelectInput
                      label="Account Type"
                      name="accountType"
                      form={form}
                      readonly={isViewModeBank}
                      options={[
                        { label: "Main Operating Account", value: "Main" },
                        { label: "Savings Account", value: "Savings" },
                        { label: "Tax/Reserved Account", value: "Tax" },
                        { label: "Credit Card", value: "Credit" },
                      ]}
                    />
                  </div>
                </form>
              )}
            />
          )}
        </Modal>
      )}

      {selectedAccountId && (
        <section className="bg-white rounded-md shadow-sm overflow-hidden dark:bg-gray-800">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Account Transactions</h3>
            <div className="flex gap-2">
              <div className="flex bg-gray-100 p-1 rounded dark:bg-gray-700 mr-2">
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${activeTab === 'transactions' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setActiveTab("reconciliations")}
                  className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${activeTab === 'reconciliations' ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Reconciliation History
                </button>
              </div>
              <button
                onClick={() => setIsTxModalOpen(true)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 transition-colors"
              >
                <FiPlus /> Log Transaction
              </button>
              <button
                onClick={() => setIsReconcileModalOpen(true)}
                className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 transition-colors"
              >
                <FiRefreshCw /> Reconcile
              </button>
              <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FiRefreshCw className={isLoadingTransactions || isLoadingReconciliations ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {activeTab === "transactions" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Description</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Reference</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 text-right">Amount</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingTransactions ? (
                    <tr><td colSpan={5}><TableSkeleton columns={5} showSearch={false} showAddButton={false} /></td></tr>
                  ) : transactions?.data?.length > 0 ? (
                    transactions.data.map((tx: Transaction & { transactionDate: string; direction: string }) => (
                      <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                        <td className="p-4 text-sm text-gray-900 font-medium dark:text-white">{tx.description}</td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{tx.reference || '-'}</td>
                        <td className={`p-4 text-sm font-bold text-right ${tx.direction === 'Out' ? 'text-red-500' : 'text-green-500'}`}>
                          {tx.direction === 'Out' ? '-' : '+'}£{Math.abs(tx.amount).toLocaleString()}
                        </td>
                        <td className="p-4 text-right relative">
                          <button
                            onClick={() => setOpenTxMenuId(openTxMenuId === tx.id ? null : tx.id)}
                            className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
                          >
                            <FiMoreVertical size={16} className="text-gray-500" />
                          </button>

                          {openTxMenuId === tx.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenTxMenuId(null)}
                              />
                              <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                                <button
                                  onClick={() => { setEditingTxId(tx.id); setIsViewModeTx(true); setOpenTxMenuId(null); }}
                                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  <FiEye size={14} /> View Details
                                </button>
                                <button
                                  onClick={() => { setEditingTxId(tx.id); setIsViewModeTx(false); setOpenTxMenuId(null); }}
                                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  <FiEdit2 size={14} /> Edit
                                </button>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                                <button
                                  onClick={() => { onDeleteTx(tx.id); setOpenTxMenuId(null); }}
                                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"
                                >
                                  <FiTrash2 size={14} /> Delete
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400 text-sm italic">
                        No transactions found for this account.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Statement Date</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Statement Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">System Balance</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Difference</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingReconciliations ? (
                    <tr><td colSpan={5}><TableSkeleton columns={5} showSearch={false} showAddButton={false} /></td></tr>
                  ) : reconciliations?.data ? (
                    (() => {
                      const recList = Array.isArray(reconciliations.data) ? reconciliations.data : [reconciliations.data];
                      return recList.map((rec: Reconciliation) => (
                        <tr key={rec.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(rec.statementDate).toLocaleDateString()}</td>
                          <td className="p-4 text-sm font-bold text-right text-gray-900 dark:text-white">£{rec.statementBalance.toLocaleString()}</td>
                          <td className="p-4 text-sm text-right text-gray-500 dark:text-gray-400">£{rec.systemBalance?.toLocaleString() || '0.00'}</td>
                          <td className={`p-4 text-sm font-bold text-right ${rec.difference !== 0 ? "text-red-500" : "text-green-600"}`}>
                            £{rec.difference?.toLocaleString() || '0.00'}
                          </td>
                          <td className="p-4 text-right relative">
                            <button
                              onClick={() => setOpenRecMenuId(openRecMenuId === rec.id ? null : rec.id)}
                              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors"
                            >
                              <FiMoreVertical size={16} className="text-gray-500" />
                            </button>

                            {openRecMenuId === rec.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setOpenRecMenuId(null)}
                                />
                                <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                                  <button
                                    onClick={() => { setEditingRecId(rec.id); setIsViewMode(true); setOpenRecMenuId(null); }}
                                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                                  >
                                    <FiEye size={14} /> View Details
                                  </button>
                                  <button
                                    onClick={() => { setEditingRecId(rec.id); setIsViewMode(false); setOpenRecMenuId(null); }}
                                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                                  >
                                    <FiEdit2 size={14} /> Edit
                                  </button>
                                  <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                                  <button
                                    onClick={() => { onDeleteRec(rec.id); setOpenRecMenuId(null); }}
                                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"
                                  >
                                    <FiTrash2 size={14} /> Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ));
                    })()
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400 text-sm italic">
                        No reconciliation history found for this account.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>


          {isTxModalOpen && (
            <Modal
              heading="Log Bank Transaction"
              desc="Manually record a transaction for this bank account."
              onClose={() => setIsTxModalOpen(false)}
              onSubmit={() => { }} // Form handles submit
              formId="log-tx-form"
              isSubmitting={isAddingTx}
              size="md"
            >
              <Form
                onSubmit={onTxSubmit}
                render={({ handleSubmit, form }) => (
                  <form id="log-tx-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput label="Transaction Date" name="transactionDate" type="date" form={form} />
                    <SelectInput
                      label="Direction"
                      name="direction"
                      form={form}
                      options={[
                        { label: "Incoming (Deposit)", value: "In" },
                        { label: "Outgoing (Payment)", value: "Out" },
                      ]}
                    />
                    <div className="col-span-2">
                      <TextInput label="Description" name="description" form={form} placeholder="e.g. Office Rent" />
                    </div>
                    <TextInput label="Reference (Optional)" name="reference" form={form} placeholder="e.g. INV-001" />
                    <TextInput label="Amount" name="amount" type="number" form={form} placeholder="0.00" />
                  </form>
                )}
              />
            </Modal>
          )}

          {isReconcileModalOpen && (
            <Modal
              heading="Reconcile Account"
              desc="Verify bank statement balance against system balance."
              onClose={() => setIsReconcileModalOpen(false)}
              onSubmit={() => { }} // Form handles submit
              formId="reconcile-account-form"
              isSubmitting={isReconciling}
              size="md"
            >
              <Form
                onSubmit={onReconcileSubmit}
                render={({ handleSubmit, form }) => (
                  <form id="reconcile-account-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput label="Statement Date" name="statementDate" type="date" form={form} />
                    <TextInput label="Statement Balance" name="statementBalance" type="number" form={form} placeholder="0.00" />                  </form>
                )}
              />
            </Modal>
          )}

          {editingTxId && (
            <Modal
              heading={isViewModeTx ? "Transaction Details" : "Edit Transaction"}
              desc={isViewModeTx ? "Viewing bank transaction record." : "Update the transaction details."}
              onClose={() => setEditingTxId(null)}
              onSubmit={() => { }}
              formId="edit-tx-form"
              isSubmitting={isUpdatingTx}
              showSubmitBtn={!isViewModeTx}
              size="md"
            >
              {isLoadingSingleTx ? (
                <div className="p-10 text-center text-sm text-gray-500">Loading details...</div>
              ) : (
                <Form
                  onSubmit={onEditTxSubmit}
                  initialValues={{
                    transactionDate: singleTransaction?.data?.transactionDate?.split('T')[0],
                    direction: singleTransaction?.data?.direction,
                    description: singleTransaction?.data?.description,
                    reference: singleTransaction?.data?.reference,
                    amount: singleTransaction?.data?.amount
                  }}
                  render={({ handleSubmit, form }) => (
                    <form id="edit-tx-form" onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <TextInput
                          label="Transaction Date"
                          name="transactionDate"
                          type="date"
                          form={form}
                          readonly={isViewModeTx}
                        />
                        <SelectInput
                          label="Direction"
                          name="direction"
                          form={form}
                          readonly={isViewModeTx}
                          options={[
                            { label: "Incoming (Deposit)", value: "In" },
                            { label: "Outgoing (Payment)", value: "Out" },
                          ]}
                        />
                      </div>
                      <TextInput
                        label="Description"
                        name="description"
                        form={form}
                        readonly={isViewModeTx}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <TextInput
                          label="Reference (Optional)"
                          name="reference"
                          form={form}
                          readonly={isViewModeTx}
                        />
                        <TextInput
                          label="Amount"
                          name="amount"
                          type="number"
                          form={form}
                          readonly={isViewModeTx}
                        />
                      </div>
                    </form>
                  )}
                />
              )}
            </Modal>
          )}

          {editingRecId && (
            <Modal
              heading={isViewMode ? "Reconciliation Details" : "Edit Reconciliation"}
              desc={isViewMode ? "Viewing reconciliation record." : "Update the statement balance for this record."}
              onClose={() => setEditingRecId(null)}
              onSubmit={() => { }}
              formId="edit-reconciliation-form"
              isSubmitting={isUpdatingRec}
              showSubmitBtn={!isViewMode}
              size="md"
            >
              {isLoadingSingleRec ? (
                <div className="p-10 text-center text-sm text-gray-500">Loading details...</div>
              ) : (
                <Form
                  onSubmit={onEditRecSubmit}
                  initialValues={{
                    statementDate: singleReconciliation?.data?.statementDate?.split('T')[0],
                    statementBalance: singleReconciliation?.data?.statementBalance
                  }}
                  render={({ handleSubmit, form }) => (
                    <form id="edit-reconciliation-form" onSubmit={handleSubmit} className="space-y-4">
                      <TextInput
                        label="Statement Date"
                        name="statementDate"
                        type="date"
                        form={form}
                        readonly={true}
                      />
                      <TextInput
                        label="Statement Balance"
                        name="statementBalance"
                        type="number"
                        form={form}
                        readonly={isViewMode}
                      />
                      {isViewMode && (
                        <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-md dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">System Balance</p>
                            <p className="text-lg font-bold dark:text-white">£{singleReconciliation?.data?.systemBalance?.toLocaleString() || '0.00'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Difference</p>
                            <p className={`text-lg font-bold ${singleReconciliation?.data?.difference !== 0 ? "text-red-500" : "text-green-600"}`}>
                              £{singleReconciliation?.data?.difference?.toLocaleString() || '0.00'}
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  )}
                />
              )}
            </Modal>
          )}
        </section>
      )}
    </div>
  );
};

export default BankingSection;
