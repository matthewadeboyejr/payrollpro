import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useGetAccountingBillsQuery,
  useAccountingBillsMutation,
  useUpdateAccountingBillsMutation,
  useGetAccountingBillsByIdQuery,
  useGetAccountingSuppliersQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface BillTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  statusFilter: string;
  supplierId: string;
}

const BillTab = ({ isModalOpen, onCloseModal, statusFilter, supplierId }: BillTabProps) => {
  const [editingBillId, setEditingBillId] = useState<number | null>(null);
  const [viewModeBill, setViewModeBill] = useState(false);
  const [openBillMenuId, setOpenBillMenuId] = useState<number | null>(null);

  const { data: bills, isLoading: isLoadingBills, refetch: refetchBills } = useGetAccountingBillsQuery({
    supplierId: supplierId || "",
    status: statusFilter
  });
  const { data: suppliers } = useGetAccountingSuppliersQuery("");
  const { data: singleBill, isLoading: isLoadingSingleBill } = useGetAccountingBillsByIdQuery(editingBillId as number, { skip: !editingBillId });

  const [addBill, { isLoading: isAddingBill }] = useAccountingBillsMutation();
  const [updateBill, { isLoading: isUpdatingBill }] = useUpdateAccountingBillsMutation();
  const { deleteAccountingBillAction } = useAction();

  const onBillSubmit = async (values: Record<string, unknown>) => {
    try {
      const billData = {
        ...values,
        lines: [
          {
            description: values.description,
            quantity: Number(values.quantity),
            unitPrice: Number(values.unitPrice)
          }
        ]
      };
      await addBill(billData).unwrap();
      showAlert("Success", "Bill created successfully", "success");
      onCloseModal();
      refetchBills();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to create bill", "error");
    }
  };

  const onEditBillSubmit = async (values: Record<string, unknown>) => {
    try {
      await updateBill({ id: editingBillId as number, data: { ...values, totalAmount: Number(values.totalAmount) } }).unwrap();
      showAlert("Success", "Bill updated", "success");
      setEditingBillId(null);
      refetchBills();
    } catch {
      showAlert("Error", "Update failed", "error");
    }
  };

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Bill #</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Supplier</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Total</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingBills ? (
            <tr><td colSpan={6}><TableSkeleton columns={6} showSearch={false} showAddButton={false} /></td></tr>
          ) : bills?.data?.length > 0 ? (
            bills.data.map((bill: { id: number; billNo: string; reference: string; supplierName: string; billDate: string; status: string; totalAmount: number }) => (
              <tr key={bill.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-sm font-medium text-blue-600 dark:text-blue-400">#{bill.billNo || bill.reference || bill.id}</td>
                <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{bill.supplierName}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(bill.billDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${bill.status === 'Paid' ? 'bg-green-100 text-green-700' : bill.status === 'Recieved' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-600'}`}>
                    {bill.status}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold text-gray-900 dark:text-white text-right">£{bill.totalAmount.toLocaleString()}</td>
                <td className="p-4 text-right relative">
                  <button onClick={() => setOpenBillMenuId(openBillMenuId === bill.id ? null : bill.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                    <FiMoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openBillMenuId === bill.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenBillMenuId(null)} />
                      <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setEditingBillId(bill.id); setViewModeBill(true); setOpenBillMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View</button>
                        <button onClick={() => { setEditingBillId(bill.id); setViewModeBill(false); setOpenBillMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                        <button onClick={() => { deleteAccountingBillAction(bill.id, refetchBills); setOpenBillMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} className="p-10 text-center text-gray-400 text-sm italic">No bills found.</td></tr>
          )}
        </tbody>
      </table>

      {(isModalOpen || editingBillId) && (
        <Modal
          heading={viewModeBill ? "Bill Details" : editingBillId ? "Edit Bill" : "Create New Bill"}
          desc={viewModeBill ? `Viewing Bill Details` : editingBillId ? "Update existing bill details." : "Fill in the details to record a new supplier bill."}
          onClose={() => { if (editingBillId) setEditingBillId(null); else onCloseModal(); setViewModeBill(false); }}
          onSubmit={() => { }}
          formId="bill-form"
          isSubmitting={editingBillId ? isUpdatingBill : isAddingBill}
          showSubmitBtn={!viewModeBill}
          size="lg"
        >
          {isLoadingSingleBill && editingBillId ? <div className="p-10 text-center text-gray-500">Loading bill details...</div> : (
            <Form
              onSubmit={editingBillId ? onEditBillSubmit : onBillSubmit}
              initialValues={editingBillId ? {
                ...singleBill?.data,
                billDate: singleBill?.data?.billDate?.split('T')[0],
                dueDate: singleBill?.data?.dueDate?.split('T')[0],
                description: singleBill?.data?.lines?.[0]?.description,
                quantity: singleBill?.data?.lines?.[0]?.quantity,
                unitPrice: singleBill?.data?.lines?.[0]?.unitPrice,
              } : { billDate: new Date().toISOString().split('T')[0] }}
              render={({ handleSubmit, form }) => (
                <form id="bill-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <SelectInput label="Supplier" name="supplierId" form={form} readonly={viewModeBill} options={suppliers?.data?.map((s: { name: string; id: string }) => ({ label: s.name, value: s.id })) || []} />
                  <TextInput label="Bill/Reference #" name="reference" form={form} placeholder="REF-001" readonly={viewModeBill} />
                  <TextInput label="Bill Date" name="billDate" type="date" form={form} readonly={viewModeBill} />
                  <TextInput label="Due Date" name="dueDate" type="date" form={form} readonly={viewModeBill} />

                  <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-700 mt-2">
                    <h4 className="text-xs font-bold uppercase mb-4 dark:text-gray-300 tracking-wider">Line Items</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-2"><TextInput label="Description" name="description" form={form} placeholder="Inventory purchase..." readonly={viewModeBill} /></div>
                      <TextInput label="Quantity" name="quantity" type="number" form={form} placeholder="1" readonly={viewModeBill} />
                      <TextInput label="Unit Price" name="unitPrice" type="number" form={form} placeholder="0.00" readonly={viewModeBill} />
                    </div>
                  </div>

                  {editingBillId && (
                    <div className="col-span-2"><TextInput label="Total Amount" name="totalAmount" type="number" form={form} readonly={viewModeBill} /></div>
                  )}

                </form>
              )}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default BillTab;
