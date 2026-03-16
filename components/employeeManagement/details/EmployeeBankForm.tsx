import React from "react";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import { useUpdateEmployeeBankMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const EmployeeBankForm = ({
  employeeId,
  initialData,
}: {
  employeeId: string;
  initialData?: Record<string, unknown>;
}) => {
  const [updateBank, { isLoading: isUpdating }] = useUpdateEmployeeBankMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      const response = await updateBank({ employeeId, data: values }).unwrap();
      showAlert("Success", response?.message || "Bank details updated successfully", "success");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || err?.message || "Failed to update bank details", "error");
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialData}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Account Name" name="accountName" form={form} />
            <TextInput label="Sort Code" name="sortCode" form={form} />
            <TextInput label="Account Number" name="accountNumber" form={form} />
            <TextInput
              label="Building Society Reference"
              name="buildingSocietyReference"
              form={form}
            />
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={submitting || isUpdating}
              className="primary-btn px-8"
            >
              {submitting || isUpdating ? "Saving..." : "Save Bank Details"}
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default EmployeeBankForm;

