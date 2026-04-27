import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2, FiSend } from "react-icons/fi";
import {
  useGetAccountingInvoicesQuery,
  useAccountingInvoicesMutation,
  useUpdateAccountingInvoicesMutation,
  useGetAccountingInvoicesByIdQuery,
  useGetAccountingCustomersQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface InvoiceTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  statusFilter: string;
  customersId: string | number;
}

const InvoiceTab = ({ isModalOpen, onCloseModal, statusFilter, customersId }: InvoiceTabProps) => {
  const [editingInvoiceId, setEditingInvoiceId] = useState<number | null>(null);
  const [viewModeInvoice, setViewModeInvoice] = useState(false);
  const [openInvoiceMenuId, setOpenInvoiceMenuId] = useState<number | null>(null);
  const { data: invoices, isLoading: isLoadingInvoices, refetch: refetchInvoices } = useGetAccountingInvoicesQuery({
    customerId: customersId,
    status: statusFilter
  });
  const { data: customers } = useGetAccountingCustomersQuery("");
  const { data: singleInvoice, isLoading: isLoadingSingleInvoice } = useGetAccountingInvoicesByIdQuery(editingInvoiceId as number, { skip: !editingInvoiceId });
  const [addInvoice, { isLoading: isAddingInvoice }] = useAccountingInvoicesMutation();
  const [updateInvoice, { isLoading: isUpdatingInvoice }] = useUpdateAccountingInvoicesMutation();
  const { deleteAccountingInvoiceAction, sendAccountingInvoiceAction, isSendingAccountingInvoice } = useAction();

  const onInvoiceSubmit = async (values: Record<string, unknown>) => {
    try {
      const invoiceData = {
        ...values,
        customerId: Number(values.customerId),
        lines: [
          {
            description: values.description,
            quantity: Number(values.quantity),
            unitPrice: Number(values.unitPrice)
          }
        ]
      };
      await addInvoice(invoiceData).unwrap();
      showAlert("Success", "Invoice created successfully", "success");
      onCloseModal();
      refetchInvoices();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to create invoice", "error");
    }
  };

  const onEditInvoiceSubmit = async (values: Record<string, unknown>) => {
    try {
      await updateInvoice({ id: editingInvoiceId as number, data: { ...values, totalAmount: Number(values.totalAmount) } }).unwrap();
      showAlert("Success", "Invoice updated", "success");
      setEditingInvoiceId(null);
      refetchInvoices();
    } catch (error: unknown) {
      const err = error as { message?: string };
      showAlert("Error", err?.message || "Failed to update invoice", "error");
    }
  };

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Invoice #</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Customer</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Total</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Paid</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Balance</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingInvoices ? (
            <tr><td colSpan={8}><TableSkeleton columns={8} showSearch={false} showAddButton={false} /></td></tr>
          ) : invoices?.data?.length > 0 ? (
            invoices.data.map((inv: { id: number; invoiceNo: string; customerName: string; invoiceDate: string; status: string; totalAmount: number; paidAmount: number; balance: number }) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-sm font-medium text-blue-600 dark:text-blue-400">#{inv.invoiceNo}</td>
                <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{inv.customerName}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold text-gray-900 dark:text-white text-right">£{inv.totalAmount?.toLocaleString()}</td>
                <td className="p-4 text-sm font-medium text-green-600 text-right">£{inv.paidAmount?.toLocaleString()}</td>
                <td className={`p-4 text-sm font-bold text-right ${inv.balance > 0 ? 'text-amber-600' : 'text-gray-400'}`}>£{inv.balance?.toLocaleString()}</td>
                <td className="p-4 text-right relative">
                  <button onClick={() => setOpenInvoiceMenuId(openInvoiceMenuId === inv.id ? null : inv.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                    <FiMoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openInvoiceMenuId === inv.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenInvoiceMenuId(null)} />
                      <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setEditingInvoiceId(inv.id); setViewModeInvoice(true); setOpenInvoiceMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View</button>
                        <button onClick={() => { setEditingInvoiceId(inv.id); setViewModeInvoice(false); setOpenInvoiceMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                        <button onClick={() => { sendAccountingInvoiceAction(inv.id, refetchInvoices); setOpenInvoiceMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiSend size={14} /> {isSendingAccountingInvoice ? "Sending..." : "Send"}</button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                        <button onClick={() => { deleteAccountingInvoiceAction(inv.id, refetchInvoices); setOpenInvoiceMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={8} className="p-10 text-center text-gray-400 text-sm italic">No invoices found.</td></tr>
          )}
        </tbody>
      </table>

      {(isModalOpen || editingInvoiceId) && (
        <Modal
          heading={viewModeInvoice ? "Invoice Details" : editingInvoiceId ? "Edit Invoice" : "Create New Invoice"}
          desc={viewModeInvoice ? `Viewing Invoice #${singleInvoice?.data?.invoiceNumber}` : editingInvoiceId ? "Update existing invoice details." : "Fill in the details to create a new customer invoice."}
          onClose={() => { if (editingInvoiceId) setEditingInvoiceId(null); else onCloseModal(); setViewModeInvoice(false); }}
          onSubmit={() => { }}
          formId="invoice-form"
          isSubmitting={editingInvoiceId ? isUpdatingInvoice : isAddingInvoice}
          showSubmitBtn={!viewModeInvoice}
          size="lg"
        >
          {isLoadingSingleInvoice && editingInvoiceId ? <div className="p-10 text-center text-gray-500">Loading invoice details...</div> : (
            <Form
              onSubmit={editingInvoiceId ? onEditInvoiceSubmit : onInvoiceSubmit}
              initialValues={editingInvoiceId ? {
                ...singleInvoice?.data,
                invoiceDate: singleInvoice?.data?.invoiceDate?.split('T')[0],
                dueDate: singleInvoice?.data?.dueDate?.split('T')[0],
                description: singleInvoice?.data?.lines?.[0]?.description,
                quantity: singleInvoice?.data?.lines?.[0]?.quantity,
                unitPrice: singleInvoice?.data?.lines?.[0]?.unitPrice,
              } : { invoiceDate: new Date().toISOString().split('T')[0] }}
              render={({ handleSubmit, form }) => (
                <form id="invoice-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <SelectInput label="Customer" name="customerId" form={form} readonly={viewModeInvoice} options={customers?.data?.map((c: { name: string; id: string }) => ({ label: c.name, value: c.id })) || []} />
                  <TextInput label="Invoice Date" name="invoiceDate" type="date" form={form} readonly={viewModeInvoice} />
                  <TextInput label="Due Date" name="dueDate" type="date" form={form} readonly={viewModeInvoice} />
                  <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-700 mt-2">
                    <h4 className="text-xs font-bold uppercase mb-4 dark:text-gray-300 tracking-wider">Line Items</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-2"><TextInput label="Description" name="description" form={form} placeholder="Services rendered..." readonly={viewModeInvoice} /></div>
                      <TextInput label="Quantity" name="quantity" type="number" form={form} placeholder="1" readonly={viewModeInvoice} />
                      <TextInput label="Unit Price" name="unitPrice" type="number" form={form} placeholder="0.00" readonly={viewModeInvoice} />
                    </div>
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

export default InvoiceTab;
