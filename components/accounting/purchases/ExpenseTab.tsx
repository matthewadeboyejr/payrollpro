import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useGetAccountingExpensesQuery,
  useAccountingExpensesMutation,
  useUpdateAccountingExpensesMutation,
  useGetAccountingExpensesByIdQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface ExpenseTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

import FileUploadInput from "@/components/ui/FileUploadInput";

const ExpenseTab = ({ isModalOpen, onCloseModal }: ExpenseTabProps) => {
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [viewModeExpense, setViewModeExpense] = useState(false);
  const [openExpenseMenuId, setOpenExpenseMenuId] = useState<number | null>(null);

  const { data: expenses, isLoading: isLoadingExpenses, refetch: refetchExpenses } = useGetAccountingExpensesQuery({
    fromDate: "",
    toDate: ""
  });
  const { data: singleExpense, isLoading: isLoadingSingleExpense } = useGetAccountingExpensesByIdQuery(editingExpenseId as number, { skip: !editingExpenseId });

  const [addExpense, { isLoading: isAddingExpense }] = useAccountingExpensesMutation();
  const [updateExpense, { isLoading: isUpdatingExpense }] = useUpdateAccountingExpensesMutation();
  const { deleteAccountingExpenseAction } = useAction();

  const onExpenseSubmit = async (values: Record<string, unknown>) => {
    try {
      const formData = new FormData();
      
      // Basic fields
      formData.append("category", values.category as string || "");
      formData.append("description", values.description as string || "");
      formData.append("amount", String(values.amount || 0));
      formData.append("currency", values.currency as string || "GBP");
      
      const expenseDate = values.expenseDate ? new Date(values.expenseDate as string).toISOString() : new Date().toISOString();
      formData.append("expenseDate", expenseDate);

      // Attachment field
      if (values.attachment instanceof File) {
        formData.append("attachment", values.attachment);
      }

      await addExpense(formData).unwrap();
      showAlert("Success", "Expense recorded successfully", "success");
      onCloseModal();
      refetchExpenses();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to record expense", "error");
    }
  };

  const onEditExpenseSubmit = async (values: Record<string, unknown>) => {
    try {
      const formData = new FormData();
      
      formData.append("category", values.category as string || "");
      formData.append("description", values.description as string || "");
      formData.append("amount", String(values.amount || 0));
      formData.append("currency", values.currency as string || "GBP");
      
      const expenseDate = values.expenseDate ? new Date(values.expenseDate as string).toISOString() : new Date().toISOString();
      formData.append("expenseDate", expenseDate);

      if (values.attachment instanceof File) {
        formData.append("attachment", values.attachment);
      }

      await updateExpense({ id: editingExpenseId as number, data: formData }).unwrap();
      showAlert("Success", "Expense updated", "success");
      setEditingExpenseId(null);
      refetchExpenses();
    } catch { showAlert("Error", "Update failed", "error"); }
  };

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Category</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Description</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Amount</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center dark:text-gray-400">Receipt</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingExpenses ? (
            <tr><td colSpan={6}><TableSkeleton columns={6} showSearch={false} showAddButton={false} /></td></tr>
          ) : expenses?.data?.length > 0 ? (
            expenses.data.map((ex: { id: number; expenseDate: string; category: string; description: string; amount: number; attachmentUrl?: string }) => (
              <tr key={ex.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(ex.expenseDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase dark:bg-blue-900/30 dark:text-blue-400">
                    {ex.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{ex.description}</td>
                <td className="p-4 text-sm font-bold text-gray-900 dark:text-white text-right">£{ex.amount?.toLocaleString()}</td>
                <td className="p-4 text-center">
                  {ex.attachmentUrl ? (
                    <a href={ex.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-medium dark:text-blue-400">
                      View
                    </a>
                  ) : <span className="text-gray-300 dark:text-gray-600">-</span>}
                </td>
                <td className="p-4 text-right relative">
                  <button onClick={() => setOpenExpenseMenuId(openExpenseMenuId === ex.id ? null : ex.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                    <FiMoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openExpenseMenuId === ex.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenExpenseMenuId(null)} />
                      <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setEditingExpenseId(ex.id); setViewModeExpense(true); setOpenExpenseMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View Details</button>
                        <button onClick={() => { setEditingExpenseId(ex.id); setViewModeExpense(false); setOpenExpenseMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                        <button onClick={() => { deleteAccountingExpenseAction(ex.id, refetchExpenses); setOpenExpenseMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} className="p-10 text-center text-gray-400 text-sm italic">No expenses found.</td></tr>
          )}
        </tbody>
      </table>

      {(isModalOpen || editingExpenseId) && (
        <Modal
          heading={viewModeExpense ? "Expense Details" : editingExpenseId ? "Edit Expense" : "Record Expense"}
          desc={viewModeExpense ? "Viewing recorded expense details." : editingExpenseId ? "Update expense information." : "Fill in the details to record a new business expense."}
          onClose={() => { if (editingExpenseId) setEditingExpenseId(null); else onCloseModal(); setViewModeExpense(false); }}
          onSubmit={() => { }}
          formId="expense-form"
          isSubmitting={editingExpenseId ? isUpdatingExpense : isAddingExpense}
          showSubmitBtn={!viewModeExpense}
          size="md"
        >
          {isLoadingSingleExpense && editingExpenseId ? <div className="p-10 text-center text-gray-500">Loading expense details...</div> : (
            <Form
              onSubmit={editingExpenseId ? onEditExpenseSubmit : onExpenseSubmit}
              initialValues={editingExpenseId ? {
                ...singleExpense?.data,
                expenseDate: singleExpense?.data?.expenseDate?.split('T')[0]
              } : { expenseDate: new Date().toISOString().split('T')[0] }}
              render={({ handleSubmit, form }) => (
                <form id="expense-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <TextInput label="Expense Date" name="expenseDate" type="date" form={form} readonly={viewModeExpense} />
                  <TextInput label="Category" name="category" form={form} placeholder="e.g. Utilities, Rent" readonly={viewModeExpense} />
                  <div className="col-span-2">
                    <TextInput label="Description" name="description" form={form} placeholder="Internet bill April..." readonly={viewModeExpense} />
                  </div>
                  <TextInput label="Amount" name="amount" type="number" form={form} placeholder="0.00" readonly={viewModeExpense} />
                  <SelectInput 
                    label="Currency" 
                    name="currency" 
                    form={form} 
                    readonly={viewModeExpense} 
                    options={[
                      { label: "GBP (£)", value: "GBP" },
                      { label: "USD ($)", value: "USD" },
                      { label: "EUR (€)", value: "EUR" },
                      { label: "NGN (₦)", value: "NGN" },
                    ]} 
                  />
                  <div className="col-span-2">
                    <FileUploadInput label="Attachment / Receipt" name="attachment" readonly={viewModeExpense} />
                  </div>
                </form>
              )}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default ExpenseTab;
