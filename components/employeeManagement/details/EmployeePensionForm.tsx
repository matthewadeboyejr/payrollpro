import React from "react";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import Checkbox from "@/components/ui/Checkbox";
import { useUpdateEmployeePensionMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const EmployeePensionForm = ({
  employeeId,
  initialData,
}: {
  employeeId: string;
  initialData?: Record<string, unknown>;
}) => {
  const [updatePension, { isLoading: isUpdating }] = useUpdateEmployeePensionMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      const response = await updatePension({ employeeId, data: values }).unwrap();
      showAlert("Success", response?.message || "Pension details updated successfully", "success");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || err?.message || "Failed to update pension details", "error");
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialData}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Pension Scheme" name="pensionScheme" form={form} />
            <TextInput
              label="Contribution Percent"
              name="contributionPercent"
              type="number"
              form={form}
            />
            <TextInput
              label="Contribution Method"
              name="contributionMethod"
              form={form}
            />
             <div className="flex items-center gap-4 pt-6">
               <Checkbox label="Opted Out" name="optedOut" form={form} />
            </div>
            <TextInput label="Opt Out Reason" name="optOutReason" form={form} />
            <TextInput
              label="Pension Reference"
              name="pensionReference"
              form={form}
            />
            <div className="flex flex-col gap-4 pt-2">
               <Checkbox label="Is Auto Enrolled" name="isAutoEnrolled" form={form} />
               <Checkbox label="Is Eligible for Auto Enrolment" name="isEligibleForAutoEnrolment" form={form} />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={submitting || isUpdating}
              className="primary-btn px-8"
            >
              {submitting || isUpdating ? "Saving..." : "Save Pension Details"}
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default EmployeePensionForm;
