import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useGetAccountingSuppliersQuery,
  useAccountingSuppliersMutation,
  useUpdateAccountingSuppliersMutation,
  useGetAccountingSuppliersByIdQuery
} from "@/services/api/constants/accounting.constant";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Modal from "@/components/ui/Modal";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import { showAlert } from "@/components/ui/ShowAlert";
import { useAction } from "@/hooks/useAction";

interface SupplierTabProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  search: string;
}

const SupplierTab = ({ isModalOpen, onCloseModal, search }: SupplierTabProps) => {
  const [editingSupplierId, setEditingSupplierId] = useState<number | null>(null);
  const [viewModeSupplier, setViewModeSupplier] = useState(false);
  const [openSupplierMenuId, setOpenSupplierMenuId] = useState<number | null>(null);

  const { data: suppliers, isLoading: isLoadingSuppliers, refetch: refetchSuppliers } = useGetAccountingSuppliersQuery(search);
  const { data: singleSupplier, isLoading: isLoadingSingleSupplier } = useGetAccountingSuppliersByIdQuery(editingSupplierId as number, { skip: !editingSupplierId });

  const [addSupplier, { isLoading: isAddingSupplier }] = useAccountingSuppliersMutation();
  const [updateSupplier, { isLoading: isUpdatingSupplier }] = useUpdateAccountingSuppliersMutation();
  const { deleteAccountingSupplierAction } = useAction();

  const onSupplierSubmit = async (values: Record<string, unknown>) => {
    try {
      await addSupplier(values).unwrap();
      showAlert("Success", "Supplier added successfully", "success");
      onCloseModal();
      refetchSuppliers();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showAlert("Error", err?.data?.message || "Failed to add supplier", "error");
    }
  };

  const onEditSupplierSubmit = async (values: Record<string, unknown>) => {
    try {
      await updateSupplier({ id: editingSupplierId as number, data: values }).unwrap();
      showAlert("Success", "Supplier updated", "success");
      setEditingSupplierId(null);
      refetchSuppliers();
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
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingSuppliers ? (
            <tr><td colSpan={5}><TableSkeleton columns={5} showSearch={false} showAddButton={false} /></td></tr>
          ) : suppliers?.data?.length > 0 ? (
            suppliers.data.map((s: { id: number; name: string; email: string; phone: string; isActive: boolean }) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{s.name}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{s.email}</td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{s.phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right relative">
                  <button onClick={() => setOpenSupplierMenuId(openSupplierMenuId === s.id ? null : s.id)} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 transition-colors">
                    <FiMoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openSupplierMenuId === s.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenSupplierMenuId(null)} />
                      <div className="absolute right-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setEditingSupplierId(s.id); setViewModeSupplier(true); setOpenSupplierMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEye size={14} /> View Profile</button>
                        <button onClick={() => { setEditingSupplierId(s.id); setViewModeSupplier(false); setOpenSupplierMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"><FiEdit2 size={14} /> Edit</button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                        <button onClick={() => { deleteAccountingSupplierAction(s.id, refetchSuppliers); setOpenSupplierMenuId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 dark:hover:bg-red-900/20"><FiTrash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={5} className="p-10 text-center text-gray-400 text-sm italic">No suppliers found.</td></tr>
          )}
        </tbody>
      </table>

      {(isModalOpen || editingSupplierId) && (
        <Modal
          heading={viewModeSupplier ? "Supplier Details" : editingSupplierId ? "Edit Supplier" : "Add New Supplier"}
          desc={viewModeSupplier ? "Viewing supplier profile." : editingSupplierId ? "Update supplier contact and details." : "Add a new supplier to your accounting system."}
          onClose={() => { if (editingSupplierId) setEditingSupplierId(null); else onCloseModal(); setViewModeSupplier(false); }}
          onSubmit={() => { }}
          formId="supplier-form"
          isSubmitting={editingSupplierId ? isUpdatingSupplier : isAddingSupplier}
          showSubmitBtn={!viewModeSupplier}
          size="md"
        >
          {isLoadingSingleSupplier && editingSupplierId ? <div className="p-10 text-center text-gray-500">Loading supplier profile...</div> : (
            <Form
              onSubmit={editingSupplierId ? onEditSupplierSubmit : onSupplierSubmit}
              initialValues={singleSupplier?.data}
              render={({ handleSubmit, form }) => (
                <form id="supplier-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><TextInput label="Supplier Name" name="name" form={form} readonly={viewModeSupplier} /></div>
                  <TextInput label="Email Address" name="email" type="email" form={form} readonly={viewModeSupplier} />
                  <TextInput label="Phone Number" name="phone" form={form} readonly={viewModeSupplier} />
                  <div className="col-span-2"><TextInput label="Address" name="address" form={form} readonly={viewModeSupplier} /></div>
                  <TextInput label="Payment Terms (Days)" name="paymentTermsDays" type="number" form={form} readonly={viewModeSupplier} />
                  <TextInput label="Opening Balance" name="openingBalance" type="number" form={form} readonly={viewModeSupplier} />
                </form>
              )}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default SupplierTab;
