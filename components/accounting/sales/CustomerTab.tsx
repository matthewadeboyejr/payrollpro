import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useGetAccountingCustomersQuery,
  useAccountingCustomersMutation,
  useUpdateAccountingCustomersMutation,
  useGetAccountingCustomersByIdQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface CustomerTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  search: string;
}

const CustomerTab = ({ isModalOpen, onCloseModal, search }: CustomerTabProps) => {
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
  const [viewModeCustomer, setViewModeCustomer] = useState(false);
  const [openCustomerMenuId, setOpenCustomerMenuId] = useState<number | null>(null);

  const { data: customers, isLoading: isLoadingCustomers, refetch: refetchCustomers } = useGetAccountingCustomersQuery(search);
  const { data: singleCustomer, isLoading: isLoadingSingleCustomer } = useGetAccountingCustomersByIdQuery(editingCustomerId as number, { skip: !editingCustomerId });

  const [addCustomer, { isLoading: isAddingCustomer }] = useAccountingCustomersMutation();
  const [updateCustomer, { isLoading: isUpdatingCustomer }] = useUpdateAccountingCustomersMutation();
  const { deleteAccountingCustomerAction } = useAction();

  const onCustomerSubmit = async (values: Record<string, unknown>) => {
    try {
      await addCustomer(values).unwrap();
      showAlert("Success", "Customer added successfully", "success");
      onCloseModal();
      refetchCustomers();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to add customer", "error");
    }
  };

  const onEditCustomerSubmit = async (values: Record<string, unknown>) => {
    try {
      await updateCustomer({ id: editingCustomerId as number, data: values }).unwrap();
      showAlert("Success", "Customer updated", "success");
      setEditingCustomerId(null);
      refetchCustomers();
    } catch { showAlert("Error", "Update failed", "error"); }
  };

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Email</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Phone</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingCustomers ? (
            <tr><td colSpan={4}><TableSkeleton columns={4} showSearch={false} showAddButton={false} /></td></tr>
          ) : customers?.data?.length > 0 ? (
            customers.data.map((c: { id: number; name: string; email: string; phone: string }) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{c.name}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{c.email}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{c.phone}</td>
                <td className="p-4 text-right relative">
                  <button onClick={() => setOpenCustomerMenuId(openCustomerMenuId === c.id ? null : c.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                    <FiMoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openCustomerMenuId === c.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenCustomerMenuId(null)} />
                      <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setEditingCustomerId(c.id); setViewModeCustomer(true); setOpenCustomerMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View Profile</button>
                        <button onClick={() => { setEditingCustomerId(c.id); setViewModeCustomer(false); setOpenCustomerMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                        <button onClick={() => { deleteAccountingCustomerAction(c.id, refetchCustomers); setOpenCustomerMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={4} className="p-10 text-center text-gray-400 text-sm italic">No customers found.</td></tr>
          )}
        </tbody>
      </table>

      {(isModalOpen || editingCustomerId) && (
        <Modal
          heading={viewModeCustomer ? "Customer Details" : editingCustomerId ? "Edit Customer" : "Add New Customer"}
          desc={viewModeCustomer ? "Viewing customer profile." : editingCustomerId ? "Update customer contact and details." : "Add a new customer to your accounting system."}
          onClose={() => { if (editingCustomerId) setEditingCustomerId(null); else onCloseModal(); setViewModeCustomer(false); }}
          onSubmit={() => { }}
          formId="customer-form"
          isSubmitting={editingCustomerId ? isUpdatingCustomer : isAddingCustomer}
          showSubmitBtn={!viewModeCustomer}
          size="md"
        >
          {isLoadingSingleCustomer && editingCustomerId ? <div className="p-10 text-center text-gray-500">Loading customer profile...</div> : (
            <Form
              onSubmit={editingCustomerId ? onEditCustomerSubmit : onCustomerSubmit}
              initialValues={singleCustomer?.data}
              render={({ handleSubmit, form }) => (
                <form id="customer-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><TextInput label="Customer Name" name="name" form={form} readonly={viewModeCustomer} /></div>
                  <TextInput label="Email Address" name="email" type="email" form={form} readonly={viewModeCustomer} />
                  <TextInput label="Phone Number" name="phone" form={form} readonly={viewModeCustomer} />
                  <div className="col-span-2"><TextInput label="Address" name="address" form={form} readonly={viewModeCustomer} /></div>
                  <TextInput label="VAT Number" name="vatNumber" form={form} readonly={viewModeCustomer} />
                  <TextInput label="Opening Balance" name="openingBalance" type="number" form={form} readonly={viewModeCustomer} />
                </form>
              )}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default CustomerTab;
