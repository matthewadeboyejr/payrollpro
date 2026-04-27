import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2, FiActivity } from "react-icons/fi";
import {
  useGetAccountingPaymentsQuery,
  useGetAccountingPaymentsByIdQuery,
  useAccountingPaymentsMutation,
  useUpdateAccountingPaymentsMutation,
  useAllocateAccountingPaymentsMutation,
  useGetAccountingInvoicesQuery,
  useGetAccountingBillsQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form, FormSpy } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import RadioInput from "@/components/ui/RadioInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface PaymentTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

const PaymentTab = ({ isModalOpen, onCloseModal }: PaymentTabProps) => {
  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null);
  const [viewModePayment, setViewModePayment] = useState(false);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [openPaymentMenuId, setOpenPaymentMenuId] = useState<number | null>(null);

  const { data: payments, isLoading: isLoadingPayments, refetch: refetchPaymentsData } = useGetAccountingPaymentsQuery({
    fromDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0]
  });
  const { data: singlePayment, isLoading: isLoadingSinglePayment } = useGetAccountingPaymentsByIdQuery(editingPaymentId as number, { skip: !editingPaymentId });
  const { data: invoices } = useGetAccountingInvoicesQuery({ customerId: "", status: "" });
  const { data: bills } = useGetAccountingBillsQuery({ supplierId: "", status: "" });

  const [addPayment, { isLoading: isAddingPayment }] = useAccountingPaymentsMutation();
  const [updatePayment, { isLoading: isUpdatingPayment }] = useUpdateAccountingPaymentsMutation();
  const [allocatePayment] = useAllocateAccountingPaymentsMutation();
  const { deleteAccountingPaymentAction } = useAction();

  const onPaymentSubmit = async (values: Record<string, unknown>) => {
    try {
      const paymentBody = {
        direction: values.direction as string,
        amount: Number(values.amount),
        paymentDate: values.paymentDate as string,
        reference: values.reference as string,
        notes: values.notes as string
      };

      if (editingPaymentId) {
        await updatePayment({ id: editingPaymentId, ...paymentBody }).unwrap();
      } else {
        await addPayment(paymentBody).unwrap();
      }

      showAlert("Success", editingPaymentId ? "Payment updated" : "Payment recorded", "success");
      if (editingPaymentId) setEditingPaymentId(null); else onCloseModal();
      setViewModePayment(false);
      refetchPaymentsData();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || `Failed to ${editingPaymentId ? 'update' : 'record'} payment`, "error");
    }
  };

  const onAllocateSubmit = async (values: Record<string, unknown>) => {
    try {
      const allocationData: Record<string, unknown> = {
        amount: Number(values.allocationAmount)
      };

      if (values.targetType === "invoice") {
        allocationData.invoiceId = Number(values.invoiceId);
      } else {
        allocationData.billId = Number(values.billId);
      }

      await allocatePayment({
        id: editingPaymentId as number,
        data: allocationData
      }).unwrap();

      showAlert("Success", "Payment allocated successfully", "success");
      setIsAllocateModalOpen(false);
      setEditingPaymentId(null);
      refetchPaymentsData();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Allocation failed", "error");
    }
  };

  return (
    <>
      <div className="overflow-x-auto pb-40">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Reference</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Direction</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Total Amount</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Allocated</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Unallocated</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingPayments ? (
              <tr><td colSpan={7}><TableSkeleton columns={7} showSearch={false} showAddButton={false} /></td></tr>
            ) : payments?.data?.length > 0 ? (
              payments.data.map((p: { id: number; paymentDate: string; reference: string; notes?: string; direction: string; amount: number; allocatedAmount: number; unallocatedAmount: number }) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white uppercase">{p.reference}</p>
                    {p.notes && <p className="text-[10px] text-gray-400 italic mt-0.5">{p.notes}</p>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${p.direction === 'In' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.direction}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-bold text-right ${p.direction === 'In' ? 'text-green-600' : 'text-red-600'}`}>
                    £{Number(p.amount).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-right text-blue-600 font-medium">£{Number(p.allocatedAmount || 0).toLocaleString()}</td>
                  <td className={`p-4 text-sm text-right font-medium ${Number(p.unallocatedAmount || 0) > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                    £{Number(p.unallocatedAmount || 0).toLocaleString()}
                  </td>
                  <td className="p-4 text-right relative">
                    <button onClick={() => setOpenPaymentMenuId(openPaymentMenuId === p.id ? null : p.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                      <FiMoreVertical size={16} className="text-gray-500" />
                    </button>
                    {openPaymentMenuId === p.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenPaymentMenuId(null)} />
                        <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                          <button onClick={() => { setEditingPaymentId(p.id); setViewModePayment(true); setOpenPaymentMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View Details</button>
                          <button onClick={() => { setEditingPaymentId(p.id); setViewModePayment(false); setOpenPaymentMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                          <button onClick={() => { setEditingPaymentId(p.id); setOpenPaymentMenuId(null); setIsAllocateModalOpen(true); }} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiActivity size={14} /> Allocate</button>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                          <button onClick={() => { deleteAccountingPaymentAction(p.id, refetchPaymentsData); setOpenPaymentMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="p-10 text-center text-gray-400 text-sm italic">No payments recorded in the last 30 days.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {(isModalOpen || editingPaymentId) && !isAllocateModalOpen && (
        <Modal
          heading={viewModePayment ? "Payment Details" : editingPaymentId ? "Edit Payment" : "Record Payment"}
          desc={viewModePayment ? "Viewing details of a recorded payment." : editingPaymentId ? "Update payment information." : "Record a new payment transaction."}
          onClose={() => { if (editingPaymentId) setEditingPaymentId(null); else onCloseModal(); setViewModePayment(false); }}
          onSubmit={() => { }}
          formId="payment-form"
          isSubmitting={editingPaymentId ? isUpdatingPayment : isAddingPayment}
          showSubmitBtn={!viewModePayment}
          size="md"
        >
          {isLoadingSinglePayment && editingPaymentId ? <div className="p-10 text-center text-gray-500">Loading payment details...</div> : (
            <Form
              onSubmit={onPaymentSubmit}
              initialValues={editingPaymentId ? {
                ...singlePayment?.data,
                paymentDate: singlePayment?.data?.paymentDate?.split('T')[0]
              } : { paymentDate: new Date().toISOString().split('T')[0], direction: 'In' }}
              render={({ handleSubmit, form }) => (
                <form id="payment-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectInput label="Direction" name="direction" form={form} readonly={viewModePayment} options={[{ label: "Incoming (Customer Receipt)", value: "In" }, { label: "Outgoing (Supplier Payment)", value: "Out" }]} />
                  <TextInput label="Payment Date" name="paymentDate" type="date" form={form} readonly={viewModePayment} />
                  <TextInput label="Amount" name="amount" type="number" form={form} placeholder="0.00" readonly={viewModePayment} />
                  <TextInput label="Reference" name="reference" form={form} placeholder="e.g. TRF-12345" readonly={viewModePayment} />
                  <div className="col-span-2"><TextInput label="Notes" name="notes" form={form} placeholder="..." readonly={viewModePayment} /></div>
                  {editingPaymentId && singlePayment?.data?.allocations?.length > 0 && (
                    <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-700 mt-2">
                      <h4 className="text-xs font-bold uppercase mb-2 dark:text-gray-300 tracking-wider">Current Allocations</h4>
                      <div className="bg-gray-50 rounded-md p-3 dark:bg-gray-700/50">
                        {singlePayment.data.allocations.map((alloc: { id: number; invoiceId?: number; billId?: number; amount: number }) => (
                          <div key={alloc.id} className="flex justify-between items-center text-xs border-b border-gray-100 last:border-0 py-2 dark:border-gray-600">
                            <span className="text-gray-600 dark:text-gray-400">{alloc.invoiceId ? `Invoice ID: ${alloc.invoiceId}` : `Bill ID: ${alloc.billId}`}</span>
                            <span className="font-bold text-blue-600">£{Number(alloc.amount).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </form>
              )}
            />
          )}
        </Modal>
      )}

      {isAllocateModalOpen && (
        <Modal
          heading="Allocate Payment"
          desc="Link this payment to an invoice or bill."
          onClose={() => { setIsAllocateModalOpen(false); setEditingPaymentId(null); }}
          onSubmit={() => { }}
          formId="allocate-payment-form"
          isSubmitting={false}
          size="lg"
        >
          {isLoadingSinglePayment ? <div className="p-10 text-center text-gray-500">Loading payment details...</div> : (
            <Form
              onSubmit={onAllocateSubmit}
              initialValues={{
                allocationAmount: singlePayment?.data?.unallocatedAmount,
                targetType: 'invoice'
              }}
              render={({ handleSubmit, form }) => (
                <form id="allocate-payment-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-700 dark:text-blue-300">Unallocated Balance:</span>
                      <span className="font-bold text-blue-800 dark:text-blue-200 text-lg">£{Number(singlePayment?.data?.unallocatedAmount || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                    <RadioInput
                      label="Allocate To"
                      name="targetType"
                      options={[
                        { label: "Customer Invoice", value: "invoice" },
                        { label: "Supplier Bill", value: "bill" }
                      ]}
                    />

                  </div>

                  <TextInput label="Allocation Amount" name="allocationAmount" type="number" form={form} placeholder="0.00" />

                  <div className="col-span-2">
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) => (
                        values?.targetType === 'invoice' ? (
                          <SelectInput
                            label="Select Invoice"
                            name="invoiceId"
                            form={form}
                            options={invoices?.data?.map((inv: { invoiceNo: string; customerName: string; balance: number; id: number }) => ({
                                label: `${inv.invoiceNo} - ${inv.customerName} (Bal: £${inv.balance})`,
                                value: inv.id
                              })) || []}
                          />
                        ) : (
                          <SelectInput
                            label="Select Bill"
                            name="billId"
                            form={form}
                            options={bills?.data?.map((bill: { billNo: string; supplierName: string; balance: number; id: number }) => ({
                                label: `${bill.billNo} - ${bill.supplierName} (Bal: £${bill.balance})`,
                                value: bill.id
                              })) || []}
                          />
                        )
                      )}
                    </FormSpy>
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

export default PaymentTab;
