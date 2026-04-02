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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-blue-50 rounded-md p-5 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                3. Bank Details for Salary Payment
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your salary will be paid directly into this account via BACS
                  transfer. Please ensure the details are correct to avoid
                  payment delays.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <TextInput
                label={
                  <>
                    Account Name <span className="text-red-500">*</span>
                  </>
                }
                name="accountName"
                form={form}
                desc="Name as it appears on your bank account"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label={
                    <>
                      Sort Code <span className="text-red-500">*</span>
                    </>
                  }
                  name="sortCode"
                  form={form}
                  placeholder="12-34-56"
                  desc="Format: 12-34-56"
                />
                <TextInput
                  label={
                    <>
                      Account Number <span className="text-red-500">*</span>
                    </>
                  }
                  name="accountNumber"
                  form={form}
                  placeholder="12345678"
                  desc="8 digits"
                />
              </div>

              <TextInput
                label="Building Society Reference (if applicable)"
                name="buildingSocietyReference"
                form={form}
                desc="Only required for building society accounts"
              />
            </div>
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

